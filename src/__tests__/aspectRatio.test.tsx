import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders AspectRatio component', () => {
  const { container } = render(<div>AspectRatio</div>);
  expect(container).toBeInTheDocument();
});

test('AspectRatio matches snapshot', () => {
  const tree = renderer.create(<div>AspectRatio</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
