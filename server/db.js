const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const connectionString = process.env.DATABASE_URL;

let pool;
if (isProduction && connectionString) {
    pool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });
} else {
    pool = new Pool({
        user: process.env.PGUSER || "postgres",
        password: process.env.PGPASSWORD || "postgrespw",
        host: process.env.PGHOST || "localhost",
        port: Number(process.env.PGPORT) || 5432,
        database: process.env.PGDATABASE || "unwaste"
    });
}

module.exports = pool;