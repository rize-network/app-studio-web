import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CardBoardProps } from './CardBoard.props';

interface DragState {
  columnId: string;
  cardId: string;
}

export const useCardBoardState = ({
  columns: initialColumns,
  onChange,
}: CardBoardProps) => {
  const [columns, setColumns] =
    useState<CardBoardProps['columns']>(initialColumns);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const dragStateRef = useRef<DragState | null>(null);

  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  const commitMove = useCallback(
    (targetColumnId: string, targetCardId: string | null) => {
      const dragState = dragStateRef.current;
      if (!dragState) return;

      const { columnId: sourceColumnId, cardId } = dragState;

      if (
        targetColumnId === sourceColumnId &&
        (targetCardId === null || targetCardId === cardId)
      ) {
        dragStateRef.current = null;
        setDraggedCardId(null);
        return;
      }

      setColumns((prevColumns) => {
        const workingColumns = prevColumns.map((column) => ({
          ...column,
          cards: [...column.cards],
        }));

        const sourceColumn = workingColumns.find(
          (column) => column.id === sourceColumnId
        );
        const targetColumn = workingColumns.find(
          (column) => column.id === targetColumnId
        );

        if (!sourceColumn || !targetColumn) {
          return prevColumns;
        }

        const sourceIndex = sourceColumn.cards.findIndex(
          (card) => card.id === cardId
        );

        if (sourceIndex === -1) {
          return prevColumns;
        }

        const [card] = sourceColumn.cards.splice(sourceIndex, 1);

        let targetIndex = targetColumn.cards.length;

        if (targetCardId) {
          const foundIndex = targetColumn.cards.findIndex(
            (item) => item.id === targetCardId
          );

          if (foundIndex !== -1) {
            targetIndex = foundIndex;

            if (targetColumnId === sourceColumnId && foundIndex > sourceIndex) {
              targetIndex = foundIndex - 1;
            }
          }
        }

        targetColumn.cards.splice(targetIndex, 0, card);

        const updatedColumns = workingColumns.map((column) => ({
          ...column,
          cards: [...column.cards],
        }));

        onChange?.(updatedColumns);

        return updatedColumns;
      });

      dragStateRef.current = null;
      setDraggedCardId(null);
    },
    [onChange]
  );

  const handleCardDragStart = useCallback(
    (
      columnId: string,
      cardId: string,
      event: React.DragEvent<HTMLDivElement>
    ) => {
      dragStateRef.current = { columnId, cardId };
      setDraggedCardId(cardId);

      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
        try {
          event.dataTransfer.setData('text/plain', cardId);
        } catch (error) {
          // Ignore errors from browsers that disallow setting data
        }
      }
    },
    []
  );

  const handleCardDragEnd = useCallback(() => {
    dragStateRef.current = null;
    setDraggedCardId(null);
  }, []);

  const handleColumnDragOver = useCallback(
    (_columnId: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
    },
    []
  );

  const handleCardDragOver = useCallback(
    (
      _columnId: string,
      _cardId: string | null,
      event: React.DragEvent<HTMLDivElement>
    ) => {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
    },
    []
  );

  const handleColumnDrop = useCallback(
    (columnId: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      commitMove(columnId, null);
    },
    [commitMove]
  );

  const handleCardDrop = useCallback(
    (
      columnId: string,
      cardId: string | null,
      event: React.DragEvent<HTMLDivElement>
    ) => {
      event.preventDefault();
      event.stopPropagation();
      commitMove(columnId, cardId);
    },
    [commitMove]
  );

  return {
    columns,
    draggedCardId,
    onCardDragStart: handleCardDragStart,
    onCardDragEnd: handleCardDragEnd,
    onColumnDragOver: handleColumnDragOver,
    onCardDragOver: handleCardDragOver,
    onColumnDrop: handleColumnDrop,
    onCardDrop: handleCardDrop,
  };
};
