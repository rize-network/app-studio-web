import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Separator component', () => {
  render(<hr />);
});

test('Separator matches snapshot', () => {
  const tree = renderer.create(<hr />).toJSON();
  expect(tree).toMatchSnapshot();
});
