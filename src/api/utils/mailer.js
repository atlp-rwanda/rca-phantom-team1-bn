/* eslint-disable no-console */
import ejs from "ejs";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const mailer = async (email, password) => {
  const transporter = await nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let template = "../../public/templates/account-created.ejs";
  let subject = "Your Phantom Account Created";

  return ejs.renderFile(
    path.join(__dirname, template),
    password,
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        const emailOptions = {
          from: `Phantom <${process.env.PROJECT_EMAIL}>`,
          to: email,
          subject,
          html: data,
        };

        transporter
          .sendMail(emailOptions)
          .then(() => console.log)
          .catch(() => console.error);
      }
    }
  );
};

export default mailer;
