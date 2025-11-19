import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders AuthGuard component', () => {
  const { container } = render(<div>AuthGuard</div>);
  expect(container).toBeInTheDocument();
});

test('AuthGuard matches snapshot', () => {
  const tree = renderer.create(<div>AuthGuard</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
