import React from 'react';
import renderer from './actRenderer.test-utils';
import { Checkbox } from 'src/components';

import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});

test('exposes a real checkbox input with an accessible name', () => {
  const onChange = vi.fn();
  render(<Checkbox label="Accept terms" name="terms" onChange={onChange} />);
  const input = screen.getByRole('checkbox', { name: 'Accept terms' });
  expect(input).not.toBeChecked();
  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(true);
  expect(input).toBeChecked();
});

test('indeterminate state is exposed as mixed', () => {
  render(<Checkbox label="Select all" isIndeterminate />);
  const input = screen.getByRole('checkbox', { name: 'Select all' });
  expect(input).toHaveAttribute('aria-checked', 'mixed');
});

test('does not fire when disabled', () => {
  const onChange = vi.fn();
  render(<Checkbox label="Locked" isDisabled onChange={onChange} />);
  const input = screen.getByRole('checkbox', { name: 'Locked' });
  expect(input).toBeDisabled();
  fireEvent.click(input);
  expect(onChange).not.toHaveBeenCalled();
});

test('routes rest props to the input, not the wrapping label', () => {
  render(<Checkbox role="textbox" />);
  const checkboxElement = screen.getByRole('textbox');
  expect(checkboxElement).toBeInTheDocument();
  expect(checkboxElement.tagName).toBe('INPUT');
});

test('infoText and error stay out of the accessible name', () => {
  render(
    <Checkbox
      label="Accept terms"
      infoText="You can opt out later"
      error="Required"
    />
  );
  // Exact-match by name: the name must be the label alone, with the extra
  // texts wired through aria-describedby instead.
  const input = screen.getByRole('checkbox', { name: 'Accept terms' });
  expect(input).toHaveAccessibleDescription('You can opt out later Required');
});

test('is reachable via Tab', async () => {
  render(<Checkbox label="Accept terms" />);
  await userEvent.tab();
  expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toHaveFocus();
}, 30000);

test('Checkbox to match snapshot', () => {
  const tree = renderer
    .create(
      <Checkbox
        size="xl"
        views={{
          checkbox: {
            backgroundColor: 'red',
          },
          label: {
            color: 'blue',
          },
        }}
        error
        shadow={{ boxShadow: 'rgb(249, 115, 22) 0px 4px 14px 0px' }}
        isReadOnly
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
