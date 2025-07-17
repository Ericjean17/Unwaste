const express = require("express");
const app = express();
const cors = require("cors"); // why this
const bcrypt = require("bcrypt");
const pool = require("./db");

const corsOptions = {
    origin: ["http://localhost:5173"], // only accept requests from frontend server (vite)
};

// middleware
app.use(cors(corsOptions));
app.use(express.json()); // allows json data to be put into req.body

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if a username already exists inside database
        const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (userExists.rows.length > 0) { // If > 0, then there exists a user with that username. Inside rows is an array of user objects containing an id, username, password
            return res.status(400).json({ message: "Username already taken" });
        }

        // If username is not taken, hash password with bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await pool.query("INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username", [username, hashedPassword]);
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
        // Create and return a token/session here

        res.json({ message: "Login successful", userId: user.id})
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(3000, () => {
    console.log("listening on port 3000");
});