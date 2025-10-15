import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  KanbanBoardProps,
  KanbanBoardViewProps,
  KanbanColumn,
  KanbanDragLocation,
  KanbanDropPreview,
} from './KanbanBoard.props';

export type KanbanBoardState = Pick<
  KanbanBoardViewProps,
  | 'columns'
  | 'dropPreview'
  | 'dragLocation'
  | 'registerCardRef'
  | 'handleCardDragStart'
  | 'handleCardDragEnd'
  | 'handleColumnDragOver'
  | 'handleColumnDrop'
>;

export const useKanbanBoardState = ({
  columns: initialColumns,
  onChange,
}: KanbanBoardProps): KanbanBoardState => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [dragLocation, setDragLocation] = useState<KanbanDragLocation | null>(
    null
  );
  const [dropPreview, setDropPreview] = useState<KanbanDropPreview | null>(
    null
  );
  const cardRefs = useRef<Record<string, (HTMLDivElement | null)[]>>({});

  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  const registerCardRef = useCallback(
    (columnId: string, index: number, node: HTMLDivElement | null) => {
      if (!cardRefs.current[columnId]) {
        cardRefs.current[columnId] = [];
      }

      cardRefs.current[columnId][index] = node;
    },
    []
  );

  const moveCard = useCallback(
    (targetColumnId: string, rawTargetIndex: number) => {
      setColumns((prevColumns) => {
        if (!dragLocation) {
          return prevColumns;
        }

        const sourceColumnIndex = prevColumns.findIndex(
          (column) => column.id === dragLocation.columnId
        );

        if (sourceColumnIndex === -1) {
          return prevColumns;
        }

        const targetColumnIndex = prevColumns.findIndex(
          (column) => column.id === targetColumnId
        );

        if (targetColumnIndex === -1) {
          return prevColumns;
        }

        if (
          targetColumnId === dragLocation.columnId &&
          (rawTargetIndex === dragLocation.cardIndex ||
            rawTargetIndex === dragLocation.cardIndex + 1)
        ) {
          return prevColumns;
        }

        const nextColumns = prevColumns.map((column) => ({
          ...column,
          cards: [...column.cards],
        }));

        const sourceCards = nextColumns[sourceColumnIndex].cards;
        const [card] = sourceCards.splice(dragLocation.cardIndex, 1);

        if (!card) {
          return prevColumns;
        }

        const targetCards = nextColumns[targetColumnIndex].cards;
        let targetIndex = Math.max(
          0,
          Math.min(rawTargetIndex, targetCards.length)
        );

        if (
          dragLocation.columnId === targetColumnId &&
          rawTargetIndex > dragLocation.cardIndex
        ) {
          targetIndex = Math.max(
            0,
            Math.min(rawTargetIndex - 1, targetCards.length)
          );
        }

        targetCards.splice(targetIndex, 0, card);

        onChange?.(nextColumns);

        return nextColumns;
      });
    },
    [dragLocation, onChange]
  );

  const handleCardDragStart = useCallback(
    (
      columnId: string,
      index: number,
      event: React.DragEvent<HTMLDivElement>
    ) => {
      event.dataTransfer?.setData('text/plain', '');
      event.dataTransfer.effectAllowed = 'move';
      setDragLocation({ columnId, cardIndex: index });
    },
    []
  );

  const handleCardDragEnd = useCallback(() => {
    setDragLocation(null);
    setDropPreview(null);
  }, []);

  const handleColumnDragOver = useCallback(
    (columnId: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';

      const refs = cardRefs.current[columnId] ?? [];
      const { clientY } = event;

      let targetIndex = refs.length;

      for (let index = 0; index < refs.length; index += 1) {
        const node = refs[index];

        if (!node) continue;

        const rect = node.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;

        if (clientY < midpoint) {
          targetIndex = index;
          break;
        }
      }

      setDropPreview((previous) => {
        if (
          previous &&
          previous.columnId === columnId &&
          previous.index === targetIndex
        ) {
          return previous;
        }

        return { columnId, index: targetIndex };
      });
    },
    []
  );

  const handleColumnDrop = useCallback(
    (columnId: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!dragLocation) {
        return;
      }

      const targetColumnId = dropPreview?.columnId ?? columnId;
      const column = columns.find((item) => item.id === targetColumnId);

      if (!column) {
        setDragLocation(null);
        setDropPreview(null);
        return;
      }

      const rawTargetIndex = dropPreview?.index ?? column.cards.length;

      moveCard(targetColumnId, rawTargetIndex);
      setDragLocation(null);
      setDropPreview(null);
    },
    [columns, dragLocation, dropPreview, moveCard]
  );

  const adjustedDropPreview = useMemo(() => {
    if (!dropPreview) {
      return null;
    }

    const column = columns.find((item) => item.id === dropPreview.columnId);

    if (!column) {
      return null;
    }

    const maxIndex = column.cards.length;
    const index = Math.max(0, Math.min(dropPreview.index, maxIndex));

    return {
      columnId: dropPreview.columnId,
      index,
    };
  }, [columns, dropPreview]);

  return {
    columns,
    dropPreview: adjustedDropPreview,
    dragLocation,
    registerCardRef,
    handleCardDragStart,
    handleCardDragEnd,
    handleColumnDragOver,
    handleColumnDrop,
  };
};
