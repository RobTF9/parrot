import session from 'express-session';
import ConnectSession from 'connect-mongodb-session';
import config from '../config';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: string };
    lexicon: {
      _id: string;
      language: {
        name: string;
        htmlCode: string;
        langCode: string;
      };
    };
  }
}

const MongoDBStore = ConnectSession(session);

const store = new MongoDBStore({
  uri: config.databaseUrl || '',
  collection: 'sessions',
});

store.on('error', function (error) {
  console.log(error);
});

const authSession = session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: false,
  cookie: { secure: config.isProd },
  store,
});

export default authSession;
