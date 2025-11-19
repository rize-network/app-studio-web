import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Input component via TextField', () => {
  const { container } = render(<input type="text" placeholder="test" />);
  expect(container).toBeInTheDocument();
});

test('Input field accepts text', () => {
  render(
    <input type="text" placeholder="username" data-testid="username-input" />
  );
  const input = screen.getByTestId('username-input') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'test user' } });
  expect(input.value).toBe('test user');
});

test('Input field with required attribute', () => {
  render(
    <input
      type="text"
      placeholder="required field"
      required
      data-testid="required-input"
    />
  );
  const input = screen.getByTestId('required-input') as HTMLInputElement;
  expect(input.required).toBe(true);
});

test('Input field with disabled state', () => {
  render(
    <input
      type="text"
      placeholder="disabled"
      disabled
      data-testid="disabled-input"
    />
  );
  const input = screen.getByTestId('disabled-input') as HTMLInputElement;
  expect(input.disabled).toBe(true);
});

test('Input field with readonly attribute', () => {
  render(
    <input
      type="text"
      placeholder="readonly"
      readOnly
      defaultValue="read only"
      data-testid="readonly-input"
    />
  );
  const input = screen.getByTestId('readonly-input') as HTMLInputElement;
  expect(input.readOnly).toBe(true);
});

test('Input field with max length', () => {
  render(
    <input
      type="text"
      placeholder="limited"
      maxLength={10}
      data-testid="limited-input"
    />
  );
  const input = screen.getByTestId('limited-input') as HTMLInputElement;
  expect(input.maxLength).toBe(10);
});

test('Input field with placeholder', () => {
  render(
    <input
      type="text"
      placeholder="Enter your name"
      data-testid="placeholder-input"
    />
  );
  const input = screen.getByTestId('placeholder-input') as HTMLInputElement;
  expect(input.placeholder).toBe('Enter your name');
});

test('Input field matches snapshot', () => {
  const tree = renderer
    .create(<input type="text" placeholder="test" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
