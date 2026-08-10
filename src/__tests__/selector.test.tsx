import React from 'react';
import { ThemeProvider } from 'app-studio';
import { Selector } from 'src/components/Form/Selector/Selector';

import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});

const OPTIONS = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
];

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider>{component}</ThemeProvider>);

test('exposes a radiogroup named by its visible label', () => {
  renderWithTheme(<Selector label="Frequency" options={OPTIONS} />);
  const group = screen.getByRole('radiogroup', { name: 'Frequency' });
  expect(group).toBeInTheDocument();
});

test('options are radios that report their checked state', () => {
  renderWithTheme(<Selector label="Frequency" options={OPTIONS} />);
  // No placeholder: the first option stands in for a native select's
  // implicit first-option selection.
  expect(
    screen.getByRole('radio', { name: 'Daily', checked: true })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('radio', { name: 'Weekly', checked: false })
  ).toBeInTheDocument();
});

test('clicking an option found by name fires onChange with its value', () => {
  const onChange = vi.fn();
  renderWithTheme(
    <Selector label="Frequency" options={OPTIONS} onChange={onChange} />
  );
  fireEvent.click(screen.getByRole('radio', { name: 'Weekly' }));
  expect(onChange).toHaveBeenCalledWith('weekly');
  expect(
    screen.getByRole('radio', { name: 'Weekly', checked: true })
  ).toBeInTheDocument();
});

test('is reachable via Tab', async () => {
  renderWithTheme(<Selector label="Frequency" options={OPTIONS} />);
  await userEvent.tab();
  expect(screen.getByRole('radio', { name: 'Daily' })).toHaveFocus();
}, 30000);

test('isDisabled disables every option', () => {
  const onChange = vi.fn();
  renderWithTheme(
    <Selector
      label="Frequency"
      options={OPTIONS}
      isDisabled
      onChange={onChange}
    />
  );
  const radios = screen.getAllByRole('radio');
  radios.forEach((radio) => expect(radio).toBeDisabled());
  fireEvent.click(radios[1]);
  expect(onChange).not.toHaveBeenCalled();
});

test('isReadOnly keeps options from changing the value', () => {
  const onChange = vi.fn();
  renderWithTheme(
    <Selector
      label="Frequency"
      options={OPTIONS}
      isReadOnly
      onChange={onChange}
    />
  );
  fireEvent.click(screen.getByRole('radio', { name: 'Weekly' }));
  expect(onChange).not.toHaveBeenCalled();
  expect(
    screen.getByRole('radio', { name: 'Daily', checked: true })
  ).toBeInTheDocument();
});

test('helperText describes the group and reddens on error', () => {
  renderWithTheme(
    <Selector
      label="Frequency"
      options={OPTIONS}
      helperText="Pick a cadence"
      error
    />
  );
  const group = screen.getByRole('radiogroup', { name: 'Frequency' });
  expect(group).toHaveAccessibleDescription('Pick a cadence');
  expect(group).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByText('Pick a cadence')).toBeInTheDocument();
});
