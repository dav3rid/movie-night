const data = require('./data/index');
const db = require('./connection');
const ENV = process.env.NODE_ENV || 'development';

const seed = require('./seed');

seed(data[ENV]).then(() => {
  console.log('seeding complete');
  return db.end();
});
