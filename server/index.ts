import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import connect from './utils/database';
import userRouter from './resources/user/user.router';
import config from './config';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/user', userRouter);

// Serve react app
const clientPath = path.join(__dirname, '..', 'client');
app.use(express.static(clientPath));
app.use('*', express.static(clientPath));

const start = async () => {
  try {
    await connect();
    app.listen(config.port, () =>
      console.log(`Server running on ${config.port}`)
    );
  } catch (error) {
    console.error(error);
  }
};

start();
