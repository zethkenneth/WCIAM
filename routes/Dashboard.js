const router = require("express").Router();
const pool = require("../ConnectionDatabase");

//Dashboard

router.get("/", async (req, res) => {
    try {

        res.json("This Is the Dashboard");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});



module.exports = router;