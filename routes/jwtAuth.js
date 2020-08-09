const router =  require("express").Router();
const pool = require("../ConnectionDatabase");


router.post("/re", async (req,res) => {
    try {
        /*1. Destructure the req.body (account_lastname , account_firstname , account_middlename , account_extname ,  account_username , account_password)*/
            // PLEASE READ - missing account_type please alter the table account 
            const { acc_lastname, acc_firstname } = req.body;
        
        //2. check if the user exist (if exist then throw an error)
        const user = await pool.query("SELECT * FROM accounts WHERE account_lastname = $1 AND account_firstname = $2 ",
        [   
            acc_lastname, 
            acc_firstname 
        ])

        res.json(user.rows);
        
        //3. Bcrypt the user password
        //4. Enter the new user inside the database
        //5. generating a jwt token
    } catch (error) {
        console.error(error.message);
        res.status(500).send("SERVER ERROR!");
    }
});


module.exports = router;

