const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or another email provider
    auth: {
      user: process.env.EMAIL_USER,     // Your email
      pass: process.env.EMAIL_PASS,     // App password (not your normal one)
    },
  });

  const mailOptions = {
    from: `"Deshi Food Villa" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
