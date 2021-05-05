import mongoose from 'mongoose';
import cuid from 'cuid';
import _ from 'lodash';
import User from '../../server/resources/user/user.model';

const models = { User };

const url = 'mongodb://localhost:27017/test';

global.newId = () => {
  return mongoose.Types.ObjectId();
};

const remove = (collection) =>
  new Promise<void>((resolve, reject) => {
    collection.deleteMany((err) => {
      if (err) reject(err);
      resolve();
    });
  });

beforeEach(async (done) => {
  const db = cuid();
  function clearDB() {
    return Promise.all(
      _.map(mongoose.connection.collections, (c) => remove(c))
    );
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(url + db, {
        useNewUrlParser: true,
        autoIndex: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      });
      await clearDB();
      await Promise.all(Object.keys(models).map((name) => models[name].init()));
    } catch (err) {
      console.log('connection error');
      console.error(err);
      throw err;
    }
  } else {
    await clearDB();
  }
  done();
});

afterEach(async (done) => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  return done();
});

afterAll((done) => {
  return done();
});
