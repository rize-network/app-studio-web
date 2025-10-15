import React from 'react';
import { ViewProps } from 'app-studio';
import { TextProps } from '../../Text/Text/Text.props';

export interface CardBoardCard {
  id: string;
  title: string;
  description?: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface CardBoardColumn {
  id: string;
  title: string;
  cards: CardBoardCard[];
  footer?: React.ReactNode;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface CardBoardProps {
  columns: CardBoardColumn[];
  onChange?: (columns: CardBoardColumn[]) => void;
  renderCard?: (
    card: CardBoardCard,
    column: CardBoardColumn
  ) => React.ReactNode;
  renderColumnHeader?: (column: CardBoardColumn) => React.ReactNode;
  renderEmptyState?: (column: CardBoardColumn) => React.ReactNode;
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

export interface CardBoardViewProps extends CardBoardProps {
  columns: CardBoardColumn[];
  draggedCardId: string | null;
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
