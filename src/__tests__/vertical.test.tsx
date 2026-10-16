import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Vertical component', () => {
  const { container } = render(<div>Vertical</div>);
  expect(container).toBeInTheDocument();
});

test('Vertical matches snapshot', () => {
  const tree = renderer.create(<div>Vertical</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
