import webpush from 'web-push';
import { getTime, parse } from 'date-fns';
import { getExchange, saveExchange } from './exchangeAPI';
import { db } from './db';

const cron = require('node-cron');

export function runCron() {
  cron.schedule('0 */12 * * *', async function() {
    console.log('running a task every minute');
    const exchange = await getExchange();
    console.log(exchange.data.rates, exchange.data.date);
    const currentSubscription = db.get('subscription').value();

    const savePayload = {
      rate: exchange.data.rates.INR,
      updateDate: getTime(parse(exchange.data.date, 'yyyy-MM-dd', new Date())),
      timestamp: getTime(new Date()),
    };
    saveExchange(savePayload);
    const payload = JSON.stringify({
      title: 'New Rate Available!',
      rate: exchange.data.rates.INR,
    });
    webpush.sendNotification(currentSubscription, payload).catch(error => {
      console.error(error.stack);
    });
  });
}
