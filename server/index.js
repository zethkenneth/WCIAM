const express =  require("express");
const cors = require("cors");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/auth", require("./routes/LoginAuth.js"));



app.listen(5000,() => {
    console.log("SERVER is running in port 5000");
})
