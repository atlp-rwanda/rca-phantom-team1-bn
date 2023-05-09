/* eslint-disable prettier/prettier */
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (subject, receiver, text) => {
  var mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: receiver,
    subject: subject,
    html: text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log(error);
  }
};
