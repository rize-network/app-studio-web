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
  const dragStateRef = useRef<DragState | null>(null);
  const hoverPositionRef = useRef<'before' | 'after' | null>(null);
  const originalColumnsRef = useRef<KanbanBoardProps['columns'] | null>(null);
  const previewTargetRef = useRef<{
    columnId: string;
    cardId: string | null;
    position: 'before' | 'after';
  } | null>(null);

  const updateHoverPosition = useCallback(
    (position: 'before' | 'after' | null) => {
      hoverPositionRef.current = position;
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

  const moveCard = useCallback(
    (
      currentColumns: KanbanBoardProps['columns'],
      targetColumnId: string,
      targetCardId: string | null,
      position: 'before' | 'after'
    ) => {
      const dragState = dragStateRef.current;

      if (!dragState) {
        return currentColumns;
      }

      const { columnId: sourceColumnId, cardId } = dragState;

      if (
        targetColumnId === sourceColumnId &&
        (targetCardId === null || targetCardId === cardId)
      ) {
        return currentColumns;
      }

      const workingColumns = currentColumns.map((column) => ({
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
        return currentColumns;
      }

      const sourceIndex = sourceColumn.cards.findIndex(
        (card) => card.id === cardId
      );

      if (sourceIndex === -1) {
        return currentColumns;
      }

      const dropPosition = position ?? 'after';

      if (targetColumnId === sourceColumnId) {
        if (targetCardId) {
          const targetIndex = sourceColumn.cards.findIndex(
            (item) => item.id === targetCardId
          );

          if (targetIndex !== -1) {
            const isNoOpBefore =
              dropPosition === 'before' && sourceIndex === targetIndex - 1;
            const isNoOpAfter =
              dropPosition === 'after' && sourceIndex === targetIndex + 1;

            if (isNoOpBefore || isNoOpAfter) {
              return currentColumns;
            }
          }
        } else {
          const lastIndex = sourceColumn.cards.length - 1;
          const isNoOpBefore = dropPosition === 'before' && sourceIndex === 0;
          const isNoOpAfter =
            dropPosition === 'after' && sourceIndex === lastIndex;

          if (isNoOpBefore || isNoOpAfter) {
            return currentColumns;
          }
        }
      }

      const [card] = sourceColumn.cards.splice(sourceIndex, 1);

      let targetIndex: number;

      if (targetCardId) {
        const foundIndex = targetColumn.cards.findIndex(
          (item) => item.id === targetCardId
        );

        if (foundIndex !== -1) {
          targetIndex = dropPosition === 'before' ? foundIndex : foundIndex + 1;
        } else {
          targetIndex = targetColumn.cards.length;
        }
      } else {
        targetIndex = dropPosition === 'before' ? 0 : targetColumn.cards.length;
      }

      targetIndex = Math.max(
        0,
        Math.min(targetColumn.cards.length, targetIndex)
      );

      targetColumn.cards.splice(targetIndex, 0, card);

      return workingColumns;
    },
    []
  );

  const previewMove = useCallback(
    (columnId: string, cardId: string | null, position: 'before' | 'after') => {
      if (!dragStateRef.current) {
        return;
      }

      const lastPreview = previewTargetRef.current;

      if (
        lastPreview &&
        lastPreview.columnId === columnId &&
        lastPreview.cardId === cardId &&
        lastPreview.position === position
      ) {
        return;
      }

      previewTargetRef.current = { columnId, cardId, position };

      setColumns((prevColumns) =>
        moveCard(prevColumns, columnId, cardId, position)
      );
    },
    [moveCard]
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
      previewTargetRef.current = null;
      originalColumnsRef.current = columns.map((columnItem) => ({
        ...columnItem,
        cards: [...columnItem.cards],
      }));

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
    if (originalColumnsRef.current) {
      setColumns(originalColumnsRef.current);
    }

    dragStateRef.current = null;
    setDraggedCardId(null);
    setHoveredColumnId(null);
    setHoveredCardId(null);
    updateHoverPosition(null);
    previewTargetRef.current = null;
    originalColumnsRef.current = null;
    hoverPositionRef.current = null;
  }, [updateHoverPosition]);

  const handleColumnDragOver = useCallback(
    (columnId: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
      setHoveredColumnId(columnId);
      setHoveredCardId(null);
      const position = getRelativeDropPosition(event);
      updateHoverPosition(position);
      previewMove(columnId, null, position);
    },
    [getRelativeDropPosition, previewMove, updateHoverPosition]
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
      const position = getRelativeDropPosition(event);
      updateHoverPosition(position);
      previewMove(columnId, cardId, position);
    },
    [getRelativeDropPosition, previewMove, updateHoverPosition]
  );

  const handleColumnDrop = useCallback(
    (columnId: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const position =
        hoverPositionRef.current ?? getRelativeDropPosition(event);
      previewTargetRef.current = null;
      let nextColumns: KanbanBoardProps['columns'] | null = null;
      let hasChanged = false;
      setColumns((prevColumns) => {
        const updatedColumns = moveCard(prevColumns, columnId, null, position);
        if (updatedColumns === prevColumns) {
          nextColumns = prevColumns;
          return prevColumns;
        }
        hasChanged = true;
        nextColumns = updatedColumns;
        return updatedColumns;
      });
      if (hasChanged && nextColumns) {
        onChange?.(nextColumns);
      }
      dragStateRef.current = null;
      setDraggedCardId(null);
      setHoveredColumnId(null);
      setHoveredCardId(null);
      updateHoverPosition(null);
      hoverPositionRef.current = null;
      originalColumnsRef.current = null;
    },
    [getRelativeDropPosition, moveCard, onChange, updateHoverPosition]
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
      previewTargetRef.current = null;
      let nextColumns: KanbanBoardProps['columns'] | null = null;
      let hasChanged = false;
      setColumns((prevColumns) => {
        const updatedColumns = moveCard(
          prevColumns,
          columnId,
          cardId,
          position
        );
        if (updatedColumns === prevColumns) {
          nextColumns = prevColumns;
          return prevColumns;
        }
        hasChanged = true;
        nextColumns = updatedColumns;
        return updatedColumns;
      });
      if (hasChanged && nextColumns) {
        onChange?.(nextColumns);
      }
      dragStateRef.current = null;
      setDraggedCardId(null);
      setHoveredColumnId(null);
      setHoveredCardId(null);
      updateHoverPosition(null);
      hoverPositionRef.current = null;
      originalColumnsRef.current = null;
    },
    [getRelativeDropPosition, moveCard, onChange, updateHoverPosition]
  );

  return {
    columns,
    draggedCardId,
    hoveredColumnId,
    hoveredCardId,
    onCardDragStart: handleCardDragStart,
    onCardDragEnd: handleCardDragEnd,
    onColumnDragOver: handleColumnDragOver,
    onCardDragOver: handleCardDragOver,
    onColumnDrop: handleColumnDrop,
    onCardDrop: handleCardDrop,
  };
};
