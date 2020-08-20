module.exports = (req, res, next) => {
    const { acc_lastname, acc_firstname, acc_middlename, acc_extname, acc_username, acc_password, acc_type, acc_status, acc_date_created }= req.body;

    if (req.path === "/register") {
        if (![acc_lastname, acc_firstname, acc_middlename, acc_username, acc_password, acc_type, acc_status, acc_date_created].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    }
    next();
};