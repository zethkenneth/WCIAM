const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (acc_id) => {
    const payload = {
        user: acc_id 
    };

    return jwt.sign(payload,process.env.jwtSecret, {expiresIn: "1hr"});
}

module.exports = jwtGenerator;