import React from 'react';
import { DatePicker } from 'src/components';

import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders DatePicker component', () => {
  render(<DatePicker name="active" role="textbox" />);
  const DatePickerElement = screen.getByRole('textbox');
  expect(DatePickerElement).toBeInTheDocument();
});

test('renders disabled DatePicker', () => {
  render(<DatePicker name="diabled" isDisabled role="textbox" />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toBeDisabled();
});

test('renders readonly DatePicker', () => {
  render(<DatePicker name="username" isReadOnly role="textbox" />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toHaveAttribute('readonly');
});

test('DatePicker displays helper text', () => {
  const helperText = 'Select a date';
  render(<DatePicker helperText={helperText} />);
  const helperTextElement = screen.getByText(helperText);
  expect(helperTextElement).toBeInTheDocument();
});
