import express from 'express';
import bodyParser from 'body-parser';

import collect from './routes/collect';

const PORT = 8080;

const app = express();

app.use(bodyParser.json());

app.use('/collect', collect);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at ${PORT} port`);
});
