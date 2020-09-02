const router = require("express").Router();
const pool = require("../../../ConnectionDatabase");
const authorize = require("../../../middleware/authorization");

//get all the departments
router.get("/", async (req, res) => {
    try {
        const departments = await pool.query("SELECT * FROM departments");

        res.json(departments.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//get a department
router.get("/dep_id", async (req, res) =>{
    try {
        //1.destructure the req.params
            const { dep_id } = req.params;

        const department = await pool.query("SELECT * FROM deparments WHERE department_id = $1", [
            dep_id
        ]);
        //2.send back a response
        res.json(department.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error!");
    }
});

//add a department
router.post("/adddepartment", async (req, res) => {
    try {
        //1.destructre the req.body
        const { dep_description } = req.body;

        //2.Add the new department in the database 
        const newDepartment = await pool.query("INSERT INTO departments(department_description) VALUES ($1)",[
            dep_description
        ])

        //3.send back a response
        res.json({msg: "Succesfully Added a Department"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//update a department
router.put("/:dep_id", async (req , res) => {
    
    //1.destructure the req.params and req.body
    const { dep_id } = req.params;
    const { dep_description } = req.body;

    //2.Update the new Department in the database
    const updateDepartment = await pool.query("UPDATE departments SET department_description = $1 WHERE department_id = $1", [
        dep_description,
        dep_id
    ]);

    //3. send back a response
    res.json({msg:"Successfully Update a Department"})

});


module.exports = router;