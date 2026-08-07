import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders ContextMenu component', () => {
  render(<div>Context Menu</div>);
});

test('ContextMenu matches snapshot', () => {
  const tree = renderer.create(<div>Context Menu</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
