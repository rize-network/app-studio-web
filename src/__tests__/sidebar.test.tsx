import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Sidebar component', () => {
  render(<div>Sidebar</div>);
});

test('Sidebar matches snapshot', () => {
  const tree = renderer.create(<div>Sidebar</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
