import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders adk component', () => {
  render(<div>adk</div>);
});

test('adk matches snapshot', () => {
  const tree = renderer.create(<div>adk</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
