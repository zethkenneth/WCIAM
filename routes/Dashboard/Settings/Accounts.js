const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../../../ConnectionDatabase");
const authorize = require("../../../middleware/authorization");



router.get("/", authorize, async (req, res) => {
    try {
        res.json("THIS IS THE ACCOUNTS ROUTE!");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.post("/addAccount", async (req, res) => {
    try {
        /*1. Destructure the req.body account_lastname , account_firstname , account_middlename , account_extname ,  account_username , account_password , account_type)*/
        const { acc_lastname, acc_firstname, acc_middlename, acc_extname, acc_username, acc_password, acc_type, acc_status, acc_date_created } = req.body;

        //2. check if the account exist (if exist then throw an error)
        const account = await pool.query("SELECT * FROM accounts WHERE account_lastname = $1 AND account_firstname = $2 AND account_middlename = $3 AND account_extname = $4 AND account_username = $5 AND account_type = $6",
            [
                acc_lastname,
                acc_firstname,
                acc_middlename,
                acc_extname,
                acc_username,
                acc_type
            ]);

        if (account.rows.length > 0) {
            return res.status(401).send("User is already exist");
        }

        //3. Bcrypt the user password 
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(acc_password, salt);

        //4. Enter the new user inside the database
        const newAccount = await pool.query("INSERT INTO accounts (account_lastname , account_firstname, account_middlename , account_extname ,account_username , account_password , account_type , account_status, account_date_created) VALUES ($1, $2, $3, $4, $5, $6 , $7, $8 , $9) RETURNING *",
            [
                acc_lastname,
                acc_firstname,
                acc_middlename,
                acc_extname,
                acc_username,
                bcryptPassword,
                acc_type,
                acc_status,
                acc_date_created
            ]);
        //5. confirmation
        res.json("User Successfully Created!");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("SERVER ERROR!");
    }
});

module.exports = router;