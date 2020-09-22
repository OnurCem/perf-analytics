import { Db, MongoClient } from 'mongodb';

const CONNECTION_URL = process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.NODE_ENV === 'test' ? 'perfanalytics_test' : 'perfanalytics';

let db: Db;

export const getDB = (): Promise<Db> =>
  new Promise<Db>((resolve, reject) => {
    if (db) {
      resolve(db);
    } else {
      MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (!error) {
          db = client.db(DB_NAME);

          resolve(db);
        } else {
          // eslint-disable-next-line no-console
          console.error(error);

          reject();
        }
      });
    }
  });
