import session from 'express-session';
import MongoStore from 'connect-mongo';
import config from '../config';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: string };
    lexicon: { [key: string]: string };
  }
}

const authSession = session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: config.isProd },
  store: MongoStore.create({ mongoUrl: config.databaseUrl }),
});

export default authSession;
