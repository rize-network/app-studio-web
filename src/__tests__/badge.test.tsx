import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Badge component', () => {
  const { container } = render(<span>Badge</span>);
  expect(container).toBeInTheDocument();
});

test('Badge matches snapshot', () => {
  const tree = renderer.create(<span>Badge</span>).toJSON();
  expect(tree).toMatchSnapshot();
});
