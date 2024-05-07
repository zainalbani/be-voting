const {DataPemilih} = require("../models");
const { JWT_SECRET } = process.env

const login = async (req,res) => {
    try {
        const { nipd, otp } = req.body;

        const user = await DataPemilih.findOne({ where: { nipd } });
        if(!user) {
            return res.status(404).send({
                message: "user not found",
            });
        }
        
        if(otp != user.otp) {
            return res.status(401).send({
                message: "otp is invalid",
            });
        }

        const payload = {
            id: user.nipd
        };

        const token = jwt.sign(payload, JWT_SECRET);

        const data = {
            nipd: user.nipd
        };

        return res.status(200).send({
            status: true,
            message: "user logged in successfully",
            data,
            token,
        });
    } catch (err){
        console.log(err);
    }
}

module.exports = {login};