import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from 'App';
import { BrowserRouter } from 'react-router-dom';

test('Renders App correctly', () => {
  render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  expect(screen.getByText('My App')).toBeInTheDocument();
});
