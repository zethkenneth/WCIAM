const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../../../ConnectionDatabase");
const authorize = require("../../../middleware/authorization");


//get all the accounts
router.get("/", authorize, async (req, res) => {
    try {
        //1. Query the datas from the database
        const accounts = await pool.query("SELECT * FROM accounts");
        //2. send Back a response

        res.json(accounts.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//get a account
router.get("/:acc_id", async (req, res) =>{
    try {
        //1. Destructure the req.params
        const { acc_id } = req.params;
        //2.query the data from the database 
        const account = await pool.query("SELECT * FROM accounts WHERE account_id = $1",[
            acc_id
        ])
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.post("/addaccount", async (req, res) => {
    try {
        /*1. Destructure the req.body account_lastname , account_firstname , account_middlename , account_extname ,  account_username , account_password , account_type)*/
        const { acc_lastname, acc_firstname, acc_middlename, acc_extname, acc_username, acc_password, acc_type } = req.body;

        //2. check if the account exist (if exist then throw an error)
        const existAccount = await pool.query("SELECT * FROM accounts WHERE account_lastname = $1 AND account_firstname = $2 AND account_middlename = $3 AND account_extname = $4 AND account_username = $5 AND account_type = $6",
            [
                acc_lastname,
                acc_firstname,
                acc_middlename,
                acc_extname,
                acc_username,
                acc_type
            ]);

        if ( existAccount.rows.length > 0) {
            return res.status(401).send("User is already exist");
        }

        //3. Bcrypt the user password 
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(acc_password, salt);

        //4. Enter the new user inside the database
        const newAccount = await pool.query("INSERT INTO accounts (account_lastname , account_firstname, account_middlename , account_extname ,account_username , account_password , account_type ) VALUES ($1, $2, $3, $4, $5, $6 , $7) RETURNING *",
            [
                acc_lastname,
                acc_firstname,
                acc_middlename,
                acc_extname,
                acc_username,
                bcryptPassword,
                acc_type
            ]);
        //5. confirmation
        res.json("User Successfully Created!");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("SERVER ERROR!");
    }
});

router.put("/:acc_id", async (req, res) => {
    try {
        //1.Destructure req.params and req.body
        const { acc_id } = req.params;
        const { acc_lastname, acc_firstname, acc_middlename, acc_extname, acc_username, acc_password, acc_type } = req.body;

        //2.Bcrypt the user password 
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(acc_password, salt);

        //3.Update new account in the database
        const updateAccount = await pool.query("UPDATE accounts SET account_lastname = $1, account_firstname = $2, account_middlename = $3, account_extname = $4, account_username = $5, account_password = $6 , account_type = $7 WHERE account_id = $8 RETURNING *",
            [
                acc_lastname,
                acc_firstname,
                acc_middlename,
                acc_extname,
                acc_username,
                bcryptPassword,
                acc_type,
                acc_id
            ]);
        //4. send back a response
        res.json(updateAccount.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("SERVER ERROR!");
    }
});


//update the account status
router.put("/status/:acc_id", async (req, res) => {
    try {
        //1.Destructure req.params and req.body
        const { acc_id } = req.params;
        //2.Update new account in the database
        const updateAccount = await pool.query("UPDATE accounts SET account_status = '1' RETURNING *");
        //3. send back a response
        res.json(updateAccount.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("SERVER ERROR!");
    }
});

module.exports = router;