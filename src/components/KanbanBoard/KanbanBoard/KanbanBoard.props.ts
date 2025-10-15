import { ViewProps } from 'app-studio';

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  [key: string]: unknown;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

export interface KanbanBoardViews {
  board?: ViewProps;
  column?: ViewProps;
  columnHeader?: ViewProps;
  columnBody?: ViewProps;
  card?: ViewProps;
  placeholder?: ViewProps;
}

export interface KanbanDropPreview {
  columnId: string;
  index: number;
}

export interface KanbanDragLocation {
  columnId: string;
  cardIndex: number;
}

export interface KanbanBoardProps extends Omit<ViewProps, 'columns'> {
  columns: KanbanColumn[];
  onChange?: (columns: KanbanColumn[]) => void;
  renderCard?: (card: KanbanCard, column: KanbanColumn) => React.ReactNode;
  renderColumnHeader?: (column: KanbanColumn) => React.ReactNode;
  views?: KanbanBoardViews;
  themeMode?: 'light' | 'dark';
}

export interface KanbanBoardViewProps extends KanbanBoardProps {
  columns: KanbanColumn[];
  dropPreview: KanbanDropPreview | null;
  dragLocation: KanbanDragLocation | null;
  registerCardRef: (
    columnId: string,
    index: number,
    node: HTMLElement | null
  ) => void;
  handleCardDragStart: (
    columnId: string,
    index: number,
    event: React.DragEvent<HTMLDivElement>
  ) => void;
  handleCardDragEnd: () => void;
  handleColumnDragOver: (
    columnId: string,
    event: React.DragEvent<HTMLDivElement>
  ) => void;
  handleColumnDrop: (
    columnId: string,
    event: React.DragEvent<HTMLDivElement>
  ) => void;
}
