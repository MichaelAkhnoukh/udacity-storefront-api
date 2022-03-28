import express, { Request, Response } from 'express';
import { User, UserResponse, UserStore } from '../../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userStore = new UserStore();

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const input: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    const user: UserResponse = await userStore.create(input);

    user.token = jwt.sign(user, <string>process.env.TOKEN_SECRET);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json((<Error>error).message);
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const input = {
      email: req.body.email,
      password: req.body.password,
    };

    const user = await userStore.showByEmail(input.email);
    const isMatch = await bcrypt.compare(
      input.password + process.env.BCRYPT_PASSWORD,
      user.password
    );

    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(user, <string>process.env.TOKEN_SECRET);

    return res.json({ token: token });
  } catch (error) {
    return res.status(401).json((<Error>error).message);
  }
};

const indexUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await userStore.index();
    return res.json(users);
  } catch (error) {
    return res.status(400).json((<Error>error).message);
  }
};

const showUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await userStore.show(req.params.id);

    return res.json(user);
  } catch (error) {
    return res.status(404).json((<Error>error).message);
  }
};

export function usersRouter(
  app: express.Application,
  middleware: (req: Request, res: Response, next: () => void) => void
) {
  app.post('/api/users', createUser);
  app.post('/api/users/login', login);
  app.get('/api/users/', middleware, indexUsers);
  app.get('/api/users/:id', middleware, showUser);
}
