import { transport, sendAddress } from './email.config';
import { resetPasswordTemplate } from './email.templates';

const sendEmail = (
  recipient: string,
  subject: string,
  template: string
): void => {
  transport.sendMail(
    { from: sendAddress, to: recipient, subject, html: template },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    }
  );
};

export const resetPasswordEmail = (
  recipient: string,
  link: string,
  name: string
): void =>
  sendEmail(
    recipient,
    'Reset your password',
    resetPasswordTemplate(name, link)
  );
