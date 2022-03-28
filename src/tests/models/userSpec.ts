import { UserStore, User } from '../../models/user';

describe('Test suite for User model', () => {
  const userStore = new UserStore();

  it('should create a user', async () => {
    const user: User = {
      firstName: 'michael',
      lastName: 'hany',
      email: 'michael@test.com',
      password: 'test1234',
    };

    const result = await userStore.create(user);

    expect(result).toEqual(
      jasmine.objectContaining({
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
      })
    );
  });

  it('should list all users', async () => {
    const users: User[] = [
      {
        firstName: 'michael',
        lastName: 'hany',
        email: 'michael@test.org',
        password: 'test1234',
      },
      {
        firstName: 'michael',
        lastName: 'akhnoukh',
        email: 'michael@example.com',
        password: 'test1234',
      },
    ];

    for (const user of users) {
      await userStore.create(user);
    }

    const result = await userStore.index();

    expect(result.length).toBeGreaterThanOrEqual(users.length);
  });

  it('should get a user by id', async () => {
    const user: User = {
      firstName: 'michael',
      lastName: 'hany',
      email: 'michael@test.net',
      password: 'test1234',
    };

    const result = await userStore.create(user);

    const findUser = await userStore.show(<string>(<unknown>result.id));

    expect(findUser.id).toEqual(result.id);
  });

  it('should get a user by email', async () => {
    const user: User = {
      firstName: 'michael',
      lastName: 'hany',
      email: 'michael@test.xyz',
      password: 'test1234',
    };

    const result = await userStore.create(user);

    const findUser = await userStore.showByEmail(result.email);

    expect(findUser.email).toEqual(result.email);
  });

  it('should delete a user by id', async () => {
    const user: User = {
      firstName: 'michael',
      lastName: 'hany',
      email: 'michael@test.eg',
      password: 'test1234',
    };

    const result = await userStore.create(user);

    expect(await userStore.delete(<string>(<unknown>result.id))).toBe(1);
  });
});
