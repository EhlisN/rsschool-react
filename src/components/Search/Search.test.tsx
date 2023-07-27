import React from 'react';
import { Provider } from 'react-redux';
import { render, act } from '@testing-library/react';
import { store } from 'redux/store';
import userEvent from '@testing-library/user-event';
import Main from 'components/Main/Main';

describe('<Search />', () => {
  test('test searchSubmitHandler', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    const searchInput = getByPlaceholderText('Search...') as HTMLInputElement;
    act(() => {
      userEvent.type(searchInput, 'Test');
      userEvent.type(searchInput, '{enter}');
    });
    expect(store.getState().searchSlice.stateSearch).toEqual('Test');
  });
});
