import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';

test('should render the correct navigation links', () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  const mainLink = screen.getByRole('link', { name: /Main/i });
  const aboutLink = screen.getByRole('link', { name: /About Us/i });

  expect(mainLink.getAttribute('href')).toBe('/main');
  expect(aboutLink.getAttribute('href')).toBe('/about');
});
