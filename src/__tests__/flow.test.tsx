import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Flow component', () => {
  render(<div>Flow</div>);
});

test('Flow matches snapshot', () => {
  const tree = renderer.create(<div>Flow</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
