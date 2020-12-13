const router = require("express").Router();
const pool = require("../../../ConnectionDatabase");
const authorize = require("../../../middleware/authorization");

router.get("/", async (req, res) => {
    try {
        res.json("THIS IS THE TRANSACTION ROUTE!");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.post("/addtransaction", async (req, res) => {
    try {
        //1.destructure the req.body
        const { 
                p_weight,
                p_height,
                p_bp,
                p_sugar_level,
                p_body_temperature,
                p_fk_student_id,
                p_fk_employee_id, 
                rec_description,
                rec_medicine_given,
                rec_fk_patient_id,
                rec_fk_stock_id,
                rec_fk_account_id  
              } = req.body
        //2.add a patient
        

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;