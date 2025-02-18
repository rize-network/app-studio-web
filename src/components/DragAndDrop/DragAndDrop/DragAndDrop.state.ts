import { useState, useRef, useCallback, useEffect } from 'react';
import { DragAndDropProps } from './DragAndDrop.props';

export const useDragAndDropState = ({
  items: initialItems,
  onChange,
}: DragAndDropProps) => {
  const [items, setItems] = useState(initialItems);
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent, index: number) => {
      e.preventDefault();
      document.body.style.cursor = 'grabbing';

      const clientX =
        'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY =
        'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

      dragStartPosRef.current = { x: clientX, y: clientY };
      setDraggedIndex(index);
      setDraggedItem(items[index]);
    },
    [items]
  );

  const handleDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (draggedIndex === null) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const draggedElement = itemRefs.current[draggedIndex];
      if (!draggedElement) return;

      const offsetX = clientX - dragStartPosRef.current.x;
      const offsetY = clientY - dragStartPosRef.current.y;

      draggedElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      draggedElement.style.zIndex = '1000';

      // Find the item being hovered over
      const hoveredIndex = itemRefs.current.findIndex((itemRef, index) => {
        if (!itemRef || index === draggedIndex) return false;
        const rect = itemRef.getBoundingClientRect();
        return clientY >= rect.top && clientY <= rect.bottom;
      });

      if (hoveredIndex !== -1 && hoveredIndex !== draggedIndex) {
        const newItems = [...items];
        const [removed] = newItems.splice(draggedIndex, 1);
        newItems.splice(hoveredIndex, 0, removed);
        setItems(newItems);
        setDraggedIndex(hoveredIndex);
        onChange?.(newItems);
        dragStartPosRef.current = { x: clientX, y: clientY };
      }
    },
    [draggedIndex, items, onChange]
  );

  const handleDragEnd = useCallback(() => {
    document.body.style.cursor = '';

    itemRefs.current.forEach((el) => {
      if (el) {
        el.style.transform = '';
        el.style.zIndex = '';
      }
    });

    setDraggedIndex(null);
    setDraggedItem(null);
  }, [draggedIndex]);

  useEffect(() => {
    if (draggedIndex !== null) {
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
  }, [draggedIndex, handleDragMove, handleDragEnd]);

  return {
    items,
    draggedItem,
    draggedIndex,
    itemRefs,
    handleDragStart,
  };
};
