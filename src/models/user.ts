import dbClient from '../utilities/db-client';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserResponse extends Omit<User, 'password'> {
  token?: string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await dbClient.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';

      const conn = await dbClient.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      if (result.rowCount <= 0) {
        throw new Error('Not found');
      }

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user ${id}. Error: ${err}`);
    }
  }

  async showByEmail(email: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE email=($1) LIMIT 1';

      const conn = await dbClient.connect();

      const result = await conn.query(sql, [email]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user ${email}. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *';

      const conn = await dbClient.connect();

      const passwordHash = await bcrypt.hash(
        user.password + process.env.BCRYPT_PASSWORD,
        parseInt(<string>(<unknown>process.env.SALT_ROUNDS))
      );

      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        user.email,
        passwordHash,
      ]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add user ${user.firstName} ${user.lastName}. Error: ${err}`
      );
    }
  }

  async delete(id: string): Promise<number> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';

      const conn = await dbClient.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rowCount;
    } catch (err) {
      throw new Error(`Could not delete user id ${id}. Error: ${err}`);
    }
  }
}
