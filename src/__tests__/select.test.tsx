import React from 'react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../components/Form/Select/Select';

const OPTIONS = [
  { label: 'Alpha', value: 'a' },
  { label: 'Beta', value: 'b' },
  { label: 'Gamma', value: 'c' },
];

// The whole point of the controlled contract is that it costs nothing at the
// console: a React warning here fails automated replays that treat
// console.error as fatal, so the assertion is on the spy, not on the text.
let consoleError: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  consoleError.mockRestore();
  cleanup();
});

const nativeSelect = (container: HTMLElement) =>
  container.querySelector('select') as HTMLSelectElement;

// Every label also exists as an <option> inside the hidden native <select>
// the component keeps for form submission, so a bare text query always matches
// twice. These look only at what the trigger actually shows.
const shown = (text: string) =>
  screen.getByText(text, { ignore: 'script, style, option' });
const queryShown = (text: string) =>
  screen.queryByText(text, { ignore: 'script, style, option' });

test('isRequired marks the combobox and the native select', () => {
  const { container } = render(
    <Select label="Plan" isRequired options={OPTIONS} />
  );
  const combobox = screen.getByRole('combobox', { name: 'Plan' });
  expect(combobox).toHaveAttribute('aria-required', 'true');
  const native = container.querySelector('select');
  expect(native).toBeRequired();
});

test('isAutoFocus focuses the combobox trigger on mount', () => {
  render(<Select label="Plan" isAutoFocus options={OPTIONS} />);
  expect(screen.getByRole('combobox', { name: 'Plan' })).toHaveFocus();
});

test('renders the option label for a controlled value', () => {
  const { container } = render(<Select value="b" options={OPTIONS} />);

  expect(shown('Beta')).toBeInTheDocument();
  expect(nativeSelect(container).value).toBe('b');
  expect(consoleError).not.toHaveBeenCalled();
});

test('follows the value prop when the parent changes it', () => {
  const { container, rerender } = render(
    <Select value="b" options={OPTIONS} />
  );
  expect(shown('Beta')).toBeInTheDocument();

  rerender(<Select value="c" options={OPTIONS} />);

  expect(shown('Gamma')).toBeInTheDocument();
  expect(queryShown('Beta')).not.toBeInTheDocument();
  expect(nativeSelect(container).value).toBe('c');
  expect(consoleError).not.toHaveBeenCalled();
});

test('does not warn when defaultValue is supplied', () => {
  const { container } = render(<Select defaultValue="b" options={OPTIONS} />);

  expect(shown('Beta')).toBeInTheDocument();
  expect(nativeSelect(container).value).toBe('b');
  expect(consoleError).not.toHaveBeenCalled();
});

test('a controlled select reports the choice but does not move on its own', () => {
  const onChange = vi.fn();
  render(<Select value="a" options={OPTIONS} onChange={onChange} />);

  fireEvent.click(screen.getByRole('combobox'));
  fireEvent.click(screen.getByRole('option', { name: /Gamma/ }));

  expect(onChange).toHaveBeenCalledWith('c');
  // Still showing 'a': the parent never passed a new value back down.
  expect(shown('Alpha')).toBeInTheDocument();
});

test('an uncontrolled select moves on its own', () => {
  const onChange = vi.fn();
  render(<Select defaultValue="a" options={OPTIONS} onChange={onChange} />);

  fireEvent.click(screen.getByRole('combobox'));
  fireEvent.click(screen.getByRole('option', { name: /Gamma/ }));

  expect(onChange).toHaveBeenCalledWith('c');
  expect(shown('Gamma')).toBeInTheDocument();
});

test('a controlled multi select receives the full next selection', () => {
  const onChange = vi.fn();
  render(
    <Select
      isMulti
      value={['a']}
      options={OPTIONS}
      placeholder="Pick some"
      onChange={onChange}
    />
  );

  fireEvent.click(screen.getByRole('combobox'));
  fireEvent.click(screen.getByRole('option', { name: /Beta/ }));

  expect(onChange).toHaveBeenCalledWith(['a', 'b']);
});

test('the combobox is named by its visible label, without aria-label', () => {
  render(<Select label="Fruit" options={OPTIONS} />);

  const combobox = screen.getByRole('combobox', { name: 'Fruit' });
  expect(combobox).toBeInTheDocument();
  expect(combobox).not.toHaveAttribute('aria-label');
});

test('is reachable via Tab', async () => {
  render(<Select label="Fruit" options={OPTIONS} />);

  await userEvent.tab();
  expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveFocus();
}, 30000);

test('is fully keyboard operable: arrows highlight, Enter selects', async () => {
  const onChange = vi.fn();
  render(<Select label="Fruit" options={OPTIONS} onChange={onChange} />);

  const combobox = screen.getByRole('combobox', { name: 'Fruit' });
  await userEvent.tab();
  expect(combobox).toHaveFocus();

  // Closed: ArrowDown opens the listbox the combobox declares it controls.
  await userEvent.keyboard('{ArrowDown}');
  expect(combobox).toHaveAttribute('aria-expanded', 'true');
  const listbox = screen.getByRole('listbox');
  expect(combobox.getAttribute('aria-controls')).toBe(listbox.id);

  // Open: ArrowDown moves the highlight, tracked via aria-activedescendant.
  await userEvent.keyboard('{ArrowDown}');
  const activeId = combobox.getAttribute('aria-activedescendant') as string;
  const activeOption = document.getElementById(activeId) as HTMLElement;
  expect(activeOption).toHaveTextContent('Beta');

  // Enter commits the highlighted option and closes the list.
  await userEvent.keyboard('{Enter}');
  expect(onChange).toHaveBeenCalledWith('b');
  expect(combobox).toHaveAttribute('aria-expanded', 'false');
}, 30000);

test('Escape closes the listbox without selecting', async () => {
  const onChange = vi.fn();
  render(<Select label="Fruit" options={OPTIONS} onChange={onChange} />);

  await userEvent.tab();
  await userEvent.keyboard('{ArrowDown}');
  const combobox = screen.getByRole('combobox', { name: 'Fruit' });
  expect(combobox).toHaveAttribute('aria-expanded', 'true');

  await userEvent.keyboard('{Escape}');
  expect(combobox).toHaveAttribute('aria-expanded', 'false');
  expect(onChange).not.toHaveBeenCalled();
}, 30000);

test('the multi-select chip remover is a real, named button', () => {
  const onChange = vi.fn();
  render(
    <Select
      isMulti
      value={['a']}
      options={OPTIONS}
      placeholder="Pick some"
      onChange={onChange}
    />
  );

  const remove = screen.getByRole('button', { name: 'Remove a' });
  fireEvent.click(remove);
  expect(onChange).toHaveBeenCalledWith([]);
});

test('the combobox and the hidden native select carry distinct ids', () => {
  const { container } = render(
    <Select id="fruit" label="Fruit" options={OPTIONS} />
  );

  const combobox = screen.getByRole('combobox', { name: 'Fruit' });
  const native = nativeSelect(container);
  expect(combobox.id).toBe('fruit');
  expect(native.id).toBe('fruit-native');
});
