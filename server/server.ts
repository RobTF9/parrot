import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import connect from './utils/database';
import userRouter from './resources/user/user.router';
import config from './config';
import { protect } from './services/auth/auth.middleware';
import authRouter from './services/auth/auth.router';
import lexiconRouter from './resources/lexicon/lexicon.router';
import errorHandler from './utils/errorHandler';
import authSession from './utils/session';
import gameRouter from './resources/game/game.router';
import phraseRouter from './resources/phrase/phrase.router';
import resultRouter from './resources/result/result.router';
import translationRouter from './services/translation/translate';
import progressRouter from './services/progress/progress.router';

export const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'test' }));

app.set('trust proxy', 1);
app.use(authSession);

app.use('/auth', authRouter);
app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/lexicon', lexiconRouter);
app.use('/api/phrase', phraseRouter);
app.use('/api/game', gameRouter);
app.use('/api/result', resultRouter);
app.use('/api/translate', translationRouter);
app.use('/api/progress', progressRouter);

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
