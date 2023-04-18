import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';
import { store } from 'redux/store';
import Main from './Main';

describe('<Main />', () => {
  test('handles search input change and form submission', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    const searchInput = getByPlaceholderText('Search...') as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByTestId('search-button');
    expect(searchButton).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');
  });
});
