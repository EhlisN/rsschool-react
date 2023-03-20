import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import ErrorPage from './ErrorPage';

test('Error page renders correctly', () => {
  render(<ErrorPage />);
  expect(screen.getByText(/404/i)).toBeInTheDocument();
});
