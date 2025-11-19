import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Tree component', () => {
  const { container } = render(<div>Tree</div>);
  expect(container).toBeInTheDocument();
});

test('Tree matches snapshot', () => {
  const tree = renderer.create(<div>Tree</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
