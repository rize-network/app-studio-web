import React from 'react';
import renderer from 'react-test-renderer';
import { TextField } from 'src/components';
import { ProfileIcon } from 'src/components/Icon/Icon';

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});

test('renders TextField component', () => {
  render(<TextField name="username" role="textbox" />);
  const textFieldElement = screen.getByRole('textbox');
  expect(textFieldElement).toBeInTheDocument();
});

test('renders TextField with specified role', () => {
  render(<TextField name="username" role="textbox" />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toBeInTheDocument();
});

test('renders with placeholder', () => {
  render(<TextField name="username" placeholder="Enter your name" />);
  const inputElement = screen.getByPlaceholderText('Enter your name');
  expect(inputElement).toBeInTheDocument();
});

test('renders with initial value', () => {
  render(<TextField name="username" value="John" role="textbox" />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toHaveValue('John');
});

test('renders disabled TextField', () => {
  render(<TextField name="username" isDisabled />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toBeDisabled();
});

test('renders readonly TextField', () => {
  render(<TextField name="username" value="readonly value" isReadOnly />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toHaveAttribute('readonly');
  expect(inputElement).toHaveValue('readonly value');
  userEvent.type(inputElement, 'attempt to change');
  expect(inputElement).toHaveValue('readonly value');
});

// test('renders helper text when error is true', () => {
//   const helperText = 'This is helper text';
//   render(<TextField name="error" helperText={helperText} error={true} />);
//   const helperTextElement = screen.queryByText(helperText);
//   expect(helperTextElement).toBeInTheDocument();
// });

test('TextField to match snapshot', () => {
  const tree = renderer
    .create(
      <TextField
        name="name"
        placeholder="Name"
        left={<ProfileIcon size={12} />}
        error={true}
        helperText={'required'}
        variant="outline"
        size="xl"
        views={{
          box: {
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
