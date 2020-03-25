const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "debuggo",
    host:"localhost",
    port:"5432",
    database:"wmsuclinicdatabase"
});

module.exports = pool;