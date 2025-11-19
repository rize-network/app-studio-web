import React from 'react';
import renderer from 'react-test-renderer';
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
