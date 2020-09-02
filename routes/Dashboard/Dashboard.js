const router = require("express").Router();
const pool = require("../../ConnectionDatabase");
const authorize = require("../../middleware/authorization");

router.get("/", authorize, async (req, res) => {
    try {
        const account = await pool.query(
            "SELECT account_lastname, account_firstname, account_middlename FROM accounts WHERE account_id = $1",
            [req.user]
        );
        res.json(account.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.use("/transactions", require("./Transactions/Transactions"));
router.use("/settings", require("./Settings/Settings"));
router.use("/inventory", require("./Inventory/Inventory"));
router.use("/records", require("./Records/Records"));


module.exports = router;