import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders NavigationMenu component', () => {
  render(<nav>Navigation Menu</nav>);
});

test('NavigationMenu matches snapshot', () => {
  const tree = renderer.create(<nav>Navigation Menu</nav>).toJSON();
  expect(tree).toMatchSnapshot();
});
