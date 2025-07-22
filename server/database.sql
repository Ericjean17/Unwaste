CREATE DATABASE unwaste;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    ingredient VARCHAR(50) NOT NULL,
    category TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) 
);