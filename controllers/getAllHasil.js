const { HasilPemilihan } = require("../models")
const { Op } = require('sequelize');

module.exports = {
  getAllHasil: async (req, res) => {
    try {
      const hasil = await HasilPemilihan.findAll({
        where: {
          is_active: {
            [Op.ne]: "0"
          }
        }
      });

      if (!hasil) {
        return res.status(404).send({
          status: false,
          message: "hasil not found",
          data: null,
        });
      }

      return res.status(200).send({
        status: true,
        message: "get all hasil successful",
        data: hasil,
      });
    } catch (err) {
      console.log(err);
    }
  },
}