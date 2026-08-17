import React from 'react';
import renderer from './actRenderer.test-utils';
import { Badge } from 'src/components/Badge/Badge';
import { ThemeProvider } from 'app-studio';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider>{component}</ThemeProvider>);

test('renders Badge component', () => {
  renderWithTheme(<Badge content="Badge" />);
  expect(screen.getByText('Badge')).toBeInTheDocument();
});

test('renders announcement badge with text pastil and action', () => {
  renderWithTheme(
    <Badge
      pastilContent="New"
      content="Agency Growth Platform"
      action="Try now ›"
    />
  );

  expect(screen.getByText('New')).toBeInTheDocument();
  expect(screen.getByText('Agency Growth Platform')).toBeInTheDocument();
  expect(screen.getByText('Try now ›')).toBeInTheDocument();
});

test('Badge matches snapshot', () => {
  const tree = renderer.create(<span>Badge</span>).toJSON();
  expect(tree).toMatchSnapshot();
});

/** The badge root, by its data hook — `role="badge"` is not an ARIA role and is gone. */
const badgeRoot = (container: HTMLElement): HTMLElement => {
  const found = container.querySelector('[data-role="badge"]');
  if (!found) throw new Error('no badge root in the document');
  return found as HTMLElement;
};

test('isAuto derives the badge colors from a token content', () => {
  const { container } = renderWithTheme(
    <Badge isAuto content="theme-primary" />
  );
  const badge = badgeRoot(container);
  // The token named by `content` becomes the background; the label switches
  // to white so it stays readable on the saturated brand tone.
  expect(badge.className).toContain('theme-primary');
  expect(screen.getByText('theme-primary')).toBeInTheDocument();
});

test('isAuto is inert when the content is not a color token', () => {
  const plain = renderWithTheme(<Badge content="42" />);
  const plainClass = badgeRoot(plain.container).className;
  cleanup();
  const auto = renderWithTheme(<Badge isAuto content="42" />);
  expect(badgeRoot(auto.container).className).toBe(plainClass);
});

/**
 * A colour given to a Badge has to reach the label and the border, not only the
 * container.
 *
 * `filled` decides three things together — `backgroundColor: theme-primary`,
 * `color: color-white`, `borderColor: theme-primary` — and a colour passed by a
 * caller only reached the outer view. The label reads `combinedStyles.color`, so
 * it kept the variant's white; the border kept the variant's blue.
 *
 * That was invisible while the background was also `theme-primary`: the ring and
 * the fill were the same colour. A product screen that coloured the background
 * to carry meaning — green for live, brown for building — revealed a blue ring
 * around three pills, none of them blue. Nothing caught it because nothing had
 * ever made it visible.
 */
test('lets the caller decide background, label and border together', () => {
  renderWithTheme(
    <Badge backgroundColor="theme-success" color="color-black" content="live" />
  );

  const label = screen.getByText('live');
  expect(label.className).toContain('color-black');
  // And never the variant's default, which is what used to win.
  expect(label.className).not.toContain('color-white');
});

test('follows the background with the border when the caller gives none', () => {
  const { container } = renderWithTheme(
    <Badge backgroundColor="theme-success" content="live" />
  );

  const badge = badgeRoot(container);
  expect(badge.className).toContain('theme-success');

  // Compared against a badge that asks for nothing, rather than against a class
  // prefix guessed by hand. The first version of this assertion looked for
  // `bdc-var--theme-primary` and passed while the border was still blue: a
  // string that never appears cannot fail, and a `not.toContain` on it is an
  // assertion that agrees with itself. Removing the fix from the component left
  // all eight tests green, which is how it was caught.
  cleanup();
  const untouched = renderWithTheme(<Badge content="live" />);
  const defaultRing = badgeRoot(untouched.container)
    .className.split(' ')
    .filter((name) => name.includes('theme-primary'));

  expect(defaultRing.length).toBeGreaterThan(0);
  for (const ring of defaultRing) expect(badge.className).not.toContain(ring);
});

/**
 * A pill that cannot be clicked must not react to being hovered.
 *
 * `filled` carried `_hover: { opacity: 0.9 }` and `_active`, so every badge —
 * a status label as much as an actionable chip — dimmed under the pointer. The
 * element is a bare `DIV`: `tabIndex` −1, no role, no click handler, and the
 * cursor stays `auto`. One promise, unkept.
 *
 * It matters more since a caller can now colour the pill by meaning: the
 * reaction lands on what has just become the most eye-catching thing in a row.
 * A product screen made its own rows deliberately inert for exactly this
 * reason — "three promises, none of them kept" — and the badge quietly made a
 * softer version of the same mistake.
 */
test('does not react to hover when nothing can be clicked', () => {
  const { container } = renderWithTheme(<Badge content="live" />);

  expect(badgeRoot(container).className).not.toContain('hover');
});

test('still reacts when there is something to click', () => {
  const { container } = renderWithTheme(
    <Badge content="live" onClick={() => undefined} />
  );

  // The other half: without it, the first test would also pass on a badge that
  // never reacts to anything, which is a different component.
  expect(badgeRoot(container).className).toContain('hover');
});

test('still lets an explicit border win over the background', () => {
  const { container } = renderWithTheme(
    <Badge
      backgroundColor="theme-success"
      borderColor="color-gray-900"
      content="live"
    />
  );

  expect(badgeRoot(container).className).toContain('color-gray-900');
});
