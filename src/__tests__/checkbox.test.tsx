import React from 'react';
import renderer from 'react-test-renderer';
import { Checkbox } from 'src/components';

import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
test('renders Checkbox component', () => {
  render(<Checkbox name="active" role="textbox" />);
  const CheckboxElement = screen.getByRole('textbox');
  expect(CheckboxElement).toBeInTheDocument();
});

test('Checkbox to match snapshot', () => {
  const tree = renderer
    .create(
      <Checkbox
        name="name"
        size="xl"
        styles={{
          checkbox: {
            backgroundColor: 'red',
          },
          label: {
            color: 'blue',
          },
        }}
        error
        shadow={{ boxShadow: 'rgb(249, 115, 22) 0px 4px 14px 0px' }}
        isReadOnly
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
