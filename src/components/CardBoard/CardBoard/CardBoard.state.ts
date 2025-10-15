import React from 'react';
import type { CardBoardColumn, CardBoardProps } from './CardBoard.props';

interface DragPayload {
  cardId: string;
  columnId: string;
}

interface DropZoneState {
  columnId: string;
  index: number;
}

const moveCard = (
  columns: CardBoardColumn[],
  fromColumnId: string,
  cardId: string,
  toColumnId: string,
  toIndex: number
): CardBoardColumn[] => {
  const sourceIndex = columns.findIndex((column) => column.id === fromColumnId);
  const targetIndex = columns.findIndex((column) => column.id === toColumnId);

  if (sourceIndex === -1 || targetIndex === -1) {
    return columns;
  }

  const sourceColumn = columns[sourceIndex];
  const cardPosition = sourceColumn.cards.findIndex(
    (card) => card.id === cardId
  );

  if (cardPosition === -1) {
    return columns;
  }

  if (fromColumnId === toColumnId) {
    const normalizedIndex = Math.max(
      0,
      Math.min(toIndex, sourceColumn.cards.length)
    );

    if (
      normalizedIndex === cardPosition ||
      normalizedIndex === cardPosition + 1
    ) {
      return columns;
    }
  }

  const clonedColumns = columns.map((column) => ({
    ...column,
    cards: [...column.cards],
  }));

  const [card] = clonedColumns[sourceIndex].cards.splice(cardPosition, 1);
  const targetCards = clonedColumns[targetIndex].cards;
  const boundedIndex = Math.max(0, Math.min(toIndex, targetCards.length));
  const insertionIndex =
    fromColumnId === toColumnId && cardPosition < boundedIndex
      ? boundedIndex - 1
      : boundedIndex;

  targetCards.splice(insertionIndex, 0, card);

  return clonedColumns;
};

export const useCardBoardState = ({
  columns,
  onBoardChange,
}: CardBoardProps) => {
  const [boardColumns, setBoardColumns] =
    React.useState<CardBoardColumn[]>(columns);
  const [draggedCard, setDraggedCard] = React.useState<DragPayload | null>(
    null
  );
  const [activeDropZone, setActiveDropZone] =
    React.useState<DropZoneState | null>(null);

  React.useEffect(() => {
    setBoardColumns(columns);
  }, [columns]);

  const handleCardDragStart = React.useCallback(
    (event: React.DragEvent, cardId: string, columnId: string) => {
      const payload: DragPayload = { cardId, columnId };
      event.dataTransfer.setData('application/json', JSON.stringify(payload));
      event.dataTransfer.setData('text/plain', cardId);
      event.dataTransfer.effectAllowed = 'move';
      setDraggedCard(payload);
    },
    []
  );

  const handleCardDragEnd = React.useCallback(() => {
    setDraggedCard(null);
    setActiveDropZone(null);
  }, []);

  const handleDragEnter = React.useCallback(
    (_: React.DragEvent, zone: DropZoneState) => {
      setActiveDropZone(zone);
    },
    []
  );

  const handleDragLeave = React.useCallback(
    (event: React.DragEvent, zone: DropZoneState) => {
      if (event.currentTarget.contains(event.relatedTarget as Node)) {
        return;
      }

      setActiveDropZone((current) => {
        if (!current) {
          return current;
        }

        if (
          current.columnId === zone.columnId &&
          current.index === zone.index
        ) {
          return null;
        }

        return current;
      });
    },
    []
  );

  const handleDragOver = React.useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = React.useCallback(
    (event: React.DragEvent, zone: DropZoneState) => {
      event.preventDefault();

      const rawData = event.dataTransfer.getData('application/json');
      let payload: DragPayload | null = draggedCard;

      if (rawData) {
        try {
          payload = JSON.parse(rawData) as DragPayload;
        } catch (error) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(
              'Unable to parse drag data for CardBoard drop zone.',
              error
            );
          }
        }
      }

      if (!payload) {
        return;
      }

      setBoardColumns((current) => {
        const next = moveCard(
          current,
          payload.columnId,
          payload.cardId,
          zone.columnId,
          zone.index
        );

        if (next === current) {
          return current;
        }

        onBoardChange?.(next);
        return next;
      });

      setDraggedCard(null);
      setActiveDropZone(null);
      try {
        event.dataTransfer.clearData();
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Unable to clear drag data after drop.', error);
        }
      }
    },
    [draggedCard, onBoardChange]
  );

  const getDropZoneHandlers = React.useCallback(
    (columnId: string, index: number) => ({
      onDragEnter: (event: React.DragEvent) =>
        handleDragEnter(event, { columnId, index }),
      onDragOver: (event: React.DragEvent) => handleDragOver(event),
      onDragLeave: (event: React.DragEvent) =>
        handleDragLeave(event, { columnId, index }),
      onDrop: (event: React.DragEvent) =>
        handleDrop(event, { columnId, index }),
    }),
    [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]
  );

  return {
    boardColumns,
    draggedCard,
    activeDropZone,
    getDropZoneHandlers,
    handleCardDragStart,
    handleCardDragEnd,
  };
};
