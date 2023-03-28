import dotenv from "dotenv";
import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import { template } from "../utils/account-created";

dotenv.config();

const mailer = async (email, password) => {
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SEND_GRID_API_KEY,
    })
  );

  // email details
  const mailOptions = {
    from: process.env.PROJECTEMAIL,
    to: email,
    subject: "Account Created",
    html: template(password),
    mail_settings: {
      sandbox_mode: {
        enable: process.env.NODE_ENV === "test" ? true : false,
      },
    },
  };

  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("Message sent!!!");
    }
  });
};

export default mailer;
