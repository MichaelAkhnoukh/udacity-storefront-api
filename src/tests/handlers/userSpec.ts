import supertest from 'supertest';
import app from '../../index';
import { User } from '../../models/user';

const server = supertest(app);

describe('Integration test suite for user handler', () => {
  it('should create a user', async () => {
    const user: User = {
      firstName: 'michael',
      lastName: 'farah',
      email: 'michael@example.it',
      password: 'test1234',
    };
    const res = await server.post('/api/users/').send(user);
    expect(res.statusCode).toBe(201);

    expect(res.body).toEqual(
      jasmine.objectContaining({
        id: res.body.id,
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
      })
    );
  });

  it('it should fail auth for invalid credentials', async () => {
    const res = await server.post('/api/users/login').send({
      email: 'test@abc.com',
      password: 'abc123',
    });

    expect(res).toBeRejected;
  });

  it('should issue jwt auth token for successful login', async () => {
    const user: User = {
      firstName: 'michael',
      lastName: 'farah',
      email: 'michael@abc.net',
      password: 'test1234',
    };
    await server.post('/api/users/').send(user);

    const res = await server.post('/api/users/auth').send({
      email: 'michael@abc.net',
      password: 'test1234',
    });

    expect(res.body.token).not.toBeNull();
  });

  it('should retrieve a list of registered users', async () => {
    const { token } = (
      await server.post('/api/users/login').send({
        email: 'michael@abc.net',
        password: 'test1234',
      })
    ).body;

    const res = await server
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.body.length).toBeGreaterThan(1);
  });

  it('it should retrieve a user given an id', async () => {
    const { token } = (
      await server.post('/api/users/login').send({
        email: 'michael@abc.net',
        password: 'test1234',
      })
    ).body;

    const { id } = (
      await server.get('/api/users/1').set('Authorization', `Bearer ${token}`)
    ).body;

    expect(id).toEqual(1);
  });
});
