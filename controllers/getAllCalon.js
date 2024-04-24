const { DataCalon } = require("../models")

module.exports = {
  getAllCalon: async (req, res) => {
    try {
      const calon = await DataCalon.findAll();

      if (!calon) {
        return res.status(404).send({
          status: false,
          message: "calon not found",
          data: null,
        });
      }

      return res.status(200).send({
        status: true,
        message: "get all calon successful",
        data: calon,
      });
    } catch (err) {
      console.log(err);
    }
  },
}