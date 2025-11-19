import React from 'react';
import renderer from 'react-test-renderer';
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
