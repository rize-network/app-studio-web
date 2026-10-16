import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Calendar component', () => {
  render(<div>Calendar</div>);
});

test('Calendar matches snapshot', () => {
  const tree = renderer.create(<div>Calendar</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
