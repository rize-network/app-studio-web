import React from 'react';
import {
  KanbanBoardProps,
  KanbanColumn,
  KanbanCard,
} from './KanbanBoard/KanbanBoard.props';
import { useKanbanBoardState } from './KanbanBoard/KanbanBoard.state';
import { KanbanBoardView } from './KanbanBoard/KanbanBoard.view';

export const KanbanBoardComponent: React.FC<KanbanBoardProps> = (props) => {
  const state = useKanbanBoardState(props);

  return <KanbanBoardView {...props} {...state} />;
};

export const KanbanBoard = KanbanBoardComponent;

// Export types
export type { KanbanColumn, KanbanCard, KanbanBoardProps };
