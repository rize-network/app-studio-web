import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders File component', () => {
  render(<div>File</div>);
});

test('File matches snapshot', () => {
  const tree = renderer.create(<div>File</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
