import React from 'react';
import renderer from './actRenderer.test-utils';
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

test('renders readonly TextField', async () => {
  render(<TextField name="username" value="readonly value" isReadOnly />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toHaveAttribute('readonly');
  expect(inputElement).toHaveValue('readonly value');
  // Must be awaited: an un-awaited userEvent.type keeps dispatching keystrokes
  // after this test returns, and they land in whatever the next test renders.
  await userEvent.type(inputElement, 'attempt to change');
  expect(inputElement).toHaveValue('readonly value');
}, 30000);

// The runtime half of the `onChange` contract. The type-level half lives in
// src/__tests__/types/value-first-callbacks.type-test.tsx, which asserts that a
// DOM-shaped handler (`e.target.value`) no longer compiles.
test('onChange receives the value, not a DOM event', async () => {
  const received: unknown[] = [];
  render(<TextField name="query" onChange={(value) => received.push(value)} />);

  await userEvent.type(screen.getByRole('textbox'), 'abc');

  // The field's whole value after each keystroke — the same thing
  // `event.target.value` would have held, handed over directly.
  expect(received).toEqual(['a', 'ab', 'abc']);
  // Every argument is a plain string; none of them has a `.target`.
  received.forEach((arg) => {
    expect(typeof arg).toBe('string');
    expect((arg as any).target).toBeUndefined();
  });
}, 30000);

test('a controlled TextField keeps the characters it is typed', async () => {
  const Controlled = () => {
    const [query, setQuery] = React.useState('');
    return <TextField name="query" value={query} onChange={setQuery} />;
  };
  render(<Controlled />);

  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'hello');

  expect(input).toHaveValue('hello');
}, 30000);

test('the clear button notifies onChangeText even without onChange', async () => {
  // Regression: `onChangeText` used to be gated on `onChange` being present,
  // so clearing was a silent no-op for onChangeText-only consumers — which is
  // exactly what the Formik wrapper passes for text fields.
  const changes: string[] = [];
  render(
    <TextField
      name="query"
      value="something"
      onChangeText={(value) => changes.push(value)}
    />
  );

  await userEvent.click(document.querySelector('svg')!.parentElement!);

  expect(changes).toEqual(['']);
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
