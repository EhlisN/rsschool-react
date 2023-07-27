import React from 'react';
import { render, screen } from '@testing-library/react';
import Person from './Person';

const item = {
  id: 0,
  image:
    'https://w7.pngwing.com/pngs/895/199/png-transparent-spider-man-heroes-download-with-transparent-background-free-thumbnail.png',
  name: 'Alex',
  description: 'Good boy!!!',
  dateOfBirth: '16.06.1993',
  gender: 'male',
  status: 'free',
  hobby: ['cards', 'bike'],
};

test('render Person is successful', () => {
  render(<Person key={item.id} item={item} />);
  expect(screen.getByText('Alex')).toBeInTheDocument();
});
