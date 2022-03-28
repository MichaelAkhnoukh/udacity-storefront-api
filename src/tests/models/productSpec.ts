import { ProductStore, Product } from '../../models/product';

describe('Test suite for Product model', () => {
  const productStore = new ProductStore();

  it('should create a product', async () => {
    const product: Product = {
      name: 'banana',
      price: 10,
      category: 'food',
    };

    const result = await productStore.create(product);

    expect(result).toEqual(
      jasmine.objectContaining({
        name: product.name,
        price: product.price,
        category: product.category,
      })
    );
  });

  it('should list all products', async () => {
    const products: Product[] = [
      {
        name: 'apple',
        price: 5,
        category: 'food',
      },
      {
        name: 'Backpack',
        price: 50,
        category: 'Bags',
      },
    ];

    for (const product of products) {
      await productStore.create(product);
    }

    const result = await productStore.index();

    expect(result.length).toBeGreaterThanOrEqual(products.length);
  });

  it('should get a product by id', async () => {
    const product: Product = {
      name: 'Iphone',
      price: 500,
      category: 'cellphones',
    };

    const result = await productStore.create(product);

    const findProduct = await productStore.show(<number>(<unknown>result.id));

    expect(findProduct.id).toEqual(result.id);
  });

  it('should delete a product by id', async () => {
    const product: Product = {
      name: 'Pepsi',
      price: 10,
      category: 'drinks',
    };

    const result = await productStore.create(product);

    expect(await productStore.delete(<number>(<unknown>result.id))).toBe(1);
  });
});
