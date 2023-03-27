import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  // Configure your email provider here
  service: 'gmail',
  auth: {
    user: 'constance.nimuhire@gmail.com',
    pass: 'evangelist',
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
