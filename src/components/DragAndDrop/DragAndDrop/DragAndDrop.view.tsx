import React from 'react';
import { View } from 'app-studio';
import { DragAndDropProps } from './DragAndDrop.props';

interface DragAndDropViewProps extends DragAndDropProps {
  draggedIndex: number | null;
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  renderItem?: (item: any, index: number) => React.ReactNode;
  handleDragStart: (
    e: React.MouseEvent | React.TouchEvent,
    index: number
  ) => void;
}

export const DragAndDropView: React.FC<DragAndDropViewProps> = ({
  items,
  renderItem,
  containerProps,
  itemProps,
  draggedIndex,
  itemRefs,
  handleDragStart,
}) => (
  <View overflow="hidden" position="relative" {...containerProps}>
    {items.map((item, index) => (
      <View
        key={index}
        ref={(el) => (itemRefs.current[index] = el as HTMLDivElement)}
        onMouseDown={(e: React.MouseEvent) => handleDragStart(e, index)}
        onTouchStart={(e: React.TouchEvent) => handleDragStart(e, index)}
        position="relative"
        cursor="grab"
        transition="transform 0.2s"
        backgroundColor={
          draggedIndex === index ? 'color.gray.100' : 'transparent'
        }
        {...itemProps}
      >
        {renderItem ? renderItem(item, index) : item}
      </View>
    ))}
  </View>
);
