import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders DropdownMenu component', () => {
  render(<div>Dropdown Menu</div>);
});

test('DropdownMenu matches snapshot', () => {
  const tree = renderer.create(<div>Dropdown Menu</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
