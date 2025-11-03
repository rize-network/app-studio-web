import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KanbanBoardProps } from './KanbanBoard.props';

interface DragState {
  columnId: string;
  cardId: string;
}

interface PreviewState {
  columnId: string;
  cardId: string | null;
  position: 'before' | 'after';
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
  const lastPreviewRef = useRef<PreviewState | null>(null);

  const updateHoverPosition = useCallback(
    (position: 'before' | 'after' | null) => {
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

  const handleCardDragStart = useCallback(
    (
      columnId: string,
      cardId: string,
      event: React.DragEvent<HTMLDivElement>
    ) => {
      dragStateRef.current = { columnId, cardId };
      setDraggedCardId(cardId);
      lastPreviewRef.current = null;

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
    lastPreviewRef.current = null;
    setDraggedCardId(null);
    setHoveredColumnId(null);
    setHoveredCardId(null);
    updateHoverPosition(null);
  }, [updateHoverPosition]);

  const applyPreviewMove = useCallback(
    (
      targetColumnId: string,
      targetCardId: string | null,
      position: 'before' | 'after'
    ) => {
      const dragState = dragStateRef.current;
      if (!dragState) return;

      const { cardId } = dragState;
      const lastPreview = lastPreviewRef.current;

      if (
        lastPreview &&
        lastPreview.columnId === targetColumnId &&
        lastPreview.cardId === targetCardId &&
        lastPreview.position === position
      ) {
        return;
      }

      setColumns((prevColumns) => {
        const workingColumns = prevColumns.map((column) => ({
          ...column,
          cards: [...column.cards],
        }));

        const sourceColumn = workingColumns.find((column) =>
          column.cards.some((card) => card.id === cardId)
        );

        if (!sourceColumn) {
          return prevColumns;
        }

        const sourceColumnId = sourceColumn.id;
        const targetColumn = workingColumns.find(
          (column) => column.id === targetColumnId
        );

        if (!targetColumn) {
          return prevColumns;
        }

        const currentIndex = sourceColumn.cards.findIndex(
          (card) => card.id === cardId
        );

        if (currentIndex === -1) {
          return prevColumns;
        }

        const isSameColumn = targetColumnId === sourceColumnId;

        if (isSameColumn) {
          if (targetCardId === cardId) {
            lastPreviewRef.current = {
              columnId: targetColumnId,
              cardId: targetCardId,
              position,
            };
            return prevColumns;
          }

          if (targetCardId === null) {
            const lastIndex = sourceColumn.cards.length - 1;
            if (
              (position === 'before' && currentIndex === 0) ||
              (position === 'after' && currentIndex === lastIndex)
            ) {
              lastPreviewRef.current = {
                columnId: targetColumnId,
                cardId: targetCardId,
                position,
              };
              return prevColumns;
            }
          }
        }

        const [card] = sourceColumn.cards.splice(currentIndex, 1);

        let targetIndex: number;

        if (targetCardId) {
          const foundIndex = targetColumn.cards.findIndex(
            (item) => item.id === targetCardId
          );

          if (foundIndex !== -1) {
            targetIndex = position === 'before' ? foundIndex : foundIndex + 1;
          } else {
            targetIndex = targetColumn.cards.length;
          }
        } else {
          targetIndex = position === 'before' ? 0 : targetColumn.cards.length;
        }

        targetColumn.cards.splice(targetIndex, 0, card);

        lastPreviewRef.current = {
          columnId: targetColumnId,
          cardId: targetCardId,
          position,
        };
        dragStateRef.current = { columnId: targetColumnId, cardId };

        onChange?.(workingColumns);

        return workingColumns;
      });

      setHoveredColumnId(targetColumnId);
      setHoveredCardId(targetCardId);
      updateHoverPosition(position);
    },
    [onChange, updateHoverPosition]
  );

  const handleColumnDragOver = useCallback(
    (columnId: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
      const position = getRelativeDropPosition(event);
      applyPreviewMove(columnId, null, position);
    },
    [applyPreviewMove, getRelativeDropPosition]
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
      const position = getRelativeDropPosition(event);
      applyPreviewMove(columnId, cardId, position);
    },
    [applyPreviewMove, getRelativeDropPosition]
  );

  const handleColumnDrop = useCallback(
    (columnId: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const position = getRelativeDropPosition(event);
      applyPreviewMove(columnId, null, position);
      handleCardDragEnd();
    },
    [applyPreviewMove, getRelativeDropPosition, handleCardDragEnd]
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
      applyPreviewMove(columnId, cardId, position);
      handleCardDragEnd();
    },
    [applyPreviewMove, getRelativeDropPosition, handleCardDragEnd]
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
