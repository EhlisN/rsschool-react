import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from 'components/interfaces/IProducts';
import { IResponseProductApi } from 'components/interfaces/IResponseProductApi';

export const BASE_URL = 'https://dummyjson.com/products/';

export const productAPI = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], string>({
      query: (search) => ({
        url: '/search',
        params: { q: search },
      }),
      transformResponse: (response: IResponseProductApi) => response.products ?? [],
    }),
    getProductById: builder.query<IProduct, number>({
      query: (id) => `${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productAPI;
