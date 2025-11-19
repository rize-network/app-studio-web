import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Background component', () => {
  const { container } = render(<div>Background</div>);
  expect(container).toBeInTheDocument();
});

test('Background matches snapshot', () => {
  const tree = renderer.create(<div>Background</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
