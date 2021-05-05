import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import connect from './utils/database';
import userRouter from './resources/user/user.router';
import config from './config';
import { protect } from './services/auth/auth.middleware';
import authRouter from './services/auth/auth.router';
import errorHandler from './utils/errorHandler';
import authSession from './utils/session';

export const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'test' }));

app.use(authSession);

app.use('/auth', authRouter);
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
