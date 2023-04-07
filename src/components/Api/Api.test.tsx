import { getProductById, getProducts } from './Api';

describe('getProducts and getProductDetails functions', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('getProducts returns an array of products', async () => {
    const mockResponseProducts = { products: [{ id: 1, title: 'Product 1', price: 10 }] };
    const mockJsonPromiseProducts = Promise.resolve(mockResponseProducts);
    const mockFetchPromiseProducts = Promise.resolve({
      json: () => mockJsonPromiseProducts,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseProducts);
    const products = await getProducts('search query');
    expect(Array.isArray(products)).toBe(true);
    expect(products[0]).toHaveProperty('id');
    expect(products[0]).toHaveProperty('title');
    expect(products[0]).toHaveProperty('price');
  });

  test('getProductDetails returns a product object', async () => {
    const mockProduct = { id: 1, title: 'Product 1', price: 10 };
    const mockResponseProduct = Promise.resolve(mockProduct);
    const mockFetchPromiseProduct = Promise.resolve({
      json: () => mockResponseProduct,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseProduct);

    const product = await getProductById(1);
    expect(typeof product).toBe('object');
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
  });
});
