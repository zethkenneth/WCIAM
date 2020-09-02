const router = require("express").Router();
const pool = require("../../../ConnectionDatabase");
const authorize = require("../../../middleware/authorization");


// get all the stocks
router.get("/", async (req, res) => {
    try {
        const stocks = await pool.query("SELECT * FROM stocks");

        res.json(stocks.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.post("/addstock", async (req ,res) => {
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

router.delete("/:st_id", async (req, res) => {
    try {
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

router.use("/medicines", require("./Medicines"));

module.exports = router;