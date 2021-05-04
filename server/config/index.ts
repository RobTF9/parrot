import env from 'dotenv';

env.config();

const config = {
  environment: process.env.NODE_ENV || 'dev',
  databaseUrl: process.env.MONGO_URI,
  port: process.env.PORT || 3000,
};

export default config;
