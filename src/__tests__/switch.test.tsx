import React from 'react';
import renderer from './actRenderer.test-utils';
import { Switch } from 'src/components';

import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});

test('exposes a switch role with an accessible name from the label', () => {
  render(<Switch name="hiring" label="Anybody permitted may hire" />);
  const input = screen.getByRole('switch', {
    name: 'Anybody permitted may hire',
  });
  expect(input).toBeInTheDocument();
  expect(input).not.toBeChecked();
});

test('the element found by role is the one that receives the click', () => {
  const onChange = vi.fn();
  render(<Switch name="hiring" label="Enable hiring" onChange={onChange} />);
  const input = screen.getByRole('switch', { name: 'Enable hiring' });
  // The input must not be collapsed to 0x0: it overlays the visible track.
  expect(input.className).not.toMatch(/wh-0px|ht-0px/);
  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(true);
  expect(input).toBeChecked();
});

test('reflects a controlled isChecked value with aria-checked', () => {
  render(<Switch name="hiring" label="Enable hiring" isChecked />);
  const input = screen.getByRole('switch', { name: 'Enable hiring' });
  expect(input).toBeChecked();
  expect(input).toHaveAttribute('aria-checked', 'true');
});

test('does not toggle when disabled or read-only', () => {
  const onChange = vi.fn();
  render(
    <>
      <Switch name="a" label="Disabled" isDisabled onChange={onChange} />
      <Switch name="b" label="ReadOnly" isReadOnly onChange={onChange} />
    </>
  );
  const disabled = screen.getByRole('switch', { name: 'Disabled' });
  expect(disabled).toBeDisabled();
  fireEvent.click(disabled);
  fireEvent.click(screen.getByRole('switch', { name: 'ReadOnly' }));
  expect(onChange).not.toHaveBeenCalled();
});

test('is reachable via Tab', async () => {
  render(<Switch name="hiring" label="Enable hiring" />);
  await userEvent.tab();
  expect(screen.getByRole('switch', { name: 'Enable hiring' })).toHaveFocus();
}, 30000);

test('description describes the input without polluting its name', () => {
  render(
    <Switch
      name="hiring"
      label="Enable hiring"
      description="New applicants become visible to the team"
    />
  );
  // Exact-match by name: the description must stay out of the label element.
  const input = screen.getByRole('switch', { name: 'Enable hiring' });
  expect(input).toHaveAccessibleDescription(
    'New applicants become visible to the team'
  );
});

test('consumer aria props land once, on the input only', () => {
  const { container } = render(
    <Switch name="hiring" label="Enable hiring" data-testid="switch-input" />
  );
  const matches = container.querySelectorAll('[data-testid="switch-input"]');
  expect(matches).toHaveLength(1);
  expect(matches[0].tagName).toBe('INPUT');
});

test('Switch to match snapshot', () => {
  const tree = renderer
    .create(
      <Switch
        name="name"
        size="xl"
        views={{
          slider: {
            backgroundColor: 'red',
          },
          circle: {
            backgroundColor: 'blue',
          },
        }}
        shadow={{ boxShadow: 'rgb(249, 115, 22) 0px 4px 14px 0px' }}
        isReadOnly
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
