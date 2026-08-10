import React from 'react';
import { Radio, RadioGroup } from 'src/components';

import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});

test('exposes a real radio input with an accessible name', () => {
  const onChange = vi.fn();
  render(
    <Radio label="Weekly" name="frequency" value="weekly" onChange={onChange} />
  );
  const input = screen.getByRole('radio', { name: 'Weekly' });
  expect(input).not.toBeChecked();
  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith('weekly');
});

test('radios sharing a name form one native group', () => {
  render(
    <>
      <Radio label="Daily" name="frequency" value="daily" />
      <Radio label="Weekly" name="frequency" value="weekly" />
    </>
  );
  const inputs = screen.getAllByRole('radio');
  expect(inputs).toHaveLength(2);
  inputs.forEach((input) => expect(input).toHaveAttribute('name', 'frequency'));
});

test('does not fire when disabled', () => {
  const onChange = vi.fn();
  render(
    <Radio label="Locked" name="g" value="x" isDisabled onChange={onChange} />
  );
  const input = screen.getByRole('radio', { name: 'Locked' });
  expect(input).toBeDisabled();
  fireEvent.click(input);
  expect(onChange).not.toHaveBeenCalled();
});

test('infoText and error stay out of the accessible name', () => {
  render(
    <Radio
      label="Weekly"
      name="frequency"
      value="weekly"
      infoText="Runs every Monday"
      error="Pick a frequency"
    />
  );
  // Exact-match by name: the name must be the label alone, with the extra
  // texts wired through aria-describedby instead.
  const input = screen.getByRole('radio', { name: 'Weekly' });
  expect(input).toHaveAccessibleDescription(
    'Runs every Monday Pick a frequency'
  );
});

test('routes rest props to the input, not the wrapping label', () => {
  render(
    <Radio
      label="Weekly"
      name="frequency"
      value="weekly"
      data-testid="native"
    />
  );
  const el = screen.getByTestId('native');
  expect(el.tagName).toBe('INPUT');
});

test('is reachable via Tab', async () => {
  render(<Radio label="Weekly" name="frequency" value="weekly" />);
  await userEvent.tab();
  expect(screen.getByRole('radio', { name: 'Weekly' })).toHaveFocus();
}, 30000);

test('RadioGroup exposes a named radiogroup and reports the chosen value', () => {
  const onChange = vi.fn();
  render(
    <RadioGroup
      name="plan"
      label="Billing plan"
      helperText="Change anytime"
      onChange={onChange}
    >
      <Radio label="Monthly" value="monthly" />
      <Radio label="Yearly" value="yearly" />
    </RadioGroup>
  );
  const group = screen.getByRole('radiogroup', { name: 'Billing plan' });
  expect(group).toHaveAccessibleDescription('Change anytime');

  fireEvent.click(screen.getByRole('radio', { name: 'Yearly' }));
  expect(onChange).toHaveBeenCalledWith('yearly');
  expect(screen.getByRole('radio', { name: 'Yearly' })).toBeChecked();
});

test('RadioGroup error text describes the group and flags it invalid', () => {
  render(
    <RadioGroup name="plan" label="Billing plan" error="Pick a plan">
      <Radio label="Monthly" value="monthly" />
    </RadioGroup>
  );
  const group = screen.getByRole('radiogroup', { name: 'Billing plan' });
  expect(group).toHaveAccessibleDescription('Pick a plan');
  expect(group).toHaveAttribute('aria-invalid', 'true');
});
