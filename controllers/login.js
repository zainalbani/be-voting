const {DataPemilih} = require("../models");
const { JWT_SECRET } = process.env
const jwt = require("jsonwebtoken");

const login = async (req,res) => {
    try {
        const { nipd, otp } = req.body;

        const user = await DataPemilih.findOne({ where: { nipd } });
        if(!user) {
            return res.status(404).send({
                message: "User tidak ditemukan",
            });
        }
        if (user.role == 'user'){
            if(otp != user.otp) {
                return res.status(401).send({
                    message: "Otp anda salah",
                });
            }
            if(user.is_active == 0){
                return res.status(401).send({
                    message: "Anda sudah melakukan pemilihan suara. Apabila terdapat kesalahan, silahkan hubungi Wali Kelas",
                });
            }
        }
        
        return res.status(200).send({
            status: true,
            message: "user logged in successfully",
            user
        });
    } catch (err){
        console.log(err);
    }
}

module.exports = {login};