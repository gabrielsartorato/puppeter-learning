import express from 'express';
import cors from 'cors';

import gettingData from './utils/puppeteer';

const app = express();

app.use(cors());
app.use(express.json());

interface QueryParams {
  week_day: string;
  origin: string;
  destiny: string;
}

app.get('/', async (request, response) => {
  const { week_day, origin, destiny } = request.query;

  const stops = await gettingData({ week_day, origin, destiny } as QueryParams);

  return response.json({ stops });
});

app.listen(3333, () => {
  console.log('Server is running at port 3333');
});
