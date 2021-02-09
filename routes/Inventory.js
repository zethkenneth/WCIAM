const router = require("express").Router();
const pool = require("../ConnectionDatabase");
/*
-------------------------------------------------------------------------------
// Inventory 
-------------------------------------------------------------------------------
*/


/*
-------------------------------------------------------------------------------
// Stocks 
-------------------------------------------------------------------------------
*/

router.get("/stocks", async (req, res) => {
    try {
        const stocks = await pool.query("SELECT * FROM stocks");
        res.json(stocks.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.post("/stocks/addstock", async (req ,res) => {
    try {
        //1.destructure req.body
        const { st_arrived_date, st_expiration_date, st_quantity , st_fk_medicine_id } = req.body;
        //2. add the new stock from the database
        const stock = await pool.query("INSERT INTO stocks(stocks_arrived_date, stocks_expiration_date, stocks_quantity, stock_total_quantity, fk_medicine_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",[
            st_arrived_date, 
            st_expiration_date, 
            st_quantity, 
            st_quantity, 
            st_fk_medicine_id 
        ]);
        //3.send back a response
        res.json(stock.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("SERVER ERROR");
    }
});

router.delete("/stocks/:st_id", async (req, res) => {
    try {
        console.log("delete");
        //1. destucture req.params
        const { st_id } = req.params;

        const deleteStock = await pool.query("DELETE FROM stocks WHERE stocks_id = $1 RETURNING *",[
            st_id
        ]);
        
        res.json(deleteStocs.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
        
    }
});

/*
-------------------------------------------------------------------------------
// medicines 
-------------------------------------------------------------------------------
*/

//get all medicines
router.get("/medicines", async (req, res) => {
    try {
        const medicines = await pool.query("SELECT * FROM medicines");

        res.json(medicines.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//get a single medicine
router.get("/medicines/:m_id", async (req, res) =>{
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
router.post("/medicines/addmedicine", async (req , res) => {
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

router.put("/medicines/:m_id", async (req, res)=> {
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