import { OrderStore, Order, OrderStatus } from '../../models/order';
import { UserStore } from '../../models/user';

describe('Test suite for Order model', () => {
  beforeAll(async () => {
    const userStore = new UserStore();
    await userStore.create({
      firstName: 'michael',
      lastName: 'michael',
      email: 'mike@example.abc',
      password: 'test1234',
    });
  });

  const orderStore = new OrderStore();

  it('should create a order', async () => {
    const order: Order = {
      status: OrderStatus.active,
      user_id: 1,
    };

    const result = await orderStore.create(order);

    expect(result).toEqual(jasmine.objectContaining({}));
  });

  it('should list all orders', async () => {
    const orders: Order[] = [
      {
        status: OrderStatus.active,
        user_id: 1,
      },
      {
        status: OrderStatus.completed,
        user_id: 1,
      },
    ];

    for (const order of orders) {
      await orderStore.create(order);
    }

    const result = await orderStore.index();

    expect(result.length).toBeGreaterThanOrEqual(orders.length);
  });

  it('should get a order by id', async () => {
    const order: Order = {
      status: OrderStatus.active,
      user_id: 1,
    };

    const result = await orderStore.create(order);

    const findOrder = await orderStore.show(<number>(<unknown>result.id));

    expect(findOrder.id).toEqual(result.id);
  });

  it('should delete a order by id', async () => {
    const order: Order = {
      status: OrderStatus.active,
      user_id: 1,
    };

    const result = await orderStore.create(order);

    expect(await orderStore.delete(<number>(<unknown>result.id))).toBe(1);
  });
});
