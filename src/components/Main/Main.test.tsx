import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Main from './Main';
import userEvent from '@testing-library/user-event';

describe('Main test', () => {
  beforeEach(() => {
    render(<Main />);
  });

  test('Main render', () => {
    expect(screen.getByRole('value')).toHaveClass('search__input');
  });

  test('Main Page created', () => {
    expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
  });

  test('typing in Search works', async () => {
    await waitFor(() => {
      const inputElement = screen.getByRole('value');
      userEvent.type(inputElement, 'test input');
      expect(inputElement).toHaveValue('test input');
    });
  });

  test('handles search input change and form submission', () => {
    const handleInputChange = jest.fn();
    const searchInput = screen.getByPlaceholderText('Search') as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');

    expect(handleInputChange).toHaveBeenCalledTimes(0);
  });
});
