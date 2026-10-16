import React from 'react';
import { afterEach, expect, test } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Select } from '../components/Form/Select/Select';

/**
 * An option is named by its label, and by nothing else.
 *
 * The selected option carries a ✓ beside its text. That mark is decoration —
 * `aria-selected` already says the same thing, in the way assistive technology
 * actually reads it — but as a plain element it joins the option's accessible
 * name, which becomes "Alpha ✓". Everything that resolves a control by its
 * exact name then stops finding it: a screen reader user hearing the wrong
 * name, voice control ("click Alpha"), and any test driver looking the option
 * up by what a person would call it.
 *
 * The cost is not theoretical. This library's own Select tests match options
 * with a regex rather than a name, and a downstream product spent four browser
 * runs recording the widget as broken because its driver looked up the exact
 * label and found nothing.
 */
const OPTIONS = [
  { label: 'Alpha', value: 'a' },
  { label: 'Beta', value: 'b' },
];

afterEach(cleanup);

test('a selected option is still named by its label alone', () => {
  render(<Select defaultValue="a" options={OPTIONS} />);
  fireEvent.click(screen.getByRole('combobox'));

  // The exact name, not a substring: this is the assertion a caller writes.
  expect(screen.getByRole('option', { name: 'Alpha' })).toHaveAttribute(
    'aria-selected',
    'true'
  );
  expect(screen.getByRole('option', { name: 'Beta' })).toHaveAttribute(
    'aria-selected',
    'false'
  );
});

test('picking an option by its exact name selects it', () => {
  render(<Select defaultValue="a" options={OPTIONS} />);

  fireEvent.click(screen.getByRole('combobox'));
  fireEvent.click(screen.getByRole('option', { name: 'Beta' }));
  fireEvent.click(screen.getByRole('combobox'));

  // Beta is now the selected one, and it is still called Beta.
  expect(screen.getByRole('option', { name: 'Beta' })).toHaveAttribute(
    'aria-selected',
    'true'
  );
});
