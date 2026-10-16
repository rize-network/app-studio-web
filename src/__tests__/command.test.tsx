import React from 'react';
import renderer from './actRenderer.test-utils';
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
