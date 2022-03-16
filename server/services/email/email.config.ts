import nodemailer from 'nodemailer';
import config from '../../config';

export const transport = nodemailer.createTransport({
  host: config.emailService,
  port: 465,
  secure: true,
  auth: {
    user: config.email,
    pass: config.emailPassword,
  },
});

export const sendAddress = config.email;
