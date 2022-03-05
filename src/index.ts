import express from 'express';
import router from './routes';
import 'dotenv/config';

const app = express();

app.use('/api', router);

app.listen(process.env.SERVER_PORT, (): void => {
  console.log(`server started on http://localhost:${process.env.SERVER_PORT}`);
});
