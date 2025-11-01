import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KanbanBoardProps } from './KanbanBoard.props';

interface DragState {
  columnId: string;
  cardId: string;
}

export const useKanbanBoardState = ({
  columns: initialColumns,
  onChange,
}: KanbanBoardProps) => {
  const [columns, setColumns] =
    useState<KanbanBoardProps['columns']>(initialColumns);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [hoveredColumnId, setHoveredColumnId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [hoveredCardPosition, setHoveredCardPosition] =
    useState<'above' | 'below' | null>(null);
  const dragStateRef = useRef<DragState | null>(null);

  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  const commitMove = useCallback(
    (
      targetColumnId: string,
      targetCardId: string | null,
      position: 'above' | 'below'
    ) => {
      const dragState = dragStateRef.current;
      if (!dragState) return;

      const { columnId: sourceColumnId, cardId } = dragState;

      if (targetColumnId === sourceColumnId && targetCardId === cardId) {
        dragStateRef.current = null;
        setDraggedCardId(null);
        setHoveredColumnId(null);
        setHoveredCardId(null);
        setHoveredCardPosition(null);
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

        const targetIndexBeforeRemoval = targetCardId
          ? targetColumn.cards.findIndex((item) => item.id === targetCardId)
          : -1;

        const [card] = sourceColumn.cards.splice(sourceIndex, 1);

        let targetIndex = targetColumn.cards.length;

        if (targetCardId && targetIndexBeforeRemoval !== -1) {
          targetIndex =
            position === 'above'
              ? targetIndexBeforeRemoval
              : targetIndexBeforeRemoval + 1;

          if (
            targetColumnId === sourceColumnId &&
            targetIndexBeforeRemoval > sourceIndex
          ) {
            targetIndex -= 1;
          }
        } else if (targetCardId && targetIndexBeforeRemoval === -1) {
          targetIndex = targetColumn.cards.length;
        } else if (!targetCardId) {
          targetIndex = position === 'above' ? 0 : targetColumn.cards.length;
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
      setHoveredColumnId(null);
      setHoveredCardId(null);
      setHoveredCardPosition(null);
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
    setHoveredColumnId(null);
    setHoveredCardId(null);
    setHoveredCardPosition(null);
  }, []);

  const handleColumnDragOver = useCallback(
    (columnId: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
      setHoveredColumnId(columnId);
      setHoveredCardId(null);
      setHoveredCardPosition(null);
    },
    []
  );

  const handleCardDragOver = useCallback(
    (
      columnId: string,
      cardId: string | null,
      event: React.DragEvent<HTMLDivElement>
    ) => {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
      setHoveredColumnId(columnId);
      setHoveredCardId(cardId);
      if (cardId) {
        const bounds = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
        const offsetY = event.clientY - bounds.top;
        const newPosition = offsetY < bounds.height / 2 ? 'above' : 'below';
        setHoveredCardPosition(newPosition);
      } else {
        setHoveredCardPosition(null);
      }
    },
    []
  );

  const handleColumnDrop = useCallback(
    (columnId: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      commitMove(columnId, null, 'below');
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
      let position: 'above' | 'below' = 'below';

      if (cardId) {
        const bounds = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
        const offsetY = event.clientY - bounds.top;
        position = offsetY < bounds.height / 2 ? 'above' : 'below';
      }

      commitMove(columnId, cardId, position);
    },
    [commitMove]
  );

  return {
    columns,
    draggedCardId,
    hoveredColumnId,
    hoveredCardId,
    hoveredCardPosition,
    onCardDragStart: handleCardDragStart,
    onCardDragEnd: handleCardDragEnd,
    onColumnDragOver: handleColumnDragOver,
    onCardDragOver: handleCardDragOver,
    onColumnDrop: handleColumnDrop,
    onCardDrop: handleCardDrop,
  };
};
