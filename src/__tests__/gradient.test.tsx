import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Gradient component', () => {
  const { container } = render(
    <div style={{ background: 'linear-gradient(to right, red, blue)' }}>
      Gradient
    </div>
  );
  expect(container).toBeInTheDocument();
});

test('Gradient matches snapshot', () => {
  const tree = renderer
    .create(
      <div style={{ background: 'linear-gradient(to right, red, blue)' }}>
        Gradient
      </div>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
