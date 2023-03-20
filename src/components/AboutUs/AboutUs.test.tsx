import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import AboutUs from './AboutUs';

test('About us page renders correctly', async () => {
  render(<AboutUs />);
  await waitFor(() => {
    const page = screen.getByText('About us');
    expect(page).toBeInTheDocument();
  });
});
