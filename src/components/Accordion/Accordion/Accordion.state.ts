import { useState } from 'react';

export const useAccordionState = (
  defaultExpandedItems: string[] = [],
  allowMultiple: boolean = false
) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpandedItems);

  const toggleItem = (itemId: string) => {
    setExpandedItems((prevExpandedItems) => {
      // Check if the item is already expanded
      const isExpanded = prevExpandedItems.includes(itemId);
      
      if (isExpanded) {
        // If expanded, remove it from the list
        return prevExpandedItems.filter((id) => id !== itemId);
      } else {
        // If not expanded, add it to the list
        // If allowMultiple is false, replace the current expanded item
        return allowMultiple 
          ? [...prevExpandedItems, itemId] 
          : [itemId];
      }
    });
  };

  const isItemExpanded = (itemId: string) => {
    return expandedItems.includes(itemId);
  };

  return {
    expandedItems,
    toggleItem,
    isItemExpanded,
  };
};
