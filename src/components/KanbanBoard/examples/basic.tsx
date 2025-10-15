import React, { useState } from 'react';
import { KanbanBoard, KanbanColumn } from '../KanbanBoard';

const initialColumns: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To do',
    cards: [
      {
        id: 'task-1',
        title: 'Design login screen',
        description: 'Create the UI for the new authentication flow.',
      },
      {
        id: 'task-2',
        title: 'Review analytics',
        description: 'Check the metrics after the last release.',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In progress',
    cards: [
      {
        id: 'task-3',
        title: 'Implement billing API',
        description: 'Connect to the new billing provider.',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      {
        id: 'task-4',
        title: 'Update release notes',
        description: 'Summarize the key changes for version 1.2.0.',
      },
    ],
  },
];

export default function KanbanBoardBasicExample() {
  const [columns, setColumns] = useState(initialColumns);

  return (
    <KanbanBoard
      columns={columns}
      onChange={(nextColumns) => setColumns(nextColumns)}
      width="100%"
      height="100%"
    />
  );
}
