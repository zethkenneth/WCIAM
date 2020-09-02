const router = require("express").Router();
const pool = require("../../../ConnectionDatabase");
const authorize = require("../../../middleware/authorization");


//get all courses
router.get("/", async (req, res) => {
    try {
        const courses = await pool.query("SELECT * FROM courses");
        res.json(courses.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//get a course
router.get("/:c_id", async (req, res) => {
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
router.post("/addcourse", async (req, res) => {
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
router.put("/:c_id", async (req, res) => {
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

module.exports = router;