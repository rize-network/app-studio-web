import React from 'react';
import { DatePicker } from 'src/components';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

afterEach(() => {
  cleanup();
});

// The textbox role is baked into the component (native date inputs have no
// implicit ARIA mapping), so no `role` prop crutch is needed in these tests.
test('renders DatePicker component', () => {
  render(<DatePicker name="active" />);
  const DatePickerElement = screen.getByRole('textbox');
  expect(DatePickerElement).toBeInTheDocument();
});

test('is found by role and accessible name from the label', () => {
  render(<DatePicker name="birthday" label="Birthday" />);
  const input = screen.getByRole('textbox', { name: 'Birthday' });
  expect(input).toBeInTheDocument();
});

test('is reachable with the keyboard', async () => {
  render(<DatePicker name="birthday" label="Birthday" />);
  const input = screen.getByRole('textbox', { name: 'Birthday' });
  await userEvent.tab();
  expect(input).toHaveFocus();
}, 30000);

test('changing the named element fires onChange with the date string', () => {
  const onChange = vi.fn();
  render(<DatePicker name="birthday" label="Birthday" onChange={onChange} />);
  const input = screen.getByRole('textbox', { name: 'Birthday' });
  fireEvent.change(input, { target: { value: '2024-05-12' } });
  expect(onChange).toHaveBeenCalledWith('2024-05-12');
  expect(input).toHaveValue('2024-05-12');
});

test('renders disabled DatePicker', () => {
  render(<DatePicker name="diabled" isDisabled />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toBeDisabled();
});

test('renders readonly DatePicker', () => {
  render(<DatePicker name="username" isReadOnly />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toHaveAttribute('readonly');
});

test('DatePicker displays helper text', () => {
  const helperText = 'Select a date';
  render(<DatePicker helperText={helperText} />);
  const helperTextElement = screen.getByText(helperText);
  expect(helperTextElement).toBeInTheDocument();
});
