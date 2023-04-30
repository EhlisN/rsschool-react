import { IProduct } from './IProducts';

export interface IResponseProductApi {
  products?: IProduct[] | null;
  total: number;
  skip: number;
  limit: number;
}
