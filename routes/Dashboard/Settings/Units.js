const router = require("express").Router();
const pool = require("../../../ConnectionDatabase");
const authorize = require("../../../middleware/authorization");

//get all units
router.get("/", async (req, res) => {
    try {
        const units = await pool.query("SELECT * FROM units");

        res.json(units.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//get a unit
router.get("/:u_id", async (req, res) => {
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
router.post("/addunit", async (req, res) => {
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
router.put("/:u_id", async (req, res) => {
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

module.exports = router;