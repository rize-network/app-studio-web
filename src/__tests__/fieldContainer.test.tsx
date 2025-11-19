import React from 'react';
import renderer from 'react-test-renderer';
import { FieldContainer } from 'src/components/Input';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders FieldContainer component without crashing', () => {
  render(<FieldContainer />);
});

test('renders FieldContainer with children', () => {
  render(
    <FieldContainer>
      <input type="text" placeholder="Test input" />
    </FieldContainer>
  );
  const inputElement = screen.getByPlaceholderText('Test input');
  expect(inputElement).toBeInTheDocument();
});

test('renders FieldContainer with helperText', () => {
  render(
    <FieldContainer helperText="This is helper text">
      <input type="text" />
    </FieldContainer>
  );
  const helperTextElement = screen.getByText('This is helper text');
  expect(helperTextElement).toBeInTheDocument();
});

test('does not render helperText when error is present', () => {
  render(
    <FieldContainer helperText="Helper text" error="Error message">
      <input type="text" />
    </FieldContainer>
  );
  const helperTextElement = screen.queryByText('Helper text');
  expect(helperTextElement).not.toBeInTheDocument();
});

test('renders FieldContainer with error message', () => {
  render(
    <FieldContainer error="This is an error">
      <input type="text" />
    </FieldContainer>
  );
  const errorElement = screen.getByText('This is an error');
  expect(errorElement).toBeInTheDocument();
});

test('renders error message instead of helperText when both are provided', () => {
  render(
    <FieldContainer helperText="Helper text" error="Error message">
      <input type="text" />
    </FieldContainer>
  );
  expect(screen.getByText('Error message')).toBeInTheDocument();
  expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
});

test('renders FieldContainer with multiple children', () => {
  render(
    <FieldContainer>
      <label>Label</label>
      <input type="text" placeholder="Input" />
    </FieldContainer>
  );
  expect(screen.getByText('Label')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Input')).toBeInTheDocument();
});

test('renders FieldContainer without helperText or error', () => {
  render(
    <FieldContainer>
      <input type="text" placeholder="Simple input" />
    </FieldContainer>
  );
  const inputElement = screen.getByPlaceholderText('Simple input');
  expect(inputElement).toBeInTheDocument();
});

test('FieldContainer with helperText matches snapshot', () => {
  const tree = renderer
    .create(
      <FieldContainer helperText="Please enter your name">
        <input type="text" name="name" />
      </FieldContainer>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('FieldContainer with error matches snapshot', () => {
  const tree = renderer
    .create(
      <FieldContainer error="This field is required">
        <input type="text" name="required-field" />
      </FieldContainer>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('FieldContainer with custom views matches snapshot', () => {
  const customViews = {
    container: { backgroundColor: 'lightgray', padding: 16 },
    helperText: { color: 'blue' },
    error: { color: 'darkred', fontWeight: 'bold' },
  };

  const tree = renderer
    .create(
      <FieldContainer helperText="Custom styled helper" views={customViews}>
        <input type="text" />
      </FieldContainer>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
