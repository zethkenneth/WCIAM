const router = require("express").Router();
const pool = require("../../../ConnectionDatabase");
const authorize = require("../../../middleware/authorization");


//get all medicines
router.get("/", async (req, res) => {
    try {
        const medicines = await pool.query("SELECT * FROM medicines");

        res.json(medicines.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//get a single medicine
router.get(":m_id", async (req, res) =>{
    try {
        //1. destructure req.params
            const { m_id } = req.params;
        //2. get the data from the database
            const medicine = await pool.query("SELECT * FROM medicines WHERE medicine_id = $1",[
                m_id
            ]);
        //2. send back a response
            res.json(medicine.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});

//add a medicine
router.post("/addmedicine", async (req , res) => {
    try {
        //1. destructure req.body
        const { m_generic_name, m_brand_name, m_dosage } = req.body;

        //2. add the new medicine in the database
        const addMedicine = await pool.query("INSERT INTO medicines( medicine_generic_name, medicine_brand_name, medicine_Dosage ) VALUES ($1,$2,$3) ",[
            m_generic_name, 
            m_brand_name,
            m_dosage
        ]);
        //3. Send back a response
        res.json({ msg: "succesfully added" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.put("/:m_id", async (req, res)=> {
    try {
        //1. destructure req.params and req.body
        const { m_id } = req.params;
        const { m_generic_name, m_brand_name, m_dosage} = req.body;
        //2. update the data from the database
        const updateMedicine = await pool.query("UPDATE medicine SET medicine_generic_name = $1, m_brand_name = $2, m_dosage = $3 WHERE medicine_id = $4 RETURNING *",[
            m_generic_name, 
            m_brand_name, 
            m_dosage,
            m_id
        ]);
        //3. send back a response 
        res.json(updateMedicine.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;