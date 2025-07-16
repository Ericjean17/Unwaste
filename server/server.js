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
        //Check if user exists
        const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (userExists.rows.length > 0) { // print this out to see why it is rows.length
            return res.status(400).json({ message: "Username already taken" });
        }

        // If user exists, hash password with bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await pool.query("INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username", [username, hashedPassword]);
        res.json(newUser.rows[0]);
        //res.status(201).json(newUser.rows);
    
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(3000, () => {
    console.log("listening on port 3000");
});