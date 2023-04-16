import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Product from './Product';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

describe('ModalProductCard', () => {
  const closeModal = jest.fn();

  test('renders product details correctly', async () => {
    render(
      <Provider store={store}>
        <Product id={1} closeModal={closeModal} />
      </Provider>
    );
    const state = store.getState();
    const product = state.productSlice[1];

    waitFor(() => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(`Brand: ${product.brand}`)).toBeInTheDocument();
      expect(screen.getByText(`Category: ${product.category}`)).toBeInTheDocument();
      expect(screen.getByText(`Description: ${product.description}`)).toBeInTheDocument();
      expect(screen.getByText(`Price: ${product.price}`)).toBeInTheDocument();
      expect(
        screen.getByText(
          `Discount price: ${Math.trunc(
            product.price - (product.price / 100) * product.discountPercentage
          )}$`
        )
      ).toBeInTheDocument();
      expect(screen.getByText(`Rating: ${product.rating}`)).toBeInTheDocument();
      expect(screen.getByText(`Stock: ${product.stock}`)).toBeInTheDocument();
    });
  });
});
