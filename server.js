//library requirements
const express = require('express');
const cors = require("cors");


const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Routes
//dashboard routes
app.use("/dashboard", require("./Routes/Dashboard"));
app.use("/inventory", require("./Routes/Inventory"));
app.use("/records", require("./Routes/Records"));
app.use("/transaction", require("./Routes/Transaction"));
app.use("/settings", require("./Routes/Settings"));
app.use("/authentication", require("./Routes/Authentication"));



app.listen(5000, () => {
    console.log("server is running in port 5000");
})