import express from 'express';
import { router } from './handlers';
import 'dotenv/config';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'http://localhost',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
router(app);

app.listen(process.env.SERVER_PORT, async (): Promise<void> => {
  console.log(`server started on http://localhost:${process.env.SERVER_PORT}`);
});

export default app;