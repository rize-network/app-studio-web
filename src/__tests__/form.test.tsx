import React from 'react';
import renderer from 'react-test-renderer';
import { Form } from 'src/components';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Form component without crashing', () => {
  render(<Form />);
});

test('renders Form with children', () => {
  render(
    <Form>
      <input type="text" placeholder="Name" />
    </Form>
  );
  const input = screen.getByPlaceholderText('Name');
  expect(input).toBeInTheDocument();
});

test('renders Form with onSubmit handler', () => {
  const handleSubmit = jest.fn((e) => e.preventDefault());
  render(
    <Form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </Form>
  );
  const submitButton = screen.getByText('Submit');
  expect(submitButton).toBeInTheDocument();
});

test('renders Form with various input types', () => {
  render(
    <Form>
      <input type="text" placeholder="text input" />
      <input type="email" placeholder="email input" />
      <input type="password" placeholder="password input" />
      <textarea placeholder="textarea"></textarea>
    </Form>
  );
  expect(screen.getByPlaceholderText('text input')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('email input')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('password input')).toBeInTheDocument();
});

test('Form matches snapshot', () => {
  const tree = renderer
    .create(
      <Form>
        <input type="text" placeholder="Name" />
        <button type="submit">Submit</button>
      </Form>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
