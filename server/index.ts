import express from 'express';
import path from 'path';

const app = express();

app.get('/', function (_, res) {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(3000);
