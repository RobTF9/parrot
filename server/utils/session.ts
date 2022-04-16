import session from 'express-session';
import ConnectSession from 'connect-mongodb-session';
import { ObjectId } from 'mongoose';
import config from '../config';

declare module 'express-session' {
  export interface SessionData {
    user: ObjectId;
    parrot: {
      _id: ObjectId;
      language: {
        name: string;
        htmlCode: string;
        langCode: string;
        isRomanLanguage: boolean;
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
