const { DataCalon, HasilPemilihan } = require("../models");

module.exports = {
  createCalon: async (req, res) => {
    try {
      const {
        nama_ketua,
        nama_wakil_ketua,
        visi,
        misi,
        youtube_link,
        paslon_id,
      } = req.body;

      const image_url = req.file;

      const uploadImage =
        `http://localhost:8000/public/images/` + image_url.filename;

      const pemilihan = await HasilPemilihan.create({
        paslon_id,
        jumlah_suara: 0,
      });

      const calon = await DataCalon.create({
        nama_ketua,
        nama_wakil_ketua,
        visi,
        misi,
        image_url: uploadImage,
        youtube_link,
        paslon_id,
      });

      if (!calon) {
        return res.status(400).send({
          status: false,
          message: "create calon failed",
          data: null,
        });
      }

      return res.status(200).send({
        status: true,
        message: "create calon successful",
        data: calon,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
