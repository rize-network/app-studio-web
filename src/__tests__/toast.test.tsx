import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Toast component', () => {
  const { container } = render(<div>Toast</div>);
  expect(container).toBeInTheDocument();
});

test('Toast matches snapshot', () => {
  const tree = renderer.create(<div>Toast</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
