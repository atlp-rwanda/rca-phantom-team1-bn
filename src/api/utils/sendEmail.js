/* eslint-disable prettier/prettier */
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = async (to, subject, text) => {
  const msg = {
    to,
    from: "your_email@example.com",
    subject,
    text,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (err) {
    console.log("Error sending email:", err);
  }
};
