import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import webpush from 'web-push';
import cors from 'cors';
import { runCron } from './scheduler';

// eslint-disable-next-line import/first
import configurePush from './push.config';
import { db, initDb } from './db';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.use(bodyParser.json());

initDb();
configurePush();

app.get('/', (req, res, next) => {
  res.send('This is the backend');
});

app.post('/subscribe', (req, res, next) => {
  const currentSubscription = db.get('subscription').value();
  const subscription = {
    ...req.body,
    expirationTime: Math.floor(Date.now() / 1000 + 12 * 60 * 60),
  };
  if (
    currentSubscription &&
    currentSubscription.endpoint &&
    currentSubscription.endpoint === req.body.endpoint
  ) {
    res.status(201).json({});

    console.log('subscription refreshed: ', subscription);
    db.set('subscription', subscription).write();
  } else {
    res.status(201).json({});

    console.log('subscription created: ', subscription);
    db.set('subscription', subscription).write();

    runCron();

    const payload = JSON.stringify({ title: 'Registered Successfully!' });
    webpush.sendNotification(subscription, payload).catch(error => {
      console.error(error.stack);
    });
  }
});

app.get('/fetch', (req, res, next) => {
  const currentExchangeData = db.get('exchange').value();
  let response = null;
  if (currentExchangeData.length) {
    response = { data: currentExchangeData[0] };
  }
  res.status(200).json(response);
});

app.get('/push', (req, res, next) => {
  const currentSubscription = db.get('subscription').value();
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'Another push from postman!' });
  webpush.sendNotification(currentSubscription, payload).catch(error => {
    console.error(error.stack);
  });
});

app.listen(PORT, server => {
  console.log(`server is running at http://localhost:${PORT}`);
});
