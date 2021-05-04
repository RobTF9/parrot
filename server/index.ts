import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import mongoose from 'mongoose';
import env from 'dotenv';

env.config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/api/hello', (_, res) => {
  res.json({ message: 'hello' });
});

// Serve react app
const clientPath = path.join(__dirname, '..', 'client');
app.use(express.static(clientPath));
app.use('*', express.static(clientPath));

// Connect database
if (typeof process.env.MONGO_URI === 'string') {
  console.log('Connecting to database...');
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () =>
    console.log('Connected to database')
  );
}

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));
