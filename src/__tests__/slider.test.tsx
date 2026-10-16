import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Slider component', () => {
  render(<input type="range" min="0" max="100" />);
});

test('Slider matches snapshot', () => {
  const tree = renderer
    .create(<input type="range" min="0" max="100" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
