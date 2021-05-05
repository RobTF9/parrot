import nodemailer from 'nodemailer';
import config from '../../config';

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.gmail,
    pass: config.gmailPassword,
  },
});

export const sendEmail = (
  recipient: string,
  subject: string,
  template: string
): void => {
  transport.sendMail(
    { from: config.gmail, to: recipient, subject, html: template },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    }
  );
};
