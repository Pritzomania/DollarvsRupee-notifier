import axios from 'axios';
import { db } from './db';

export async function getExchange() {
  const response = await axios.get(
    'https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,INR'
  );

  return response;
}

export function saveExchange(exchange) {
  db.get('exchange')
    .push(exchange)
    .write();
}
