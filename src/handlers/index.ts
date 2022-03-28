import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ordersRouter } from './api/orders';
import { productsRouter } from './api/products';
import { usersRouter } from './api/users';

const verifyAuthToken = (
  req: Request,
  res: Response,
  next: () => void
): void => {
  try {
    const authHeader = req.headers.authorization;
    const authToken = authHeader?.split(' ')[1];

    if (!authToken) {
      throw new Error('missing auth header');
    }

    jwt.verify(<string>authToken, <string>process.env.TOKEN_SECRET);

    next();
  } catch (error) {
    res.status(401).json((<Error>error).message);
  }
};

export function router(app: express.Application) {
  usersRouter(app, verifyAuthToken);
  productsRouter(app, verifyAuthToken);
  ordersRouter(app, verifyAuthToken);
}
