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
  client: process.env.CLIENT_URL,
  port: process.env.PORT || process.env.NODE_ENV === 'test' ? 4000 : 3000,
  sessionSecret:
    process.env.SESSION_SECRET || process.env.NODE_ENV === 'test'
      ? 'test'
      : 'dev',
  isProd: process.env.NODE_ENV === 'production',
  transationCreds: process.env.TRANSLATION_CREDS,
};

export default config;
