const Pool = require("pg").Pool;

const pool = new Pool({
    username: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "wmsu_clinic_database"

});
 
module.exports = pool;