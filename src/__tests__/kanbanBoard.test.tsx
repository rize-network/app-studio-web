import React from 'react';
import renderer from 'react-test-renderer';
import { KanbanBoard } from 'src/components';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders KanbanBoard component', () => {
  const columns = [
    { id: 'col1', title: 'Column 1', cards: [] },
  ];
  render(<KanbanBoard columns={columns} />);
});

test('KanbanBoard with multiple columns', () => {
  const columns = [
    { id: 'col1', title: 'Column 1', cards: [] },
    { id: 'col2', title: 'Column 2', cards: [] },
  ];
  render(<KanbanBoard columns={columns} />);
});

test('KanbanBoard matches snapshot', () => {
  const columns = [
    { id: 'col1', title: 'Column 1', cards: [] },
  ];
  const tree = renderer.create(
    <KanbanBoard columns={columns} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
