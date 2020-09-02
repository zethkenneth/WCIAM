const router = require("express").Router();
const pool = require("../../../ConnectionDatabase");
const authorize = require("../../../middleware/authorization");


// get all students
router.get("/", async (req, res) => {
    try {
        const students = await pool.query("SELECT * FROM students");

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//get a student
router.get("/:s_id", async (req , res) => {
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
router.post("/addstudent", async (req ,res) => {
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
router.put("/:s_id", async (req, res) => {
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

router.use("/patients", require("./Patients"));

module.exports = router;