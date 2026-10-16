/**
 * Accessible-name lockdown: every form control, given a `label`, must be
 * reachable with getByRole(role, { name }) — never a [name="…"] selector.
 * This is the QA floor mvp-todo measures; a failure here means a consumer
 * will fall back to workarounds again.
 */
import React from 'react';
import {
  Checkbox,
  ColorInput,
  CountryPicker,
  DatePicker,
  Radio,
  Select,
  Selector,
  Switch,
  TextArea,
  TextField,
} from 'src/components';
import { OTPInput } from 'src/components/OTPInput/OTPInput';

import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('TextField: textbox named by its label', () => {
  render(<TextField name="email" label="Email address" />);
  expect(
    screen.getByRole('textbox', { name: 'Email address' })
  ).toBeInTheDocument();
});

test('TextArea: textbox named by its label', () => {
  render(<TextArea name="bio" label="Biography" />);
  expect(
    screen.getByRole('textbox', { name: 'Biography' })
  ).toBeInTheDocument();
});

test('Select: combobox named by its label', () => {
  render(
    <Select
      name="plan"
      label="Billing plan"
      options={[{ label: 'Monthly', value: 'monthly' }]}
    />
  );
  expect(
    screen.getByRole('combobox', { name: 'Billing plan' })
  ).toBeInTheDocument();
});

test('Selector: radiogroup named by its label, options as radios', () => {
  render(
    <Selector
      name="mode"
      label="Mode"
      options={[
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ]}
    />
  );
  expect(screen.getByRole('radiogroup', { name: 'Mode' })).toBeInTheDocument();
  expect(screen.getByRole('radio', { name: 'Dark' })).toBeInTheDocument();
});

test('Switch: switch named by its label', () => {
  render(<Switch name="hiring" label="Anybody permitted may hire" />);
  expect(
    screen.getByRole('switch', { name: 'Anybody permitted may hire' })
  ).toBeInTheDocument();
});

test('Checkbox: checkbox named by its label', () => {
  render(<Checkbox name="terms" label="Accept terms" />);
  expect(
    screen.getByRole('checkbox', { name: 'Accept terms' })
  ).toBeInTheDocument();
});

test('Radio: radio named by its label', () => {
  render(<Radio name="freq" value="weekly" label="Weekly" />);
  expect(screen.getByRole('radio', { name: 'Weekly' })).toBeInTheDocument();
});

test('DatePicker: named by its label even while unfocused', () => {
  render(<DatePicker name="birthday" label="Birthday" />);
  expect(screen.getByRole('textbox', { name: 'Birthday' })).toBeInTheDocument();
});

test('CountryPicker: named by its label', () => {
  render(<CountryPicker name="country" label="Country" />);
  expect(screen.getByRole('combobox', { name: 'Country' })).toBeInTheDocument();
});

test('ColorInput: trigger named by its label', () => {
  render(<ColorInput name="accent" label="Accent color" />);
  expect(
    screen.getByRole('button', { name: 'Accent color' })
  ).toBeInTheDocument();
});

test('OTPInput: named by its label', () => {
  render(<OTPInput name="otp" label="Verification code" value="" />);
  expect(
    screen.getByRole('textbox', { name: 'Verification code' })
  ).toBeInTheDocument();
});
