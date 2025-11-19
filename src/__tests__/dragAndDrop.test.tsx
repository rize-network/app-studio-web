import React from 'react';
import renderer from 'react-test-renderer';
import { DragAndDrop } from 'src/components';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders DragAndDrop component', () => {
  const items = ['Item 1', 'Item 2'];
  render(
    <DragAndDrop items={items} renderItem={(item) => <div>{item}</div>} />
  );
});

test('DragAndDrop with multiple items', () => {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  render(
    <DragAndDrop items={items} renderItem={(item) => <div>{item}</div>} />
  );
});

test('DragAndDrop matches snapshot', () => {
  const items = ['Item 1', 'Item 2'];
  const tree = renderer.create(
    <DragAndDrop items={items} renderItem={(item) => <div>{item}</div>} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
