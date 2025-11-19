import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Pagination component', () => {
  render(<div>Pagination</div>);
});

test('Pagination matches snapshot', () => {
  const tree = renderer.create(<div>Pagination</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
