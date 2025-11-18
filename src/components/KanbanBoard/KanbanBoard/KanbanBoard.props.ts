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
  onCardMove?: (
    card: KanbanBoardCard,
    fromColumn: KanbanBoardColumn,
    toColumn: KanbanBoardColumn
  ) => void;
  onCardCreate?: (card: KanbanBoardCard, column: KanbanBoardColumn) => void;
  onCardDelete?: (card: KanbanBoardCard, column: KanbanBoardColumn) => void;
  onCardTitleChange?: (
    card: KanbanBoardCard,
    column: KanbanBoardColumn,
    newTitle: string
  ) => void;
  onCardDescriptionChange?: (
    card: KanbanBoardCard,
    column: KanbanBoardColumn,
    newDescription: string
  ) => void;
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
  draggedCardId: string | null;
  hoveredColumnId: string | null;
  onCardDragStart: (
    columnId: string,
    cardId: string,
    event: React.DragEvent<HTMLDivElement>
  ) => void;
  onCardDragEnd: () => void;
  onCardDrop: (
    columnId: string,
    cardId: string | null,
    event: React.DragEvent<HTMLDivElement>
  ) => void;
  onColumnDrop: (
    columnId: string,
    event: React.DragEvent<HTMLDivElement>
  ) => void;
  onCardDragOver: (
    columnId: string,
    cardId: string | null,
    event: React.DragEvent<HTMLDivElement>
  ) => void;
  onColumnDragOver: (
    columnId: string,
    event: React.DragEvent<HTMLDivElement>
  ) => void;
}
