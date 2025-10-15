import React, { useState } from 'react';
import { KanbanBoard } from '../KanbanBoard';
import { KanbanBoardColumn } from '../KanbanBoard/KanbanBoard.props';

const initialColumns: KanbanBoardColumn[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    cards: [
      {
        id: 'card-1',
        title: 'Customer interview synthesis',
        description:
          'Review notes from the latest interviews and extract patterns.',
      },
      {
        id: 'card-2',
        title: 'Competitive analysis update',
        description: 'Refresh the benchmark for onboarding experiences.',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    cards: [
      {
        id: 'card-3',
        title: 'Prototype task flows',
        description: 'Create flow for the primary activation path.',
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    cards: [
      {
        id: 'card-4',
        title: 'Legal copy update',
        description: 'Ensure compliance with new privacy guidelines.',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [],
  },
];

const BasicKanbanBoardExample = () => {
  const [columns, setColumns] = useState<KanbanBoardColumn[]>(initialColumns);

  return <KanbanBoard columns={columns} onChange={setColumns} />;
};

export default BasicKanbanBoardExample;
