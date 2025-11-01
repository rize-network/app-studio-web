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
  const [hoveredCardPosition, setHoveredCardPosition] = useState<
    'before' | 'after' | null
  >(null);
  const dragStateRef = useRef<DragState | null>(null);
  const hoverPositionRef = useRef<'before' | 'after' | null>(null);

  const updateHoverPosition = useCallback(
    (position: 'before' | 'after' | null) => {
      hoverPositionRef.current = position;
      setHoveredCardPosition(position);
    },
    []
  );

  const getRelativeDropPosition = useCallback(
    (event: React.DragEvent<HTMLDivElement>): 'before' | 'after' => {
      const rect = event.currentTarget.getBoundingClientRect();
      const offset = event.clientY - rect.top;
      return offset < rect.height / 2 ? 'before' : 'after';
    },
    []
  );

  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  const commitMove = useCallback(
    (
      targetColumnId: string,
      targetCardId: string | null,
      position: 'before' | 'after' | null
    ) => {
      const dragState = dragStateRef.current;
      if (!dragState) return;

      const { columnId: sourceColumnId, cardId } = dragState;

      if (
        targetColumnId === sourceColumnId &&
        (targetCardId === null || targetCardId === cardId)
      ) {
        dragStateRef.current = null;
        setDraggedCardId(null);
        updateHoverPosition(null);
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

        if (targetColumnId === sourceColumnId && targetCardId === cardId) {
          return prevColumns;
        }

        const [card] = sourceColumn.cards.splice(sourceIndex, 1);

        const dropPosition = position ?? 'after';

        let targetIndex: number;

        if (targetCardId) {
          const foundIndex = targetColumn.cards.findIndex(
            (item) => item.id === targetCardId
          );

          if (foundIndex !== -1) {
            targetIndex =
              dropPosition === 'before' ? foundIndex : foundIndex + 1;
          } else {
            targetIndex = targetColumn.cards.length;
          }
        } else {
          targetIndex =
            dropPosition === 'before' ? 0 : targetColumn.cards.length;
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
      updateHoverPosition(null);
    },
    [onChange, updateHoverPosition]
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
    updateHoverPosition(null);
  }, [updateHoverPosition]);

  const handleColumnDragOver = useCallback(
    (columnId: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
      setHoveredColumnId(columnId);
      setHoveredCardId(null);
      updateHoverPosition(getRelativeDropPosition(event));
    },
    [getRelativeDropPosition, updateHoverPosition]
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
      updateHoverPosition(getRelativeDropPosition(event));
    },
    [getRelativeDropPosition, updateHoverPosition]
  );

  const handleColumnDrop = useCallback(
    (columnId: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const position =
        hoverPositionRef.current ?? getRelativeDropPosition(event);
      commitMove(columnId, null, position);
    },
    [commitMove, getRelativeDropPosition]
  );

  const handleCardDrop = useCallback(
    (
      columnId: string,
      cardId: string | null,
      event: React.DragEvent<HTMLDivElement>
    ) => {
      event.preventDefault();
      event.stopPropagation();
      const position = getRelativeDropPosition(event);
      commitMove(columnId, cardId, position);
    },
    [commitMove, getRelativeDropPosition]
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
