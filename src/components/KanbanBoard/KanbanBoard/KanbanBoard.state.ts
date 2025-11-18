import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  KanbanBoardCard,
  KanbanBoardColumn,
  KanbanBoardProps,
} from './KanbanBoard.props';

interface DragState {
  columnId: string;
  cardId: string;
}

const cloneColumns = (
  inputColumns: KanbanBoardProps['columns']
): KanbanBoardProps['columns'] =>
  inputColumns.map((column) => ({
    ...column,
    cards: [...column.cards],
  }));

export const useKanbanBoardState = ({
  columns: initialColumns,
  onChange,
  onCardMove,
  onCardCreate: onCardCreateProp,
  onCardDelete: onCardDeleteProp,
  onCardTitleChange: onCardTitleChangeProp,
  onCardDescriptionChange: onCardDescriptionChangeProp,
}: KanbanBoardProps) => {
  const [columns, setColumns] =
    useState<KanbanBoardProps['columns']>(initialColumns);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [hoveredColumnId, setHoveredColumnId] = useState<string | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const originalColumnsRef = useRef<KanbanBoardProps['columns'] | null>(null);
  const dropCommittedRef = useRef(false);

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

  const applyMove = useCallback(
    (
      targetColumnId: string,
      targetCardId: string | null,
      position: 'before' | 'after' | null,
      options?: { shouldCommit?: boolean }
    ) => {
      const dragState = dragStateRef.current;
      if (!dragState) return;

      const { columnId: sourceColumnId, cardId } = dragState;

      if (targetColumnId === sourceColumnId && targetCardId === cardId) {
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
          (cardItem) => cardItem.id === cardId
        );

        if (sourceIndex === -1) {
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

        const hasChanged = workingColumns.some((column, columnIndex) => {
          const previousColumn = prevColumns[columnIndex];
          if (!previousColumn) {
            return true;
          }

          if (column.cards.length !== previousColumn.cards.length) {
            return true;
          }

          return column.cards.some(
            (currentCard, cardIndex) =>
              currentCard.id !== previousColumn.cards[cardIndex]?.id
          );
        });

        if (!hasChanged) {
          return prevColumns;
        }

        const updatedColumns = workingColumns.map((column) => ({
          ...column,
          cards: [...column.cards],
        }));

        dragStateRef.current = { columnId: targetColumnId, cardId };

        if (options?.shouldCommit) {
          const originalSourceColumn = prevColumns.find(
            (c) => c.id === sourceColumnId
          );
          const originalTargetColumn = prevColumns.find(
            (c) => c.id === targetColumnId
          );

          if (card && originalSourceColumn && originalTargetColumn) {
            onCardMove?.(
              card,
              originalSourceColumn as KanbanBoardColumn,
              originalTargetColumn as KanbanBoardColumn
            );
          }
          onChange?.(updatedColumns);
        }

        return updatedColumns;
      });
    },
    [onChange, onCardMove]
  );

  const handleCardDragStart = useCallback(
    (
      columnId: string,
      cardId: string,
      event: React.DragEvent<HTMLDivElement>
    ) => {
      dragStateRef.current = { columnId, cardId };
      originalColumnsRef.current = cloneColumns(columns);
      dropCommittedRef.current = false;
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
    [columns]
  );

  const handleCardDragEnd = useCallback(() => {
    if (!dropCommittedRef.current && originalColumnsRef.current) {
      setColumns(cloneColumns(originalColumnsRef.current));
    }

    dragStateRef.current = null;
    originalColumnsRef.current = null;
    dropCommittedRef.current = false;
    setDraggedCardId(null);
    setHoveredColumnId(null);
  }, []);

  const handleColumnDragOver = useCallback(
    (columnId: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
      setHoveredColumnId(columnId);
      applyMove(columnId, null, getRelativeDropPosition(event));
    },
    [applyMove, getRelativeDropPosition]
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
      applyMove(columnId, cardId, getRelativeDropPosition(event));
    },
    [applyMove, getRelativeDropPosition]
  );

  const handleColumnDrop = useCallback(
    (columnId: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      dropCommittedRef.current = true;
      applyMove(columnId, null, getRelativeDropPosition(event), {
        shouldCommit: true,
      });
    },
    [applyMove, getRelativeDropPosition]
  );

  const handleCardDrop = useCallback(
    (
      columnId: string,
      cardId: string | null,
      event: React.DragEvent<HTMLDivElement>
    ) => {
      event.preventDefault();
      event.stopPropagation();
      dropCommittedRef.current = true;
      applyMove(columnId, cardId, getRelativeDropPosition(event), {
        shouldCommit: true,
      });
    },
    [applyMove, getRelativeDropPosition]
  );

  const handleCardCreate = useCallback(
    (card: KanbanBoardCard, column: KanbanBoardColumn) => {
      if (onCardCreateProp) {
        onCardCreateProp(card, column);
        return;
      }

      setColumns((prevColumns) => {
        const updatedColumns = prevColumns.map((col) =>
          col.id === column.id ? { ...col, cards: [...col.cards, card] } : col
        );
        onChange?.(updatedColumns);
        return updatedColumns;
      });
    },
    [onChange, onCardCreateProp]
  );

  const handleCardDelete = useCallback(
    (card: KanbanBoardCard, column: KanbanBoardColumn) => {
      if (onCardDeleteProp) {
        onCardDeleteProp(card, column);
        return;
      }

      setColumns((prevColumns) => {
        const updatedColumns = prevColumns.map((col) =>
          col.id === column.id
            ? { ...col, cards: col.cards.filter((c) => c.id !== card.id) }
            : col
        );
        onChange?.(updatedColumns);
        return updatedColumns;
      });
    },
    [onChange, onCardDeleteProp]
  );

  const handleCardTitleChange = useCallback(
    (card: KanbanBoardCard, column: KanbanBoardColumn, newTitle: string) => {
      if (onCardTitleChangeProp) {
        onCardTitleChangeProp(card, column, newTitle);
        return;
      }

      setColumns((prevColumns) => {
        const updatedColumns = prevColumns.map((col) =>
          col.id === column.id
            ? {
                ...col,
                cards: col.cards.map((c) =>
                  c.id === card.id ? { ...c, title: newTitle } : c
                ),
              }
            : col
        );
        onChange?.(updatedColumns);
        return updatedColumns;
      });
    },
    [onChange, onCardTitleChangeProp]
  );

  const handleCardDescriptionChange = useCallback(
    (
      card: KanbanBoardCard,
      column: KanbanBoardColumn,
      newDescription: string
    ) => {
      if (onCardDescriptionChangeProp) {
        onCardDescriptionChangeProp(card, column, newDescription);
        return;
      }

      setColumns((prevColumns) => {
        const updatedColumns = prevColumns.map((col) =>
          col.id === column.id
            ? {
                ...col,
                cards: col.cards.map((c) =>
                  c.id === card.id ? { ...c, description: newDescription } : c
                ),
              }
            : col
        );
        onChange?.(updatedColumns);
        return updatedColumns;
      });
    },
    [onChange, onCardDescriptionChangeProp]
  );

  return {
    columns,
    draggedCardId,
    hoveredColumnId,
    onCardDragStart: handleCardDragStart,
    onCardDragEnd: handleCardDragEnd,
    onColumnDragOver: handleColumnDragOver,
    onCardDragOver: handleCardDragOver,
    onColumnDrop: handleColumnDrop,
    onCardDrop: handleCardDrop,
    onCardCreate: handleCardCreate,
    onCardDelete: handleCardDelete,
    onCardTitleChange: handleCardTitleChange,
    onCardDescriptionChange: handleCardDescriptionChange,
  };
};
