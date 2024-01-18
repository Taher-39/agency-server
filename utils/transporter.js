const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.company_email,
        pass: process.env.company_email_app_pass,
    },
});

module.exports = { transporter };