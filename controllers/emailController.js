const { DataPemilih } = require("../models");
const { sendEmail } = require("../controllers/emailUtils");


module.exports = async (req, res, next) => {
    try {
        const { email, nipd } = req.body;
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`

        const pemilih = await DataPemilih.findOne({ where: { nipd } });

        if (!pemilih) {
            return res.status(404).send({
                status: false,
                message: "nipd not found",
                data: null,
            });
        }
        if (pemilih.daftar != 0) {
            return res.status(400).send({
                status: false,
                message: "Pemilih telah mendaftar"
            })
        }
        const html = `
        <h1>Hello ${pemilih.nama_siswa}</h1>
        <p>Kode OTP untuk pemilihan suara anda adalah ${otp} </p>
        `;
        const templateEmail = {
            from: 'E-Voting SMK N 2 Bawang <evoting2507@gmail.com>',
            to: email.toLowerCase(),
            subject: "Kode OTP untuk Pemilihan Suara",
            html: html
        };
        await sendEmail(templateEmail);
        await DataPemilih.update(
            {
                otp: otp,
                daftar: 1,
                email: email
            },
            { where: { nipd } }
        );
        return res.status(200).json({
            status: "success",
            message: `berhasil mengirim email ke alamat email ${email}`,
        });
    } catch (error) {
        next(error);
    }
};