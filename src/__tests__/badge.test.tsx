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

test('isAuto derives the badge colors from a token content', () => {
  renderWithTheme(<Badge isAuto content="theme-primary" />);
  const badge = screen.getByRole('badge');
  // The token named by `content` becomes the background; the label switches
  // to white so it stays readable on the saturated brand tone.
  expect(badge.className).toContain('theme-primary');
  expect(screen.getByText('theme-primary')).toBeInTheDocument();
});

test('isAuto is inert when the content is not a color token', () => {
  const plain = renderWithTheme(<Badge content="42" />);
  const plainClass = plain.getByRole('badge').className;
  cleanup();
  const auto = renderWithTheme(<Badge isAuto content="42" />);
  expect(auto.getByRole('badge').className).toBe(plainClass);
});
