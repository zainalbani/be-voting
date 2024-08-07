const { DataCalon, HasilPemilihan } = require("../models");

module.exports = {
  deleteCalon: async (req, res) => {
    try {
      const paslon_id = req.params.id;

      const calon = await DataCalon.destroy({
        where: {
          paslon_id,
        },
      });

      const hasilPemilihan = await HasilPemilihan.destroy({
        where: {
          paslon_id,
        },
      });

      if (!calon || !hasilPemilihan) {
        return res.status(400).send({
          status: false,
          message: "delete calon failed",
          data: null,
        });
      }

      return res.status(200).send({
        status: true,
        message: "delete calon successful",
        data: calon,
      });
    } catch (err) {
      console.log(err);
    }
  },
  nonaktifCalon: async (req, res) => {
    try {
      const paslon_id = req.params.id;

      const calon = await DataCalon.update(
        {
          is_active : "0"
      },
      {
        where: {
          paslon_id,
        },
      });

      const hasilPemilihan = await HasilPemilihan.update({
        is_active : "0"
      },{
        where: {
          paslon_id,
        },
      });

      if (!calon || !hasilPemilihan) {
        return res.status(400).send({
          status: false,
          message: "nonaktif calon failed",
          data: null,
        });
      }

      return res.status(200).send({
        status: true,
        message: "nonaktif calon successful",
        data: calon,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
