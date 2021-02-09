const router =  require("express").Router();
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorization");
const pool = require("../ConnectionDatabase");


router.post("/login", async (req, res) => {
    try {
        
        /*1. Destructure the req.body  (account_username , account_password )*/
        const { acc_username, acc_password } = req.body;
        console.log(req.body);
        /*2. 
            check if the Account exist (if exist then throw an error) 
            and compare the incoming password with the pass in the database 
            (if the password is not match throw an error)
        */ 
        const account = await pool.query("SELECT * FROM accounts WHERE account_username = $1",
            [
                acc_username,
            ]);
         
        if (account.rows.length === 0) {
            return res.status(401).json("Invalid Username and password");
        } else if (account.rows.length === 1) {
            const validPassword = await bcrypt.compare(acc_password, account.rows[0].account_password);
            if (!validPassword) {
                return res.status(401).json("Incorrect accountname or password");
            }
        } else if (account.rows.length > 1) {
            return res.status(401).json("You have multiple accounts Please contact the admin");
        }
        
        //3. Save the Log in time
            const login = await pool.query("INSERT INTO logs(log_timeout,fk_account_id) VALUES ('000000',$1)",[
                account.rows[0].account_id
            ]);

        //4. generating a jwt token
        const token = jwtGenerator(account.rows[0].account_id);
        console.log(token);
        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("SERVER ERROR!");
    }
});

router.put("/:acc_id", async (req , res) => {
    try {
        //1. destructure req.params 
        const { acc_id } = req.params;

        //2. selecting the data from logs 
        const selectlogs = await pool.query("SELECT log_id FROM logs WHERE fk_account_id = $1 AND log_timeout = '000000'", [
            acc_id
        ]);

        //3. update now the logout time
        const logout = await pool.query("UPDATE logs SET log_timeout = CURRENT_TIME WHERE fk_account_id = $1 AND log_id = $2",[
            acc_id,
            selectlogs.rows[0].log_id
        ]);

        //4. send back a response
        res.json({ msg: "LOGOUT SUCCESS!"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("SERVER ERROR!");
    }
});



router.get("/verify", authorize, (req, res) => {
    try {
        res.json(true);
    } catch (error){
        console.error(error.message);
        res.status(500).send("Server error");
    }
});


module.exports = router;

