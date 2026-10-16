import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Horizontal component', () => {
  const { container } = render(<div>Horizontal</div>);
  expect(container).toBeInTheDocument();
});

test('Horizontal matches snapshot', () => {
  const tree = renderer.create(<div>Horizontal</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
