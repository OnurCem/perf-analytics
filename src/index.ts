import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import collect from './routes/collect';

const PORT = 8080;

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(bodyParser.json());

app.use('/collect', collect);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at ${PORT} port`);
});
