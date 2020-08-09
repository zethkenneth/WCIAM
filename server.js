//library requirements
const express = require('express');
const cors = require("cors");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Routes


//Register and login routes
app.use("/auth", require("./routes/jwtAuth"));





app.listen(5000, () => {
    console.log("server is running in port 5000");
})