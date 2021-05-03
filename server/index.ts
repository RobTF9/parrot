import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/', function (_, res) {
  res.sendFile('index.html');
});

app.get('/api/hello', function (_, res) {
  res.json({ message: 'no' });
});

app.listen(3000);
