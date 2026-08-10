import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { Label } from 'src/components/Form/Label/Label';

afterEach(() => {
  cleanup();
});

const styleFor = (element: HTMLElement) => {
  // app-studio compiles style props into atomic classes; resolve the CSS the
  // element actually carries by joining every matching rule text.
  const rules = Array.from(document.styleSheets)
    .flatMap((sheet) => {
      try {
        return Array.from(sheet.cssRules);
      } catch {
        return [];
      }
    })
    .filter((rule): rule is CSSStyleRule => rule instanceof CSSStyleRule);
  return Array.from(element.classList)
    .flatMap((className) =>
      rules
        .filter((rule) => rule.selectorText === `.${className}`)
        .map((rule) => rule.style.cssText)
    )
    .join('; ');
};

test('renders a label element with its text', () => {
  render(<Label>Username</Label>);
  const label = screen.getByText('Username');
  expect(label.tagName).toBe('LABEL');
});

test('error colors the label with the shared field error color', () => {
  render(<Label error>Username</Label>);
  const label = screen.getByText('Username');
  expect(styleFor(label)).toContain('color-red-500');
});

test('isDisabled mutes the label and shows a not-allowed cursor', () => {
  render(<Label isDisabled>Username</Label>);
  const label = screen.getByText('Username');
  const css = styleFor(label);
  expect(css).toContain('color-gray-400');
  expect(css).toContain('not-allowed');
});

test('a plain label carries neither the error nor the disabled treatment', () => {
  render(<Label>Username</Label>);
  const label = screen.getByText('Username');
  const css = styleFor(label);
  expect(css).not.toContain('color-red-500');
  expect(css).not.toContain('not-allowed');
});
