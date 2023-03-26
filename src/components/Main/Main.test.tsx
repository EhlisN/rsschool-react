import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Main from './Main';
import userEvent from '@testing-library/user-event';

describe('Main test', () => {
  it('Main render', () => {
    render(<Main />);
    expect(screen.getByRole('value')).toHaveClass('search__input');
  });
  it('Main Page created', () => {
    render(<Main />);
    expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
  });
  it('typing in Search works', async () => {
    await act(async () => {
      render(<Main />);
    });
    await waitFor(() => {
      const inputElement = screen.getByRole('value');
      userEvent.type(inputElement, 'test input');
      expect(inputElement).toHaveValue('test input');
    });
  });
});
