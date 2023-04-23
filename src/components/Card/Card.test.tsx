import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Card from './Card';

const item = {
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  images: [
    'https://i.dummyjson.com/data/products/1/1.jpg',
    'https://i.dummyjson.com/data/products/1/2.jpg',
    'https://i.dummyjson.com/data/products/1/3.jpg',
    'https://i.dummyjson.com/data/products/1/4.jpg',
    'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  ],
};

const setModalMock = jest.fn();

test('render card is successful', () => {
  render(<Card key={item.id} item={item} setModal={setModalMock} />);
  expect(screen.getByText('iPhone 9')).toBeInTheDocument();
});

test('open modal is successful', () => {
  render(<Card key={item.id} item={item} setModal={setModalMock} />);
  const titleLink = screen.getByText(item.title);
  fireEvent.click(titleLink);
  expect(screen.getByText('Apple')).toBeInTheDocument();
});
