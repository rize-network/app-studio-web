import React from 'react';
import { OTPInput } from 'src/components';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

afterEach(() => {
  cleanup();
});

test('is found by role and accessible name from the label', () => {
  render(<OTPInput name="otp" label="One-time code" />);
  const input = screen.getByRole('textbox', { name: 'One-time code' });
  expect(input).toBeInTheDocument();
});

test('falls back to a generic accessible name without a label', () => {
  render(<OTPInput name="otp" length={4} />);
  const input = screen.getByRole('textbox', {
    name: 'OTP input with 4 digits',
  });
  expect(input).toBeInTheDocument();
});

test('is reachable with the keyboard', async () => {
  render(<OTPInput name="otp" label="One-time code" />);
  const input = screen.getByRole('textbox', { name: 'One-time code' });
  await userEvent.tab();
  expect(input).toHaveFocus();
}, 30000);

test('changing the named element fires onChange with the value', () => {
  const onChange = vi.fn();
  render(<OTPInput name="otp" label="One-time code" onChange={onChange} />);
  const input = screen.getByRole('textbox', { name: 'One-time code' });
  fireEvent.change(input, { target: { value: '123456' } });
  expect(onChange).toHaveBeenCalledWith('123456');
});

test('routes rest props (aria-*, data-*) to the input, not the container', () => {
  render(
    <OTPInput
      name="otp"
      label="One-time code"
      data-testid="otp-input"
      aria-describedby="otp-hint"
    />
  );
  const input = screen.getByRole('textbox', { name: 'One-time code' });
  expect(screen.getByTestId('otp-input')).toBe(input);
  expect(input).toHaveAttribute('aria-describedby', 'otp-hint');
});
