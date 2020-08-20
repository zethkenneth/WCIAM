const router = require("express").Router();
const pool = require("../../../ConnectionDatabase");
const authorize = require("../../../middleware/authorization");

router.get("/", authorize, async (req, res) => {
    try {
        res.json("THIS IS THE EMPLOYEES ROUTE!");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;