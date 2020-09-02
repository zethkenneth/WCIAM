const router = require("express").Router();
const pool = require("../../../ConnectionDatabase");
const authorize = require("../../../middleware/authorization");

router.get("/", authorize, async (req, res) => {
    try {
        res.json("THIS IS THE SETTINGS ROUTE!");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.use("/courses", require("./Courses"));
router.use("/units", require("./Units"));
router.use("/departments", require("./Deparments"));
router.use("/accounts", require("./Accounts"));
router.use("/logs", require("./Logs"));

module.exports = router;