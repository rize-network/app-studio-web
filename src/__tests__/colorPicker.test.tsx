import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders ColorPicker component', () => {
  render(<input type="color" />);
});

test('ColorPicker matches snapshot', () => {
  const tree = renderer.create(<input type="color" />).toJSON();
  expect(tree).toMatchSnapshot();
});
