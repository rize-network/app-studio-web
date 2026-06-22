/**
 * useDragAndDropState (React Native)
 *
 * The web hook wires `window`/`document` pointer listeners (its effect cleanup
 * calls `window.removeEventListener`, which is not a function on React Native
 * and would throw on unmount). The native view
 * (`DragAndDrop.view.native.tsx`) implements reordering itself via explicit
 * controls, so this hook only needs to surface a stable `items` array and inert
 * stand-ins for the web-only handles.
 */

import { useRef, useState } from 'react';
import { DragAndDropProps } from './DragAndDrop.props';

export const useDragAndDropState = ({
  items: initialItems,
}: DragAndDropProps) => {
  const [items] = useState(initialItems);
  const itemRefs = useRef<any[]>([]);

  return {
    items,
    draggedItem: null as any,
    draggedIndex: null as number | null,
    itemRefs,
    handleDragStart: () => {},
  };
};
