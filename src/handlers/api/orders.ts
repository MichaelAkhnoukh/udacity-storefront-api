import express, { Request, Response } from 'express';
import { OrderStore, OrderStatus } from '../../models/order';
import { UserStore } from '../../models/user';

const ordersStore = new OrderStore();

const userOrders = async (req: Request, res: Response): Promise<Response> => {
  try {
    await new UserStore().show(<string>(<unknown>req.query.userId));

    const order = await ordersStore.getUserOrders(
      <number>(<unknown>req.query.userId),
      <OrderStatus>(<unknown>req.query.status)
    );

    return res.json(order);
  } catch (error) {
    return res.status(400).json((<Error>error).message);
  }
};

export function ordersRouter(
  app: express.Application,
  middleware: (req: Request, res: Response, next: () => void) => void
) {
  app.get('/api/orders/', middleware, userOrders);
}
