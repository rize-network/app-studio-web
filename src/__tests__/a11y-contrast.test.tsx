/**
 * Field labels are not dimmed below readability.
 *
 * `FieldLabel` painted every non-error label at `opacity: 0.72` — inherited
 * ink at 11–12px through a 0.72 filter lands under the 4.5:1 ratio, and axe
 * flags `color-contrast` (serious) on every form screen of every consumer.
 * Measured 2026-08-10 in mvp/todo: /login and each workspace screen.
 *
 * The contract now: a label is full-opacity ink; de-emphasis, if a design
 * wants it, must come from a color token that still clears 4.5:1 — not from
 * an opacity filter applied to whatever color happens to be inherited.
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'app-studio';
import { TextField } from 'src/components';

afterEach(cleanup);

test('a TextField label renders at full opacity', () => {
  render(
    <ThemeProvider>
      <TextField name="email" label="Email" />
    </ThemeProvider>
  );
  const label = screen.getByText('Email');
  // app-studio compiles style props to utility classes: `oy-0p72` is the
  // dimming this pins against. Asserting the class rather than computed
  // style, because jsdom does not resolve the generated stylesheet.
  expect(label.className).not.toMatch(/\boy-0p72\b/);
});
