import { useState, useRef } from 'react';

export const useNavigationMenuState = (
  defaultActiveItemId: string | null = null,
  defaultExpandedItemIds: string[] = []
) => {
  const [activeItemId, setActiveItemId] = useState<string | null>(
    defaultActiveItemId
  );
  const [expandedItemIds, setExpandedItemIds] = useState<string[]>(
    defaultExpandedItemIds
  );
  const triggerRefs = useRef<Record<string, HTMLDivElement>>({});

  const toggleExpandedItem = (itemId: string) => {
    setExpandedItemIds((prevExpandedItemIds) => {
      // Check if the item is already expanded
      const isExpanded = prevExpandedItemIds.includes(itemId);

      if (isExpanded) {
        // If expanded, remove it from the list
        return prevExpandedItemIds.filter((id) => id !== itemId);
      } else {
        // If not expanded, add it to the list
        return [...prevExpandedItemIds, itemId];
      }
    });
  };

  const isItemExpanded = (itemId: string) => {
    return expandedItemIds.includes(itemId);
  };

  return {
    activeItemId,
    setActiveItemId,
    expandedItemIds,
    toggleExpandedItem,
    isItemExpanded,
    triggerRefs,
  };
};
