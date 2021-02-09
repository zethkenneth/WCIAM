const router = require("express").Router();
const pool = require("../ConnectionDatabase");

/*
-------------------------------------------------------------------------------
// Records
-------------------------------------------------------------------------------
*/

router.get("/", async (req, res) => {
    try {

        res.json("This Is the Records");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

/*
-------------------------------------------------------------------------------
// Students
-------------------------------------------------------------------------------
*/

// get all students
router.get("/students", async (req, res) => {
    try {
        const students = await pool.query("SELECT * FROM students");

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//get a student
router.get("/students/:s_id", async (req , res) => {
    try {
        //1. destructure the res.params
        const { s_id } = req.params;
        //2. get the data from the database
        const student = await pool.query("SELECT * FROM students WHERE student_id = $1",[
            s_id
        ]);
        //3. SENd back a response
        res.json(student.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error!");
    }
});

//add a student
router.post("/students/addstudent", async (req ,res) => {
    try {
        //1. destructure req.body
        const { s_id, s_lastname , s_firstname , s_middlename , s_extname , s_fk_course_id } = req.body;
        
        //2.verify if the student data is already exist
        const existStudent  = await pool.query("SELECT * FROM students WHERE student_id = $1",[
            s_id
        ]);

        if (existStudent.rows.length > 0) {
            return res.status(401).send("Student is already exist");
        }
        //3. add the new student data in the database
        const addStudent = await pool.query("INSERT INTO students(student_id,student_lastname , student_firstname , student_middlename , student_extname , fk_course_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",[
            s_id,
            s_lastname, 
            s_firstname, 
            s_middlename, 
            s_extname, 
            s_fk_course_id
        ]);

        //4.SEND BACK a response
        res.json(addStudent.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//update a student
router.put("/students/:s_id", async (req, res) => {
    try {
        //1. destructure the req.params and req.body
        const { s_id } = req.params;
        const { s_lastname, s_firstname, s_middlename, s_extname, s_fk_course_id } = req.body;

        //2. update the student data to the database
        const updateStudent = await pool.query("UPDATE students SET student_lastname = $1, student_firstname =$2, student_middlename =$3 , student_extname =$4, fk_course_id =$5 WHERE student_id = $6 RETURNING * ",[
            s_lastname, 
            s_firstname, 
            s_middlename, 
            s_extname, 
            s_fk_course_id,
            s_id
        ])
        //3. send back a response
        res.json(updateStudent.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("SERVER error")
    }
});

/*
-------------------------------------------------------------------------------
// Employees
-------------------------------------------------------------------------------
*/
// get all employees
router.get("/employees", async (req, res) => {
    try {
        const employees = await pool.query("SELECT * FROM employees");

        res.json(employees.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//get a employee
router.get("/employees/:emp_id", async (req, res) => {
    try {
        //1. destructure the res.params
        const { emp_id } = req.params;
        //2. get the data from the database
        const employee = await pool.query("SELECT * FROM employees WHERE employee_id = $1", [
            emp_id
        ]);
        //3. SENd back a response
        res.json(employee.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error!");
    }
});

//add a employee
router.post("/employees/addemployee", async (req, res) => {
    try {
        //1. destructure req.body
        const { emp_id, emp_lastname, emp_firstname, emp_middlename, emp_extname, emp_position, emp_fk_unit_id } = req.body;

        //2.verify if the employee data is already exist
        const existemployee = await pool.query("SELECT * FROM employees WHERE employee_id = $1", [
            emp_id
        ]);

        if (existEmployee.rows.length > 0) {
            return res.status(401).send("employee is already exist");
        }
        //3. add the new employee data in the database
        const addEmployee = await pool.query("INSERT INTO employees(employee_id,employee_lastname , employee_firstname , employee_middlename , employee_extname , employee_position, fk_course_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *", [
            emp_id,
            emp_lastname,
            emp_firstname,
            emp_middlename,
            emp_extname,
            emp_position,
            emp_fk_unit_id
        ]);

        //4.SEND BACK a response
        res.json(addEmployee.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//update a employee
router.put("/employees/:emp_id", async (req, res) => {
    try {
        //1. destructure the req.params and req.body
        const { emp_id } = req.params;
        const { emp_lastname, emp_firstname, emp_middlename, emp_extname, emp_position, emp_fk_unit_id } = req.body;

        //2. update the employee data to the database
        const updateEmployee = await pool.query("UPDATE employees SET employee_lastname = $1, employee_firstname =$2, employee_middlename =$3 , employee_extname =$4,employee_position = $5 ,fk_unit_id =$6 WHERE employee_id = $7 RETURNING * ", [
            emp_lastname,
            emp_firstname,
            emp_middlename,
            emp_extname,
            emp_position,
            emp_fk_unit_id,
            emp_id
        ])
        //3. send back a response
        res.json(updateEmployee.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("SERVER error")
    }
});

/*
-------------------------------------------------------------------------------
// Patients
-------------------------------------------------------------------------------
*/



module.exports = router;