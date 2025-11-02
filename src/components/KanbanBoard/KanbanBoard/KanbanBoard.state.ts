import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KanbanBoardProps } from './KanbanBoard.props';

interface DragState {
  columnId: string;
  cardId: string;
  cardIndex: number;
}

export const useKanbanBoardState = ({
  columns: initialColumns,
  onChange,
}: KanbanBoardProps) => {
  const [columns, setColumns] =
    useState<KanbanBoardProps['columns']>(initialColumns);
  const [draggedCard, setDraggedCard] = useState<{
    columnId: string;
    cardId: string;
    cardIndex: number;
  } | null>(null);
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const cardRefsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  const handleCardMouseDown = useCallback(
    (
      columnId: string,
      cardId: string,
      cardIndex: number,
      event: React.MouseEvent | React.TouchEvent
    ) => {
      event.preventDefault();
      document.body.style.cursor = 'grabbing';

      const clientX =
        'touches' in event
          ? event.touches[0].clientX
          : (event as React.MouseEvent).clientX;
      const clientY =
        'touches' in event
          ? event.touches[0].clientY
          : (event as React.MouseEvent).clientY;

      dragStartPosRef.current = { x: clientX, y: clientY };
      setDraggedCard({ columnId, cardId, cardIndex });
    },
    []
  );

  const handleDragMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!draggedCard) return;

      const clientX =
        'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY =
        'touches' in event ? event.touches[0].clientY : event.clientY;

      const draggedElement = cardRefsRef.current.get(
        `${draggedCard.columnId}-${draggedCard.cardId}`
      );
      if (!draggedElement) return;

      const offsetX = clientX - dragStartPosRef.current.x;
      const offsetY = clientY - dragStartPosRef.current.y;

      draggedElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      draggedElement.style.zIndex = '1000';

      // Find which card/column is being hovered over
      let hoveredColumnId: string | null = null;
      let hoveredCardId: string | null = null;
      let hoveredCardIndex: number | null = null;

      // Check all cards to see which one we're hovering over
      for (const column of columns) {
        for (let i = 0; i < column.cards.length; i++) {
          const card = column.cards[i];
          const cardElement = cardRefsRef.current.get(
            `${column.id}-${card.id}`
          );

          if (
            !cardElement ||
            (column.id === draggedCard.columnId &&
              card.id === draggedCard.cardId)
          ) {
            continue;
          }

          const rect = cardElement.getBoundingClientRect();
          if (
            clientY >= rect.top &&
            clientY <= rect.bottom &&
            clientX >= rect.left &&
            clientX <= rect.right
          ) {
            hoveredColumnId = column.id;
            hoveredCardId = card.id;
            hoveredCardIndex = i;
            break;
          }
        }
        if (hoveredColumnId) break;
      }

      // If hovering over a card, reorder
      if (
        hoveredColumnId &&
        hoveredCardId &&
        hoveredCardIndex !== null &&
        !(
          hoveredColumnId === draggedCard.columnId &&
          hoveredCardIndex === draggedCard.cardIndex
        )
      ) {
        const targetIndex = hoveredCardIndex;
        const targetColId = hoveredColumnId;

        setColumns((prevColumns) => {
          const newColumns = prevColumns.map((col) => ({
            ...col,
            cards: [...col.cards],
          }));

          const sourceColumn = newColumns.find(
            (col) => col.id === draggedCard.columnId
          );
          const targetColumn = newColumns.find((col) => col.id === targetColId);

          if (!sourceColumn || !targetColumn) return prevColumns;

          const cardToMove = sourceColumn.cards.find(
            (card) => card.id === draggedCard.cardId
          );
          if (!cardToMove) return prevColumns;

          // Remove from source
          sourceColumn.cards = sourceColumn.cards.filter(
            (card) => card.id !== draggedCard.cardId
          );

          // Insert at target position
          targetColumn.cards.splice(targetIndex, 0, cardToMove);

          onChange?.(newColumns);

          // Update dragged card state with new position
          setDraggedCard({
            columnId: targetColId,
            cardId: draggedCard.cardId,
            cardIndex: targetIndex,
          });

          dragStartPosRef.current = { x: clientX, y: clientY };

          return newColumns;
        });
      }
    },
    [draggedCard, columns, onChange]
  );

  const handleDragEnd = useCallback(() => {
    document.body.style.cursor = '';

    // Clear all transforms
    cardRefsRef.current.forEach((el) => {
      if (el) {
        el.style.transform = '';
        el.style.zIndex = '';
      }
    });

    setDraggedCard(null);
  }, []);

  useEffect(() => {
    if (draggedCard) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [draggedCard, handleDragMove, handleDragEnd]);

  return {
    columns,
    draggedCard,
    cardRefsRef,
    onCardMouseDown: handleCardMouseDown,
  };
};
