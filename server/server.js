require("dotenv").config({ path: require("path").resolve(__dirname, ".env") });
const express = require("express");
const app = express();
const cors = require("cors"); 
const bcrypt = require("bcrypt");
const pool = require("./db");
const jwt = require("jsonwebtoken");

// middleware
// app.use(cors({ origin: 'https://unwaste.vercel.app' }));
app.use(cors());
// app.use(cors({ origin: `${process.env.FRONTEND_URL}` }));
app.use(express.json()); // allows json data to be put into req.body

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; // Browsers send headers like "Bearer [string of chars]"
    const token = authHeader && authHeader.split(" ")[1]; // Get the token in "Bearer <token>"

    if (!token) return res.status(401).json({ message: "No token provided" }); // user needs token to be authenticated

    // Check if the token is valid, decode payload, and ensure it hasn't expired or been tampered with
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET); // Decode token and extract payload (userId)
        req.user = user; // Attach decoded user data to the request
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(403).json({ route: "/login", message: "Expired token, please login again" }); // Invalid token
        }
    }
};

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if a username already exists inside database
        const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (userExists.rows.length > 0) { // If > 0, then there exists a user with that username. Inside rows is an array of user objects containing an id, username, password
            return res.status(400).json({ message: "Username taken" });
        }

        // If username is not taken, hash password with bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await pool.query("INSERT INTO users (username, hashed_password) VALUES ($1, $2) RETURNING *", [username, hashedPassword]);
        
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists inside database
        const userQuery = await pool.query("SELECT * FROM users WHERE username = $1", [username])
        if (userQuery.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username" })
        }
        
        const user = userQuery.rows[0]; // Stores their id number, unique username and password
        
        // Check if user inputted password matches the hashed password 
        const validPassword = await bcrypt.compare(password, user.hashed_password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" })
        }
        
        // Creates a token that includes the user's id, use localStorage to store the userId and token
        const token = jwt.sign(
            { userId: user.id }, // payload (info to include in token)
            process.env.JWT_SECRET, // used to sign token to verify it later
            { expiresIn: "1h" }
        );
        res.json({ token, message: "Login successful", userId: user.id})
    } catch (err) {
        console.error(err.message);
    }
});

// Return all ingredients to the authenticated user
app.get("/users/:id/ingredients", authenticateToken, async (req, res) => {
    const { userId } = req.user;

    try {
        const result = await pool.query("SELECT * FROM ingredients WHERE user_id = $1", [userId]);
        res.json(result.rows); // Array of { id, ingredients, category, user_id }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Failed to fetch ingredients" })
    }
});

app.post("/users/:id/ingredients", authenticateToken, async (req, res) => {
    //const { userId } = req.params;
    const { userId } = req.user;
    const { ingredient, category } = req.body;

    try {
        const newIngredient = await pool.query("INSERT INTO ingredients (ingredient, category, user_id) VALUES ($1, $2, $3) RETURNING *",
            [ingredient, category, userId]
        );
        res.json(newIngredient.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Delete an ingredient
app.delete("/users/:id/ingredients", authenticateToken, async (req, res) => {
    const { userId } = req.user;
    const { ingredient, category } = req.body;
    
    try {
        const deleteIngredient = await pool.query("DELETE FROM ingredients WHERE user_id = $1 AND ingredient = $2 AND category = $3 RETURNING *",
            [userId, ingredient, category]
        );

        if (deleteIngredient.rowCount === 0) { // .rows = [] containing rows returning by query, .rowCount = num indicating how many rows were affected
            return res.status(404).json({ message: "Ingredient not found" });
        }

        res.json({ message: "Ingredient deleted", deleted: deleteIngredient.rows[0].ingredient });
    } catch (err) {
        console.log(err.message);
    }
});

app.put("/users/:id/diet", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { meatConsumption, fishConsumption, vegetableConsumption, spicinessLevel, allergies } = req.body;
    try {
        const updateDiet = await pool.query(
            `UPDATE users 
            SET pref_meats = $1,
                pref_fish = $2,
                pref_veggies = $3,
                pref_spicy = $4,
                allergies = $5
            WHERE id = $6
            RETURNING *`,
            [meatConsumption, fishConsumption, vegetableConsumption, spicinessLevel, allergies, id]
        );
        res.status(200).json(updateDiet.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/users/:id/ingredients", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { oldIngredient, newIngredient, category } = req.body;

    try {
        const updateIngredient = await pool.query("UPDATE ingredients SET ingredient = $1 WHERE user_id = $2 AND ingredient = $3 AND category = $4 RETURNING *",
            [newIngredient, id, oldIngredient, category]
        )
        res.status(200).json(updateIngredient.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

app.get("/users/:id/diet", authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const diet = await pool.query("SELECT * FROM users WHERE id = $1", [id])
        res.status(200).json(diet.rows[0]);
    } catch (err) {
        console.error(`Failed to get data`, err.message);
    }
})

app.get("/users/:id/recipes", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { data } = req.query; // get query parameter from URL

    try {
        if (data === "diet") {
            const diet = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
            res.json(diet.rows[0]);
        } else if (data === "ingredients") {
            const ingredients = await pool.query(
                "SELECT * FROM ingredients WHERE user_id = $1", [id]
            );
            if (ingredients.rows.length === 0) {
                return res.status(403).json({ route: "/ingredients", message: "Add at least one ingredient first" })
            }
            res.json(ingredients.rows);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error"})
    }
})

app.listen(3000, () => {
    console.log("listening on port 3000");
});
