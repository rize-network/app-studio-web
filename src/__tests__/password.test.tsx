import React from 'react';
import renderer from 'react-test-renderer';
import { Password } from 'src/components';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Password component', () => {
  render(<Password name="username" role="textbox" />);
  const PasswordElement = screen.getByRole('textbox');
  expect(PasswordElement).toBeInTheDocument();
});

test('renders Password with specified role', () => {
  render(<Password name="username" role="textbox" />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toBeInTheDocument();
});

test('renders Password with placeholder', () => {
  render(<Password name="username" placeholder="Enter your name" />);
  const inputElement = screen.getByPlaceholderText('Enter your name');
  expect(inputElement).toBeInTheDocument();
});

test('renders with initial value', () => {
  render(<Password name="username" value="John" role="textbox" />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toHaveValue('John');
});

test('Password to match snapshot', () => {
  const tree = renderer
    .create(
      <Password
        error={true}
        name="name"
        variant="outline"
        placeholder="Name"
        helperText={'required'}
        size="xl"
        views={{
          container: {
            backgroundColor: 'red',
          },
          label: {
            fontSize: 15,
          },
          field: {
            backgroundColor: 'red',
          },
        }}
        isAutoFocus
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
