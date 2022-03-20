import { transport } from './email.config';
import { resetPasswordTemplate, onboardingTemplate } from './email.templates';

const sendEmail = (
  recipient: string,
  subject: string,
  template: string,
  header: string
): void => {
  transport.sendMail(
    {
      from: 'support@parrot.to',
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

export const onboardingEmail = (
  recipient: string,
  link: string,
  name: string
): void =>
  sendEmail(
    recipient,
    'Welcome to Parrot',
    onboardingTemplate(name, link),
    'onboarding'
  );
