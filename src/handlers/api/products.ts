import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../../models/product';

const productStore = new ProductStore();

const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    return res.json(await productStore.create(product)).status(201);
  } catch (error) {
    return res.status(400).json((<Error>error).message);
  }
};

const getProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const product = await productStore.show(<number>(<unknown>req.params.id));

    return res.json(product);
  } catch (error) {
    return res.status(404).json((<Error>error).message);
  }
};

const getAllProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const products = await productStore.index();

    return res.json(products);
  } catch (error) {
    return res.status(404).json((<Error>error).message);
  }
};

export function productsRouter(
  app: express.Application,
  middleware: (req: Request, res: Response, next: () => void) => void
) {
  app.post('/api/products/', middleware, createProduct);
  app.get('/api/products/', getAllProducts);
  app.get('/api/products/:id', getProduct);
}
