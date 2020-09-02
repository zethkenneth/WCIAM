const router = require("express").Router();
const pool = require("../../../ConnectionDatabase");
const authorize = require("../../../middleware/authorization");

//get all logs
router.get("/", async (req, res) => {
    try {
        const logs = await pool.query("SELECT * FROM logs");
        res.json(logs.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//search a log



module.exports = router;