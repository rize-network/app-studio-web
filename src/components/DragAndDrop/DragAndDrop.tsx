import React from 'react';
import { DragAndDropProps } from './DragAndDrop/DragAndDrop.props';
import { useDragAndDropState } from './DragAndDrop/DragAndDrop.state';
import { DragAndDropView } from './DragAndDrop/DragAndDrop.view';

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
