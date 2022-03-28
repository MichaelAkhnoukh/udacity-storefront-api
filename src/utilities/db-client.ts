import { Pool } from 'pg';
import 'dotenv/config';

const {
  DB_HOST,
  DB_PORT,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  APP_ENV
} = process.env;

const dbClient = new Pool({
  host: DB_HOST,
  port: <number>(<unknown>DB_PORT),
  database: APP_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default dbClient;
