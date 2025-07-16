const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "kirbkwd1pop",
    host: "localhost",
    port: 5432,
    database: "unwaste"
});

module.exports = pool;