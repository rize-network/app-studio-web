import { useState, useRef } from 'react';
// This file defines a custom React hook, `useNavigationMenuState`, which encapsulates and manages the entire local state and logic for the Navigation Menu component, including active item tracking, expanded sub-menus, and element references.
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
      const isExpanded = prevExpandedItemIds.includes(itemId);
      if (isExpanded) {
        return prevExpandedItemIds.filter((id) => id !== itemId);
      } else {
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
