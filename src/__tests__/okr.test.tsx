import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders OKR component', () => {
  render(<div>OKR</div>);
});

test('OKR matches snapshot', () => {
  const tree = renderer.create(<div>OKR</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
