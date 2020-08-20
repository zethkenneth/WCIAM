const router = require("express").Router();
const pool = require("../../../ConnectionDatabase");
const authorize = require("../../../middleware/authorization");

router.get("/", authorize, async (req, res) => {
    try {
        res.json("THIS IS THE BUNDLES ROUTE!");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.post("/add", authorize, async (req, res) => {
    try {
        /*1. Destructure the req.body  
            bundle_arrived_date ,
            bundle_expiration_date ,
            bundle_total_quantity 
         */
        const { bun_arrived_date, bun_expiration_date, bun_total_quantity  } = req.body;

        /*2. add bundle so it can create a medicine */
        const bundle = await pool.query("INSERT INTO bundles ( bundle_arrived_date ,bundle_expiration_date,bundle_total_quantity VALUES ($1,$2,$3)",
            [
                bun_arrived_date, 
                bun_expiration_date, 
                bun_total_quantity 
            ]);
        //3.confirmation
        res.json("Successfully Added");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.use("/medicines",require("./Medicines"));

module.exports = router;