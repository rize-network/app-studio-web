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
  const [dropPosition, setDropPosition] = useState<'top' | 'bottom' | null>(null);
  const dragStateRef = useRef<DragState | null>(null);

  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  const commitMove = useCallback(
    (targetColumnId: string, targetCardId: string | null, position: 'top' | 'bottom' | null = null) => {
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
            // Insert before or after based on position
            targetIndex = position === 'bottom' ? foundIndex + 1 : foundIndex;

            // Adjust for same column moves
            if (targetColumnId === sourceColumnId && foundIndex > sourceIndex) {
              targetIndex = position === 'bottom' ? foundIndex : foundIndex - 1;
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
      setHoveredColumnId(null);
      setHoveredCardId(null);
      setDropPosition(null);
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
    setDropPosition(null);
  }, []);

  const handleColumnDragOver = useCallback(
    (columnId: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
      setHoveredColumnId(columnId);
      setHoveredCardId(null);
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

      // Determine if hovering over top or bottom half of the card
      if (cardId && event.currentTarget) {
        const rect = event.currentTarget.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        const position = event.clientY < midpoint ? 'top' : 'bottom';
        setDropPosition(position);
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

      // Determine drop position based on mouse position
      let position: 'top' | 'bottom' = 'top';
      if (cardId && event.currentTarget) {
        const rect = event.currentTarget.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        position = event.clientY < midpoint ? 'top' : 'bottom';
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
    dropPosition,
    onCardDragStart: handleCardDragStart,
    onCardDragEnd: handleCardDragEnd,
    onColumnDragOver: handleColumnDragOver,
    onCardDragOver: handleCardDragOver,
    onColumnDrop: handleColumnDrop,
    onCardDrop: handleCardDrop,
  };
};
