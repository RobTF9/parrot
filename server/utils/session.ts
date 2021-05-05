import session from 'express-session';
import config from '../config';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: string };
  }
}

const authSession = session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: config.isProd },
});

export default authSession;
