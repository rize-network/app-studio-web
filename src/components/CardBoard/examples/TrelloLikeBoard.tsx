import React from 'react';
import { CardBoard, type CardBoardColumn } from '../CardBoard';

const initialColumns: CardBoardColumn[] = [
  {
    id: 'ideas',
    title: 'Ideas',
    description: 'Fresh initiatives waiting for validation',
    cards: [
      {
        id: 'card-1',
        title: 'In-app onboarding journey',
        description:
          'Design a progressive onboarding to showcase the most impactful workflows.',
        tags: ['ux', 'product'],
      },
      {
        id: 'card-2',
        title: 'Usage analytics dashboard',
        description:
          'Pair operational metrics with AI insights to highlight automation wins.',
        tags: ['analytics'],
        accentColor: 'rgba(244, 114, 182, 0.65)',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    description: 'Currently owned by the product team',
    cards: [
      {
        id: 'card-3',
        title: 'Agent skill taxonomy',
        description:
          'Model skills as reusable building blocks to speed up task creation.',
        tags: ['research', 'ml'],
      },
      {
        id: 'card-4',
        title: 'Team spaces beta',
        description:
          'Secure collaboration areas with scoped environments for each workspace.',
        tags: ['beta'],
        accentColor: 'rgba(45,212,191,0.65)',
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    cards: [
      {
        id: 'card-5',
        title: 'AI powered release notes',
        description:
          'Generate role-based update summaries using recent deployments.',
        tags: ['ai', 'automation'],
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    description: 'Shipped and celebrated',
    cards: [
      {
        id: 'card-6',
        title: 'Workspace permissions',
        description: 'Granular member roles with activity logging.',
        tags: ['security'],
      },
    ],
  },
];

export const TrelloLikeBoard: React.FC = () => {
  const [columns, setColumns] = React.useState(initialColumns);

  return (
    <CardBoard
      columns={columns}
      onBoardChange={(nextColumns) => setColumns(nextColumns)}
      emptyColumnMessage="Drop cards to start planning"
    />
  );
};
