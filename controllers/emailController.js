const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (req, res) => {
  const { email, subject, description } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.company_email,
        pass: process.env.company_email_app_pass,
      },
    });
    const mailOptions = {
      from: email,
      to: process.env.company_email,
      subject: subject,
      text: `Message: ${description}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error: error });
  }
};

module.exports = { sendEmail };
