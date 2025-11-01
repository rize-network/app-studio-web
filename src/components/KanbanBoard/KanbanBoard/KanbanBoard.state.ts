import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KanbanBoardProps, KanbanCardDropPosition } from './KanbanBoard.props';

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
    useState<KanbanCardDropPosition | null>(null);
  const dragStateRef = useRef<DragState | null>(null);

  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  const commitMove = useCallback(
    (
      targetColumnId: string,
      targetCardId: string | null,
      position: KanbanCardDropPosition
    ) => {
      const dragState = dragStateRef.current;
      if (!dragState) return;

      const { columnId: sourceColumnId, cardId } = dragState;

      if (
        targetColumnId === sourceColumnId &&
        (targetCardId === null || targetCardId === cardId) &&
        position === 'before'
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

        const targetIndexBeforeRemoval = targetCardId
          ? targetColumn.cards.findIndex((item) => item.id === targetCardId)
          : position === 'before'
          ? 0
          : targetColumn.cards.length;

        if (targetIndexBeforeRemoval === -1 && targetCardId) {
          return prevColumns;
        }

        const [card] = sourceColumn.cards.splice(sourceIndex, 1);

        let targetIndex = targetIndexBeforeRemoval;

        if (position === 'after') {
          targetIndex += 1;
        }

        if (targetColumnId === sourceColumnId && targetIndex > sourceIndex) {
          targetIndex -= 1;
        }

        if (targetIndex < 0) {
          targetIndex = 0;
        }

        if (targetIndex > targetColumn.cards.length) {
          targetIndex = targetColumn.cards.length;
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
      position: KanbanCardDropPosition,
      event: React.DragEvent<HTMLDivElement>
    ) => {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
      setHoveredColumnId(columnId);
      setHoveredCardId(cardId);
      setHoveredCardPosition(position);
    },
    []
  );

  const handleColumnDrop = useCallback(
    (columnId: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      commitMove(columnId, null, 'after');
    },
    [commitMove]
  );

  const handleCardDrop = useCallback(
    (
      columnId: string,
      cardId: string | null,
      position: KanbanCardDropPosition,
      event: React.DragEvent<HTMLDivElement>
    ) => {
      event.preventDefault();
      event.stopPropagation();
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
