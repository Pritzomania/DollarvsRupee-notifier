import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import webpush from 'web-push';
import cors from 'cors';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// eslint-disable-next-line import/first
import configure from './push.config';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.use(bodyParser.json());

configure();

app.get('/', (req, res, next) => {
  res.send('Hello World');
});
app.post('/subscribe', (req, res, next) => {
  console.log('req recievd');
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'test' });
  console.log(subscription);
  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });
});

app.listen(PORT, server => {
  console.log(`server is running at http://localhost:${PORT}`);
});
