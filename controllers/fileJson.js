const { sequelize } = require('../models')
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

module.exports = {
    getAllCalon: async (req, res) => {
        try {

            const query = `SELECT dp.paslon_id, dc.nama_ketua, dc.nama_wakil_ketua, COUNT(*) AS jumlah FROM datapemilih dp LEFT JOIN datacalon dc ON dc.paslon_id = dp.paslon_id GROUP BY paslon_id;`

            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT
            })

            if (!results) {
                return res.status(404).send({
                    status: false,
                    message: "hasil not found",
                    data: null,
                });
            }

            const finalResults = results.map((item) => {
                let paslon = item.paslon_id == null ? 'Belum memilih' : item.paslon_id

                return {
                    paslon_id: paslon,
                    nama_ketua: item.nama_ketua,
                    wakil_ketua: item.nama_wakil_ketua,
                    jumlah: item.jumlah,
                }
            })

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('finalResults');

            worksheet.columns = [
                { header: 'Paslon ID', key: 'paslon_id', width: 20 },
                { header: 'Nama Ketua', key: 'nama_ketua', width: 20 },
                { header: 'Nama Wakil Ketua', key: 'wakil_ketua', width: 20 },
                { header: 'Jumlah', key: 'jumlah', width: 10 },
            ];
            finalResults.forEach((item) => {
                worksheet.addRow({
                    paslon_id: item.paslon_id,
                    nama_ketua: item.nama_ketua,
                    wakil_ketua: item.wakil_ketua,
                    jumlah: item.jumlah,
                });
            });

            // Menyimpan file ke server
            const exportPath = path.join(__dirname, 'exports');
            const filePath = path.join(exportPath, 'paslons.xlsx');
            await workbook.xlsx.writeFile(filePath);

            // Mengirim file ke klien
            res.download(filePath, 'paslons.xlsx', (err) => {
                if (err) {
                    console.error('Error sending file:', err);
                    res.status(500).send('Internal Server Error');
                } else {
                }
            });

            // return res.status(200).send({
            //     status: true,
            //     message: "get all jumlah successful",
            //     data: finalResults,
            // });
        } catch (err) {
            console.log(err);
        }
    },
}