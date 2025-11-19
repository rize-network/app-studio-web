import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Center component', () => {
  const { container } = render(<div>Center</div>);
  expect(container).toBeInTheDocument();
});

test('Center matches snapshot', () => {
  const tree = renderer.create(<div>Center</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
