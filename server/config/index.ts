import env from 'dotenv';

env.config();

const config = {
  environment: process.env.NODE_ENV || 'dev',
  databaseUrl: process.env.MONGO_URI,
  port: process.env.PORT || 3000,
  sessionSecret: process.env.SESSION_SECRET || 'dev',
  isProd: process.env.NODE_ENV === 'production',
};

export default config;
