import React from 'react';
import { DragAndDropProps } from './DragAndDrop/DragAndDrop.props';
import { useDragAndDropState } from './DragAndDrop/DragAndDrop.state';
import { DragAndDropView } from './DragAndDrop/DragAndDrop.view';
// Defines the main `DragAndDrop` React functional component, which orchestrates the state and view logic to create an interactive drag-and-drop experience.
export const DragAndDropComponent: React.FC<DragAndDropProps> = (props) => {
  const { items, draggedIndex, itemRefs, handleDragStart } =
    useDragAndDropState(props);
  return (
    <DragAndDropView
      {...props}
      items={items}
      draggedIndex={draggedIndex}
      itemRefs={itemRefs}
      handleDragStart={handleDragStart}
    />
  );
};
export const DragAndDrop = DragAndDropComponent;
