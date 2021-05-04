import mongoose from 'mongoose';
import config from '../config';

const connect = (): void => {
  if (typeof config.databaseUrl === 'string') {
    console.log('Connecting to database...');

    mongoose.connect(config.databaseUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () =>
      console.log('Connected to database')
    );
  }
};

export default connect;
