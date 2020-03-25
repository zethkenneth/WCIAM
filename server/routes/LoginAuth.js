const router = require("express").Router();
const pool = require("../Database.js");


//register
router.post("/login", async (req,res) => {
    try {
        const { name , username, password } = req.body;
        const user = await pool.query("SELECT * FROM account WHERE accountusername = $1",
        [
            username
        ]);

        if(user.rows.length !== 0){
            return res.status(401).send("User Already Exist")
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});



module.exports = router;