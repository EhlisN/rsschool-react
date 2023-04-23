import React from 'react';
import userEvent from '@testing-library/user-event';
import { IPerson } from 'components/interfaces/IPerson';
import AddPerson from './AddPerson';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

describe('Form tests', () => {
  const items: IPerson[] = [
    {
      id: 0,
      image:
        'https://w7.pngwing.com/pngs/895/199/png-transparent-spider-man-heroes-download-with-transparent-background-free-thumbnail.png',
      name: 'Alex',
      description: 'Good boy!!!',
      dateOfBirth: '16.06.1993',
      gender: 'male',
      status: 'free',
      hobby: ['cards', 'bike'],
    },
  ];

  let jsdomAlert: () => void;

  beforeEach(() => {
    jsdomAlert = window.alert;
    window.alert = () => {};
    render(
      <Provider store={store}>
        <AddPerson ind={items.length} />
      </Provider>
    );
    const openForm = screen.getByTestId('open');
    fireEvent.click(openForm);
  });

  afterEach(() => {
    window.alert = jsdomAlert;
  });

  test('Should render Form component', () => {
    act(() => {
      const form = screen.getByTestId('form');
      expect(form).toBeDefined();
    });
  });

  test('Should disabled submit button if just first input is valid', () => {
    act(() => {
      const nameInput = screen.getByTestId('name');
      fireEvent.input(nameInput, { target: { value: 'Test value' } });
      const submitBtn = screen.getByTestId('submit');
      waitFor(() => expect(submitBtn).toBeDisabled());
    });
  });

  test('Should disable button after submit if input is invalid', async () => {
    await act(() => {
      const nameInput = screen.getByTestId('name');
      fireEvent.input(nameInput, { target: { value: 'test value' } });
      const submitBtn = screen.getByTestId('submit');
      fireEvent.click(submitBtn);

      waitFor(() => expect(submitBtn).toBeDisabled());
    });
  });

  test('Should enable button after all required inputs are valid', async () => {
    await act(() => {
      const nameInput = screen.getByTestId('name');
      fireEvent.input(nameInput, { target: { value: 'Test value' } });

      const dateInput = screen.getByTestId('date');
      fireEvent.input(dateInput, { target: { value: '16.06.1986' } });

      const descrInput = screen.getByTestId('descr');
      fireEvent.input(descrInput, { target: { value: 'test value' } });

      const submitBtn = screen.getByTestId('submit');
      fireEvent.click(submitBtn);
      waitFor(() => expect(submitBtn).toBeEnabled());
    });
  });

  test('Should upload file with input file', async () => {
    await act(async () => {
      const fileInput = screen.getByTestId('file') as HTMLInputElement;
      const file = new File(['test'], 'test.png', { type: 'image/png' });

      await userEvent.upload(fileInput, file);

      if (fileInput.files) {
        expect(fileInput.files[0]).toStrictEqual(file);
      }
    });
  });

  test('Should render Form ', async () => {
    const form = screen.getByTestId('form');
    await act(async () => {
      const openForm = screen.getByTestId('open');
      await fireEvent.click(openForm);
    });
    expect(form).toBeDefined();
  });
});
