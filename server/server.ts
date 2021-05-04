import express from 'express';
import session from 'express-session';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import connect from './utils/database';
import userRouter from './resources/user/user.router';
import config from './config';
import { protect, signIn, signUp } from './utils/auth';
import errorHandler from './utils/errorHandler';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: string };
  }
}

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config.isProd },
  })
);

app.post('/auth/signin', signIn);
app.post('/auth/signup', signUp);

app.use('/api/user', protect, userRouter);

// Serve client
const clientPath = path.join(__dirname, '..', 'client');
app.use(express.static(clientPath));
app.use('*', express.static(clientPath));

app.use(errorHandler);

const start = async (): Promise<void> => {
  try {
    await connect();
    app.listen(config.port, () =>
      console.log(`Server running on ${config.port}`)
    );
  } catch (error) {
    console.error(error);
  }
};

export default start;
