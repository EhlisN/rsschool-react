import { IProduct } from 'components/state/IProducts';

async function getProducts(search: string): Promise<IProduct[]> {
  const res = await fetch(`https://dummyjson.com/products/search?q=${search}`);
  const data = await res.json();
  return data.products;
}

async function getProductById(id: number): Promise<IProduct> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  return data;
}

export { getProducts, getProductById };
