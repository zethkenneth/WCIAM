const router = require("express").Router();
const pool = require("../../../ConnectionDatabase");
const authorize = require("../../../middleware/authorization");

router.get("/", authorize, async (req, res) => {
    try {
        res.json("THIS IS THE PATIENTS ROUTE!");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.use("/employees", require("./Employees"));
router.use("/students", require("./Students"));

module.exports = router;