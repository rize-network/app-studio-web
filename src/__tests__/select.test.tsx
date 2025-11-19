import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Select component', () => {
  const { container } = render(
    <select>
      <option>Option 1</option>
    </select>
  );
  expect(container).toBeInTheDocument();
});

test('Select matches snapshot', () => {
  const tree = renderer
    .create(
      <select>
        <option>Option 1</option>
      </select>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
