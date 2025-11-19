import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Menubar component', () => {
  render(<div>Menubar</div>);
});

test('Menubar matches snapshot', () => {
  const tree = renderer.create(<div>Menubar</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
