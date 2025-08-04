import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    password: "postgrespw",
    host: "localhost",
    port: 5432,
    database: "unwaste"
});

export default pool;