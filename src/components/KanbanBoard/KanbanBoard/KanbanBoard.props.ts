import React from 'react';
import { ViewProps } from 'app-studio';
import { TextProps } from '../../Text/Text/Text.props';

export interface KanbanBoardCard {
  id: string;
  title: string;
  description?: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface KanbanBoardColumn {
  id: string;
  title: string;
  cards: KanbanBoardCard[];
  footer?: React.ReactNode;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface KanbanBoardProps {
  columns: KanbanBoardColumn[];
  onChange?: (columns: KanbanBoardColumn[]) => void;
  renderCard?: (
    card: KanbanBoardCard,
    column: KanbanBoardColumn
  ) => React.ReactNode;
  renderColumnHeader?: (column: KanbanBoardColumn) => React.ReactNode;
  renderEmptyState?: (column: KanbanBoardColumn) => React.ReactNode;
  views?: {
    board?: ViewProps;
    column?: ViewProps;
    columnHeader?: ViewProps;
    columnTitle?: TextProps;
    columnBody?: ViewProps;
    columnFooter?: ViewProps;
    card?: ViewProps;
    cardContent?: ViewProps;
    emptyState?: ViewProps;
  };
}

export interface KanbanBoardViewProps extends KanbanBoardProps {
  columns: KanbanBoardColumn[];
  draggedCard: {
    columnId: string;
    cardId: string;
    cardIndex: number;
  } | null;
  cardRefsRef: React.MutableRefObject<Map<string, HTMLDivElement>>;
  onCardMouseDown: (
    columnId: string,
    cardId: string,
    cardIndex: number,
    event: React.MouseEvent | React.TouchEvent
  ) => void;
}
