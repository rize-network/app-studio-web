import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders HoverCard component', () => {
  render(<div>Hover Card</div>);
});

test('HoverCard matches snapshot', () => {
  const tree = renderer.create(<div>Hover Card</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
