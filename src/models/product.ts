import dbClient from '../utilities/db-client';

export interface Product {
  id?: number;
  name: string;
  price: number;
  category?: string;
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await dbClient.connect();
      const query = 'SELECT * FROM products';
      const result = await conn.query(query);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Unable to retrive products: ${error}`);
    }
  }

  async indexByCategory(category: string): Promise<Product[]> {
    try {
      const conn = await dbClient.connect();
      const query = 'SELECT * FROM products where category=($1)';
      const result = await conn.query(query, [category]);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Unable to retrive products: ${error}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await dbClient.connect();
      const query = `SELECT * FROM products WHERE id=($1)`;
      const result = await conn.query(query, [id]);
      conn.release();

      if (result.rowCount <= 0) {
        throw new Error('Not found');
      }

      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to retrive product with id ${id}: ${error}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const conn = await dbClient.connect();
      const query = `INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *`;
      const result = await conn.query(query, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to insert product: ${error}`);
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const conn = await dbClient.connect();
      const query = `DELETE FROM products WHERE id=($1)`;
      const result = await conn.query(query, [id]);
      conn.release();

      return result.rowCount;
    } catch (error) {
      throw new Error(`Unable to delete products with id ${id}: ${error}`);
    }
  }
}
