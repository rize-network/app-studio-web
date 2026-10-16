import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Resizable component', () => {
  render(<div>Resizable</div>);
});

test('Resizable matches snapshot', () => {
  const tree = renderer.create(<div>Resizable</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
