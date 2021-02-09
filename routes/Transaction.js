const router = require("express").Router();
const pool = require("../ConnectionDatabase");



router.get("/", async (req, res) => {
    try {

        res.json("This Is the Transaction");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});



module.exports = router;