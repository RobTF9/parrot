import { transport, sendAddress } from './email.config';
import {
  resetPasswordTemplate,
  parrotSharedWithYouTemplate,
} from './email.templates';

const sendEmail = (
  recipient: string,
  subject: string,
  template: string,
  header: string
): void => {
  console.log(sendAddress);
  transport.sendMail(
    {
      from: sendAddress,
      to: recipient,
      subject,
      html: template,
      headers: { 'X-PM-Message-Stream': header },
    },
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
    resetPasswordTemplate(name, link),
    'forgot-password'
  );

export const parrotSharedWithYou = (
  recipient: string,
  link: string,
  sender: string,
  name: string
): void =>
  sendEmail(
    recipient,
    `${sender} shared a parrot with you`,
    parrotSharedWithYouTemplate(sender, name, link),
    'null'
  );
