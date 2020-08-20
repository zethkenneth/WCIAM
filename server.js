//library requirements
const express = require('express');
const cors = require("cors");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Routes


//Register and login routes
app.use("/auth", require("./routes/Authentication"));

//dashboard routes
app.use("/dashboard", require("./routes/Dashboard/Dashboard"));



app.listen(5000, () => {
    console.log("server is running in port 5000");
})