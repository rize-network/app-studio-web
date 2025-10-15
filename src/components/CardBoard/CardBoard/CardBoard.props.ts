import type { TextProps, ViewProps } from 'app-studio';
import type React from 'react';

export interface CardBoardCard {
  /** Unique identifier for the card */
  id: string;
  /** Short title displayed at the top of the card */
  title: string;
  /** Optional supporting description text */
  description?: string;
  /** Optional collection of tags rendered as chips */
  tags?: string[];
  /** Optional React node rendered to the right side of the title */
  meta?: React.ReactNode;
  /** Optional React node rendered at the bottom of the card */
  footer?: React.ReactNode;
  /** Custom accent color used for the card's left border */
  accentColor?: string;
}

export interface CardBoardColumn {
  /** Unique identifier for the column */
  id: string;
  /** Column title displayed in the header */
  title: string;
  /** Optional helper text below the title */
  description?: string;
  /** Cards contained within the column */
  cards: CardBoardCard[];
}

export interface CardBoardViews {
  board?: ViewProps;
  column?: ViewProps;
  columnHeader?: ViewProps;
  columnBody?: ViewProps;
  columnTitle?: TextProps;
  columnDescription?: TextProps;
  card?: ViewProps;
  cardTitle?: TextProps;
  cardDescription?: TextProps;
  cardFooter?: ViewProps;
  tag?: ViewProps;
  dropZone?: ViewProps;
  emptyState?: ViewProps;
}

export interface CardBoardProps {
  /** Columns to render on the board */
  columns: CardBoardColumn[];
  /** Callback fired whenever cards move between columns */
  onBoardChange?: (columns: CardBoardColumn[]) => void;
  /** Message displayed when a column has no cards */
  emptyColumnMessage?: string;
  /** Style overrides for internal elements */
  views?: CardBoardViews;
  /** Explicit theme mode override */
  themeMode?: 'light' | 'dark';
}

export interface CardBoardViewProps extends CardBoardProps {
  boardColumns: CardBoardColumn[];
  draggedCard: { cardId: string; columnId: string } | null;
  activeDropZone: { columnId: string; index: number } | null;
  getDropZoneHandlers: (
    columnId: string,
    index: number
  ) => {
    onDragEnter: (event: React.DragEvent) => void;
    onDragOver: (event: React.DragEvent) => void;
    onDragLeave: (event: React.DragEvent) => void;
    onDrop: (event: React.DragEvent) => void;
  };
  handleCardDragStart: (
    event: React.DragEvent,
    cardId: string,
    columnId: string
  ) => void;
  handleCardDragEnd: () => void;
}
