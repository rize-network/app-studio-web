import React from 'react';
import renderer from 'react-test-renderer';
import { Switch } from 'src/components';

import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

// test('renders Switch component', () => {
//   render(<Switch name="active" role="textbox" />);
//   const SwitchElement = screen.getByRole('textbox');
//   expect(SwitchElement).toBeInTheDocument();
// });

// test('renders disabled Switch', () => {
//   render(<Switch name="active" isDisabled role="textbox" />);
//   const inputElement = screen.getByRole('textbox');
//   expect(inputElement).toBeDisabled();
// });

test('Switch to match snapshot', () => {
  const tree = renderer
    .create(
      <Switch
        name="name"
        size="xl"
        views={{
          slider: {
            backgroundColor: 'red',
          },
          circle: {
            backgroundColor: 'blue',
          },
        }}
        shadow={{ boxShadow: 'rgb(249, 115, 22) 0px 4px 14px 0px' }}
        isReadOnly
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
