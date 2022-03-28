import dbClient from '../utilities/db-client';

export enum OrderStatus {
  active = 'active',
  completed = 'completed',
}

export interface Order {
  id?: number;
  status: OrderStatus;
  user_id: number;
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await dbClient.connect();
      const query = 'SELECT * FROM orders';
      const result = await conn.query(query);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Unable to retrive orders: ${error}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await dbClient.connect();
      const query = `SELECT * FROM orders WHERE id=($1)`;
      const result = await conn.query(query, [id]);
      conn.release();

      if (result.rowCount <= 0) {
        throw new Error('Not found');
      }

      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to retrive order with id ${id}: ${error}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await dbClient.connect();
      const query = `INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *`;
      const result = await conn.query(query, [order.status, order.user_id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to insert order: ${error}`);
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const conn = await dbClient.connect();
      const query = `DELETE FROM orders WHERE id=($1)`;
      const result = await conn.query(query, [id]);
      conn.release();

      return result.rowCount;
    } catch (error) {
      throw new Error(`Unable to delete order with id ${id}: ${error}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<Order> {
    try {
      const conn = await dbClient.connect();
      const query =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(query, [quantity, orderId, productId]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to add product ${productId} to order ${orderId}: ${error}`
      );
    }
  }

  async getUserOrders(
    userId: number,
    status: OrderStatus = OrderStatus.active
  ): Promise<Order[]> {
    try {
      const conn = await dbClient.connect();
      const query =
        'SELECT * from orders o INNER JOIN order_products op ON op.order_id = o.id INNER JOIN products p ON p.id = op.product_id WHERE o.user_id=($1) AND o.status=($2)';

      const result = await conn.query(query, [userId, status]);

      conn.release();
      
      if (result.rowCount <= 0) {
        throw new Error('Not found');
      }

      return result.rows;
    } catch (error) {
      throw new Error(
        `Unable to find order for userId ${userId} with status ${status}`
      );
    }
  }
}
