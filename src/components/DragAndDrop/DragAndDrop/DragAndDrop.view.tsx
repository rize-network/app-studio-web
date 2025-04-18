import React from 'react';
import { View } from 'app-studio';
import { DragAndDropViewProps } from './DragAndDrop.props';

export const DragAndDropView: React.FC<DragAndDropViewProps> = ({
  items,
  renderItem,
  containerProps,
  itemProps,
  draggedIndex,
  itemRefs,
  handleDragStart,
  views,
  themeMode: elementMode,
}) => (
  <View
    overflow="hidden"
    position="relative"
    {...containerProps}
    {...views?.container}
  >
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
        {...views?.item}
      >
        {renderItem ? renderItem(item, index) : item}
      </View>
    ))}
  </View>
);
