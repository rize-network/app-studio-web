/**
 * DragAndDropView (React Native)
 *
 * The web implementation reorders items with pointer/`window` mouse-move
 * listeners and per-node `getBoundingClientRect()` math — none of which exist
 * on React Native. Rather than degrade to a static, non-interactive list, this
 * native view keeps the same public surface (`items`, `renderItem`,
 * `containerProps`, `itemProps`, `views`, `onChange`) but exposes reordering
 * through explicit ↑/↓ controls, which is the idiomatic touch pattern when a
 * gesture/reanimated drag layer isn't wired up.
 *
 * It owns a local copy of the order (seeded from `items`) so the demo is fully
 * interactive, and mirrors every change back through `onChange`.
 */

import React from 'react';
import { View, Horizontal, Text } from 'app-studio';
import { ChevronIcon } from '../../Icon/Icon';
import { DragAndDropViewProps } from './DragAndDrop.props';

export const DragAndDropView: React.FC<DragAndDropViewProps> = ({
  items: itemsProp,
  renderItem,
  containerProps,
  itemProps,
  onChange,
  views,
}) => {
  const [items, setItems] = React.useState<any[]>(itemsProp ?? []);

  // Keep local order in sync if the parent swaps the list out.
  React.useEffect(() => {
    setItems(itemsProp ?? []);
  }, [itemsProp]);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [removed] = next.splice(from, 1);
    next.splice(to, 0, removed);
    setItems(next);
    onChange?.(next);
  };

  return (
    <View
      overflow="hidden"
      position="relative"
      {...containerProps}
      {...views?.container}
    >
      {items.map((item, index) => (
        <Horizontal
          key={index}
          alignItems="center"
          gap={8}
          {...itemProps}
          {...views?.item}
        >
          <View flex={1}>
            {renderItem ? renderItem(item, index) : <Text>{String(item)}</Text>}
          </View>
          <Horizontal gap={4} alignItems="center">
            <View
              onPress={() => move(index, index - 1)}
              opacity={index === 0 ? 0.3 : 1}
              padding={4}
              borderRadius={6}
              backgroundColor="color-gray-100"
            >
              <ChevronIcon
                orientation="up"
                widthHeight={16}
                color="color-gray-600"
              />
            </View>
            <View
              onPress={() => move(index, index + 1)}
              opacity={index === items.length - 1 ? 0.3 : 1}
              padding={4}
              borderRadius={6}
              backgroundColor="color-gray-100"
            >
              <ChevronIcon
                orientation="down"
                widthHeight={16}
                color="color-gray-600"
              />
            </View>
          </Horizontal>
        </Horizontal>
      ))}
    </View>
  );
};
