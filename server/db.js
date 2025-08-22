const { Pool } = require("pg");

// const pool = new Pool({
//     connectionString: process.env.POSTGRES_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

// module.exports = pool;

const pool = new Pool({
    user: "postgres",
    password: "postgrespw",
    host: "localhost",
    port: 5432,
    database: "unwaste"
});


module.exports = pool;