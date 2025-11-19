import React from 'react';
import renderer from 'react-test-renderer';
import { Tree } from 'src/components';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Tree component', () => {
  render(<Tree />);
});

test('renders Tree with children', () => {
  render(
    <Tree>
      <div>Tree Item</div>
    </Tree>
  );
});

test('Tree matches snapshot', () => {
  const tree = renderer
    .create(
      <Tree>
        <div>Item 1</div>
        <div>Item 2</div>
      </Tree>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
