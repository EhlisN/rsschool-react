import React from 'react';
import PersonPage from './PersonPage';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

test('render PersonPage is successful', () => {
  render(
    <Provider store={store}>
      <PersonPage />
    </Provider>
  );
  waitFor(() => expect(screen.getByText('Person')).toBeInTheDocument());
});

test('open form works correct', async () => {
  render(
    <Provider store={store}>
      <PersonPage />
    </Provider>
  );
  const addBtn = screen.getByTestId('open');
  await act(async () => {
    await fireEvent.click(addBtn);
  });
  waitFor(() => expect(screen.getByText('Image:')).toBeInTheDocument());
});
