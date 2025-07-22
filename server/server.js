require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors"); // why this
const bcrypt = require("bcrypt");
const pool = require("./db").default;
const jwt = require("jsonwebtoken");

const corsOptions = {
    origin: ["http://localhost:5173"], // only accept requests from frontend server (vite)
};

// middleware
app.use(cors(corsOptions)); // allows frontend to make requests to backend
app.use(express.json()); // allows json data to be put into req.body

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; // Browsers send headers like "Bearer [string of chars]"
    const token = authHeader && authHeader.split(" ")[1]; // Get the token in "Bearer <token>"

    if (!token) return res.status(401).json({ message: "No token provided" });

    // Check if the token is valid, decode payload, and ensure it hasn't expired or been tampered with
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET); // Decode token and extract payload (userId)
        req.user = user; // Attach decoded user data to the request
        next();
    } catch (err) {
        res.sendStatus(403); // Invalid token
    }
}

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

        const newUser = await pool.query("INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *", [username, hashedPassword]);
        
        res.json(newUser.rows[0]);
        //res.status(201).json(newUser.rows);
        
    
    } catch (err) {
        console.error(err.message);
    }
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists inside database
        const userQuery = await pool.query("SELECT * FROM users WHERE username = $1", [username])
        if (userQuery.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" })
        }
        
        const user = userQuery.rows[0]; // Stores unique username and it's password
        
        // Check if user inputted password matches the hashed password as well
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid username or password" })
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
})

app.post("/users/:id/ingredients", authenticateToken, async (req, res) => {
    //const { userId } = req.params;
    const { userId } = req.user;
    const { name, category } = req.body;

    try {
        const newIngredient = await pool.query("INSERT INTO ingredients (ingredient, category, user_id) VALUES ($1, $2, $3) RETURNING *",
            [name, category, userId]
        );
        res.json(newIngredient.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(3000, () => {
    console.log("listening on port 3000");
});