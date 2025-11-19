import React from 'react';
import renderer from 'react-test-renderer';
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
