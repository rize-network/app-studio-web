import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Command component', () => {
  render(<div>Command</div>);
});

test('Command matches snapshot', () => {
  const tree = renderer.create(<div>Command</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
