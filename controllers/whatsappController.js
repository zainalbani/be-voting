const { Client, LocalAuth} = require("whatsapp-web.js");
const { DataPemilih } = require("../models");
const puppeteer = require("puppeteer");
const qrcode = require("qrcode-terminal");

const client = new Client({
    webVersionCache: {
        type: "remote",
        remotePath:
          "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
      },
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false,
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
    }
})

client.on('qr', (qr) => {
    console.log(qr)
});
client.on('ready', () => {
    console.log('ready waotp');

})
client.initialize();

const sendOtp = async (req,res) => {
    const { nowa} = req.body;
    const { nipd } = req.params;
    const formattedPhone = nowa.substring(1) + "@c.us";
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`
    const template = "halo kode anda adalah " + otp
    console.log(formattedPhone);
    console.log(template);
    try {

        const pemilih = await DataPemilih.findOne({ where: {nipd}})

        if (!pemilih){
            return res.status(404).send({
                status: false,
                message: "nipd not found",
                data: null,
              });
        }
        if (pemilih.daftar != 0){
            return res.status(400).send({
                status: false,
                message: "Pemilih telah mendaftar"
            })
        }
        await client.sendMessage(formattedPhone, template);

        await DataPemilih.update(
            {
                otp: otp,
                daftar: 1,
            },
            {where: {nipd}}
        );

        return res.status(200).json({
            status: "success",
            message: `berhasil mengirim pesan ke nomor hp ${formattedPhone}`,
        });
    } catch (err){
        console.log(err);
    }
}

module.exports = {sendOtp}