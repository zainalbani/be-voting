const { DataPemilih } = require('../models');
const {Op} = require ('sequelize');

const searchUser = async (req, res) => {
    try {
        const { keyword } = req.query;

        const user = await DataPemilih.findAll({
            where: {
                [Op.or]: [
                    {
                        nipd: {
                            [Op.like]: `%${keyword}%`
                        }
                    },

                    {
                        nama_siswa: {
                            [Op.like]: `%${keyword}%`
                        }
                    },
                ]
            }
        });
        if (user.length == 0) {
            return res.status(404).send({
                message: "user not found",
            });
        }

        return res.status(200).send({
            status: true,
            message: "search user successfully",
            data: user,
        });
    } catch (err) {
        console.log(err);
    }
}
module.exports = { searchUser };