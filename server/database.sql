CREATE DATABASE unwaste;

CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- SERIAL supports up to 2 billion
    username VARCHAR(100) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    pref_meats VARCHAR(20),
    pref_fish VARCHAR(20),
    pref_veggies VARCHAR(20),
    pref_spicy VARCHAR(20),
    allergies TEXT[]
);

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    ingredient VARCHAR(50) NOT NULL,
    category TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) 
);