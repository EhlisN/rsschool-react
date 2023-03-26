import React from 'react';
import PersonPage from './PersonPage';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

test('render PersonPage is successful', () => {
  render(<PersonPage />);
  waitFor(() => expect(screen.getByText('Person')).toBeInTheDocument());
});

test('render PersonPage is successful', async () => {
  render(<PersonPage />);
  const addBtn = screen.getByTestId('open');
  await act(async () => {
    await fireEvent.click(addBtn);
  });
  waitFor(() => expect(screen.getByText('Image:')).toBeInTheDocument());
});
