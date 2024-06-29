
const { DataCalon } = require("../models")

module.exports = {
    getCalonById: async (req, res) => {
        try {
            const { paslon_id } = req.params;
            const calon = await DataCalon.findOne({ where: { paslon_id } });

            if (!calon) {
                return res.status(404).send({
                    status: false,
                    message: "kandidat not found",
                    data: null,
                });
            }

            return res.status(200).send({
                status: true,
                message: "get kandidat by id successful",
                data: calon,
            });
        } catch (err) {
            console.log(err);
        }
    },
}