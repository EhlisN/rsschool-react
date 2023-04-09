import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

test('Header renders correctly', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(screen.getByText(/My App/i)).toBeInTheDocument();
});
