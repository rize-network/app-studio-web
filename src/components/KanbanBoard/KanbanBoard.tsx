import React from 'react';
import { KanbanBoardProps } from './KanbanBoard/KanbanBoard.props';
import { useKanbanBoardState } from './KanbanBoard/KanbanBoard.state';
import { KanbanBoardView } from './KanbanBoard/KanbanBoard.view';

export const KanbanBoardComponent: React.FC<KanbanBoardProps> = (props) => {
  const state = useKanbanBoardState(props);

  return <KanbanBoardView {...props} {...state} />;
};

export const KanbanBoard = KanbanBoardComponent;
