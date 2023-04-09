import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Product from './Product';
import { getProductById } from 'components/Api/Api';

describe('ModalProductCard', () => {
  const closeModal = jest.fn();

  test('renders product details correctly', async () => {
    const product = await getProductById(1);
    render(<Product id={1} closeModal={closeModal} />);
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
