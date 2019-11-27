const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('generated/db.json');
export const db = low(adapter);

export function initDb() {
  db.defaults({ subscription: {} }).write();
}
