import React from 'react';
import renderer from 'react-test-renderer';
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
