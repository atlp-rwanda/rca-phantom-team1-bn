import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  // Configure your email provider here
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
