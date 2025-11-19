import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders AudioInput component', () => {
  render(<input type="number" />);
});

test('AudioInput matches snapshot', () => {
  const tree = renderer.create(<input type="number" />).toJSON();
  expect(tree).toMatchSnapshot();
});
