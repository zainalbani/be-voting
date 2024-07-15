const { DataCalon } = require("../models");

module.exports = {
  updateCalon: async (req, res) => {
    try {
      const { nama_ketua, nama_wakil_ketua, visi, misi, youtube_link } =
        req.body;

      const paslon_id = req.params.id;

      const image_url = req.file;

      const uploadImage =
        `http://192.168.123.40:8000/public/images/` + image_url.filename;

      const calon = await DataCalon.update(
        {
          nama_ketua,
          nama_wakil_ketua,
          visi,
          misi,
          image_url: uploadImage,
          youtube_link,
        },
        {
          where: {
            paslon_id,
          },
        }
      );

      if (!calon) {
        return res.status(400).send({
          status: false,
          message: "update calon failed",
          data: null,
        });
      }

      return res.status(200).send({
        status: true,
        message: "update calon successful",
        data: calon,
      });
    } catch (err) {
      console.log(err);
    }
  },

  updateCalonWithoutImage: async (req, res) => {
    try {
      const { nama_ketua, nama_wakil_ketua, visi, misi, youtube_link } =
        req.body;

      const paslon_id = req.params.id;

      const calon = await DataCalon.update(
        {
          nama_ketua,
          nama_wakil_ketua,
          visi,
          misi,
          youtube_link,
        },
        {
          where: {
            paslon_id,
          },
        }
      );

      if (!calon) {
        return res.status(400).send({
          status: false,
          message: "update calon failed",
          data: null,
        });
      }

      return res.status(200).send({
        status: true,
        message: "update calon successful",
        data: calon,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
