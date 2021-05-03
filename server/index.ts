import express from 'express';
import { join } from 'path';
import Bundler from 'parcel-bundler';

const app = express();

const file = join(__dirname, '..', 'client', 'index.html');
const bundler = new Bundler(file);
app.use(bundler.middleware());

app.listen(3000);
