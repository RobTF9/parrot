import env from 'dotenv';

env.config();

const config = {
  environment: process.env.NODE_ENV || 'dev',
  databaseUrl:
    process.env.NODE_ENV === 'test'
      ? 'mongodb://localhost:27017/parrot-test'
      : process.env.MONGO_URI,
  email: process.env.EMAIL,
  emailService: process.env.EMAIL_SERVICE,
  emailPassword: process.env.EMAIL_PASSWORD,
  client:
    process.env.NODE_ENV === 'test'
      ? 'http://localhost:4000/'
      : process.env.CLIENT_URL,
  port: process.env.PORT,
  sessionSecret: process.env.SESSION_SECRET || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  transationCreds: process.env.TRANSLATION_CREDS,
};

export default config;
