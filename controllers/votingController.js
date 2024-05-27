const {DataPemilih, HasilPemilihan} = require("../models")

module.exports = {
    postVoting: async (req, res) => {
        try {
          const { nipd } = req.params;
          const { paslon_id } = req.body;
    
          const cekUser = await DataPemilih.findOne({
            where: {
              nipd,
            },
          });
    
          if (!cekUser) {
            return res.status(404).json({
              status: "error",
              message: `Pemilih dengan nipd ${nipd} tidak ditemukan`,
            });
          }  
          if (cekUser.is_active == 0) {
            return res.status(404).json({
              status: "error",
              message: `Anda sudah melakukan pemilihan suara`,
            });
          }  
    
          const user = await DataPemilih.update(
            {
              paslon_id,
              is_active: '0',
            },
            {
              where: {
                nipd,
              },
            }
          );
          const cekHasil = await HasilPemilihan.findOne({
            where: {
                paslon_id
            }
          });
          await HasilPemilihan.update(
            {
                jumlah_suara: cekHasil.jumlah_suara + 1
            },
            {
                where: {paslon_id}
            }
          );
    
          return res.status(200).json({
            status: "success",
            message: `Berhasil melakukan pemilihan suara.`,
            data: user,
          });
        } catch (err) {
          console.log(err);
        }
      },
    }