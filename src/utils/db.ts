import { Db, MongoClient } from 'mongodb';

const CONNECTION_URL = 'mongodb://localhost:27017';
const DB_NAME = 'perfanalytics';

let db: Db;

MongoClient.connect(CONNECTION_URL, (error, client) => {
  if (!error) {
    // eslint-disable-next-line no-console
    console.log('Connected successfully to DB');

    db = client.db(DB_NAME);
  } else {
    // eslint-disable-next-line no-console
    console.error(error);
  }
});

export const getDB = (): Db => db;
