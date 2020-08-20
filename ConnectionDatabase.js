const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password: "426813975ujmik,",
    host: "localhost",
    port: 5432,
    database: "wmsu_clinic_database"
});
 
module.exports = pool;