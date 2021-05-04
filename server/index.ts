import express from 'express';
import path from 'path';

const app = express();

app.get('/api/hello', function (_, res) {
  res.json({ message: 'hello' });
});

const clientPath = path.join(__dirname, '..', 'client');
app.use(express.static(clientPath));
app.use('*', express.static(clientPath));

app.listen(3000);
