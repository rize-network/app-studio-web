import React from 'react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
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
