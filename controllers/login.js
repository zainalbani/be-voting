const {DataPemilih} = require("../models");

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

        return res.status(200).send({
            status: true,
            message: "user logged in successfully",
            data: {
                user
            }
        });
    } catch (err){
        console.log(err);
    }
}

module.exports = {login};