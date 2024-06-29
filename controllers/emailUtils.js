const nodeMailer = require('nodemailer');

const html = `
    <h1>Hello World</h1>
    <p>Isn't NodeMailer useful?</p>
    `;

module.exports = {
    sendEmail: async (dataEmail) => {
        return new Promise(async (resolve, reject) => {
            try {
                const transporter = nodeMailer.createTransport({
                    service : 'gmail',
                    auth: {
                        user: 'evoting2507@gmail.com',
                        pass: 'jepvlcebcrbtdhkd'
                    }
                });
                const response = await transporter.sendMail(dataEmail);

                resolve(response)
            } catch (err) {
                reject(err);

            }

        });
    },
};