const router = require("express").Router();
const pool = require("../ConnectionDatabase");
const bcrypt = require("bcrypt");
/*
-------------------------------------------------------------------------------
// Settings
-------------------------------------------------------------------------------
*/

router.get("/", async (req, res) => {
    try {
        res.json("This Is the Settings");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

/*
-------------------------------------------------------------------------------
// Accounts
-------------------------------------------------------------------------------
*/

//get all the accounts
router.get("/accounts", async (req, res) => {
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

//get an account
router.get("/accounts/:acc_id", async (req, res) =>{
    try {
        //1. Destructure the req.params
        const { acc_id } = req.params;
        //2.query the data from the database 
        const account = await pool.query("SELECT * FROM accounts WHERE account_id = $1",[
            acc_id
        ]);

        res.status(200).send(account.rows[0])
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.post("/accounts/addaccount", async (req, res) => {
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
            console.log(existAccount.rows.length);
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

router.put("/accounts/:acc_id", async (req, res) => {
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
router.put("/accounts/status/:acc_id", async (req, res) => {
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
/*
-------------------------------------------------------------------------------
// Courses 
-------------------------------------------------------------------------------
*/

//get all courses
router.get("/courses", async (req, res) => {
    try {
        const courses = await pool.query("SELECT * FROM courses");
        res.json(courses.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//get a course
router.get("/courses/:c_id", async (req, res) => {
    try {
        //1. Destructure req.body
        const { c_id } = req.body;
        //2. query the data from the database
        const course = await pool.query("SELECT * FROM courses WHERE course_id = $1 ",[
            c_id
        ]);
        //3. send back a response
        res.json(course.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//add course
router.post("/courses/addcourse", async (req, res) => {
    try {
        //1. Destructure req.body
            const { c_description , c_fk_department_id }= req.body;
        //2. add the new course in the database
        const newCourse = await pool.query("INSERT INTO courses(course_description , fk_department_id) VALUES ($1,$2)",[
                c_description, 
                c_fk_department_id
            ]);

        //3. Send back a response
        res.json({ msg: "Successfully Added a Course!"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//update course
router.put("/courses/:c_id", async (req, res) => {
    try {
        //1. destructure req.body and req.params
            const { c_id } = req.params;
            const { c_description } = req.body; 
        //2.update the new course in the database
            const updateCourse = await pool.query("UPDATE courses SET course_description = $1 WHERE course_id = $2",[
                c_description,
                c_id
            ]);
        //3.Send  back a response
        res.json({msg: "Successfully Update the course"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


/*
-------------------------------------------------------------------------------
// Units
-------------------------------------------------------------------------------
*/


//get all units
router.get("/units", async (req, res) => {
    try {
        const units = await pool.query("SELECT * FROM units");

        res.json(units.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//get a unit
router.get("/units/:u_id", async (req, res) => {
    try {
        //1. destructure req.params
        const { u_id } = req.params;

        const unit = await pool.query("SELECT * FROM units WHERE unit_id = $1 ", [
            u_id
        ])

        res.json(unit.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//add unit
router.post("/units/addunit", async (req, res) => {
    try {
        //1. destructue req.body
        const { u_description } = req.body;
        
        const newUnit =  await pool.query("INSERT INTO units(unit_description) VALUES ($1)",[
            u_description
        ]);

        res.json({ msg: "Successfully Added!"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//update unit
router.put("/units/:u_id", async (req, res) => {
    try {
        //1. destructure req.params and req.body
        const { u_id } = req.params; 
        const { u_description }= req.body

        const updateUnit = await pool.query("UPDATE units SET unit_description = $1 WHERE unit_id = $2",
        [
            u_description,
            u_id
        ]);

        res.json({ msg: "Successfully updated"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

/*
-------------------------------------------------------------------------------
// Accounts Logs
-------------------------------------------------------------------------------
*/

//get all logs
router.get("/logs", async (req, res) => {
    try {
        const logs = await pool.query("SELECT * FROM logs");
        res.json(logs.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});  

/*
-------------------------------------------------------------------------------
// Medicines logs
-------------------------------------------------------------------------------
*/




module.exports = router;