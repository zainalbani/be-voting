const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;

module.exports = {
    mustLogin: (req, res, next) => {
        try {
            const token = req.headers["authorization"].split("Bearer ")[1];
            if (!token) {
                return res.status(401).json({
                    status: false,
                    message: "you're not authorized! please login first!",
                    data: null,
                });
            }
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;

            next();
        } catch(err){
            if(err.message == "jwt malformed"){
                return res.status(401).json({
                    status: false,
                    message: err.message,
                    data: null,
                });
            }

            next(err);
        }
    }
}