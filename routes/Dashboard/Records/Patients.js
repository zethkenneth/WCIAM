const router = require("express").Router();
const pool = require("../../../ConnectionDatabase");
const authorize = require("../../../middleware/authorization");


// get all patients
router.get("/", async (req, res) => {
    try {
        const patients = await pool.query("SELECT * FROM patients");

        res.json(patients.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//search patients





module.exports = router;