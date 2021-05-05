import nodemailer from 'nodemailer';
import config from '../../config';

export const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.gmail,
    pass: config.gmailPassword,
  },
});

export const sendAddress = config.gmail;
