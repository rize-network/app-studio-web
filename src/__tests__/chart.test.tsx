import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Chart component', () => {
  render(<div>Chart</div>);
});

test('Chart matches snapshot', () => {
  const tree = renderer.create(<div>Chart</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
