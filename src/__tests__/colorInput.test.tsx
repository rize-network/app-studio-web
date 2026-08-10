import React from 'react';
import { ColorInput } from 'src/components';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

afterEach(() => {
  cleanup();
  localStorage.clear();
});

test('is found by role and accessible name from the visible label', () => {
  render(<ColorInput name="brand" label="Brand color" />);
  const trigger = screen.getByRole('button', { name: 'Brand color' });
  expect(trigger).toBeInTheDocument();
});

test('an explicit aria-label wins over the visible label', () => {
  render(
    <ColorInput name="brand" label="Brand color" aria-label="Pick a color" />
  );
  expect(
    screen.getByRole('button', { name: 'Pick a color' })
  ).toBeInTheDocument();
});

test('is reachable with the keyboard', async () => {
  render(<ColorInput name="brand" label="Brand color" />);
  const trigger = screen.getByRole('button', { name: 'Brand color' });
  await userEvent.tab();
  expect(trigger).toHaveFocus();
}, 30000);

test('opens a listbox of options and selecting one fires onChange', () => {
  const onChange = vi.fn();
  render(<ColorInput name="brand" label="Brand color" onChange={onChange} />);
  const trigger = screen.getByRole('button', { name: 'Brand color' });
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(trigger);
  const listbox = screen.getByRole('listbox');
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(trigger).toHaveAttribute('aria-controls', listbox.id);
  const option = screen.getByRole('option', { name: 'Red 500' });
  expect(option).toHaveAttribute('aria-selected', 'false');
  fireEvent.click(option);
  expect(onChange).toHaveBeenCalledWith('color-red-500');
  // closeOnSelect defaults to true.
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});

test('swatches are keyboard-operable (Enter selects)', () => {
  const onChange = vi.fn();
  render(<ColorInput name="brand" label="Brand color" onChange={onChange} />);
  const trigger = screen.getByRole('button', { name: 'Brand color' });
  fireEvent.keyDown(trigger, { key: 'Enter' });
  const option = screen.getByRole('option', { name: 'Blue 500' });
  expect(option).toHaveAttribute('tabindex', '0');
  fireEvent.keyDown(option, { key: 'Enter' });
  expect(onChange).toHaveBeenCalledWith('color-blue-500');
});

test('submits its value through a hidden input when name is set', () => {
  const { container } = render(
    <ColorInput name="brand" label="Brand color" value="#336699" />
  );
  const hidden = container.querySelector('input[type="hidden"][name="brand"]');
  expect(hidden).not.toBeNull();
  expect(hidden).toHaveAttribute('value', '#336699');
});

test('colorFormat converts the value reported by onChange', () => {
  const onChange = vi.fn();
  render(
    <ColorInput
      name="brand"
      label="Brand color"
      colorFormat="rgb"
      onChange={onChange}
    />
  );
  fireEvent.click(screen.getByRole('button', { name: 'Brand color' }));
  const customInput = screen.getByRole('textbox', { name: 'Custom color' });
  fireEvent.change(customInput, { target: { value: '#ff0000' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add' }));
  expect(onChange).toHaveBeenCalledWith('rgb(255, 0, 0)');
});

test('helper and error text are linked via aria-describedby', () => {
  render(
    <ColorInput
      name="brand"
      label="Brand color"
      helperText="Pick your primary brand color"
      error="Color is required"
    />
  );
  const trigger = screen.getByRole('button', { name: 'Brand color' });
  expect(trigger).toHaveAttribute('aria-invalid', 'true');
  const describedBy = trigger.getAttribute('aria-describedby') ?? '';
  const helper = screen.getByText('Pick your primary brand color');
  const errorText = screen.getByText('Color is required');
  expect(describedBy.split(' ')).toContain(helper.id);
  expect(describedBy.split(' ')).toContain(errorText.id);
});
