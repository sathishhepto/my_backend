const nodemailer = require("nodemailer");
const user = process.env.APPMAIL;
const pass = process.env.APPPW;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

const sendMail = async (to, subject, text, res, statusCode = 200) => {
  try {
    const mailOptions = {
      from:user,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    res.status(statusCode).json({ success: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = { sendMail };
