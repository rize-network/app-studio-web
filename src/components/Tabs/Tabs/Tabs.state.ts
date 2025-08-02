import { useState, useEffect } from 'react';
import { Tab } from './Tabs.type';

/**
 * Custom hook to manage the state of the active tab.
 * @param propTabs - The array of tab objects provided as props.
 * @param defaultValue - The optional title of the tab to be initially active.
 * @returns An object containing the current activeTab and a function to update it.
 */
export const useTabsState = (
  propTabs: Tab[],
  defaultValue?: string | number
) => {
  // Find the initial tab based on defaultValue, or default to the first tab.
  // Ensure propTabs is not empty before accessing index 0.
  const findInitialTab = (): Tab | undefined => {
    if (!propTabs || propTabs.length === 0) {
      return undefined; // No tabs, no initial active tab
    }
    if (defaultValue !== undefined) {
      const foundTab = propTabs.find((tab) => tab.title === defaultValue);
      if (foundTab) {
        return foundTab;
      }
      // Warn if defaultValue is provided but not found
      // console.warn(
      //   `Tabs: defaultValue "${defaultValue}" not found in tabs. Defaulting to the first tab.`
      // );
    }
    return propTabs[0]; // Default to the first tab
  };

  const [activeTab, setActiveTab] = useState<Tab | undefined>(findInitialTab());

  // Effect to update the active tab if the defaultValue prop changes
  // or if the tabs array changes and the current active tab is no longer valid.
  useEffect(() => {
    const newInitialTab = findInitialTab();
    // Update only if the calculated initial tab is different from the current active tab
    // or if the current active tab is no longer in the list (and there are tabs)
    const currentActiveTabStillValid =
      activeTab && propTabs.some((t) => t.title === activeTab.title);

    if (
      newInitialTab &&
      (!currentActiveTabStillValid ||
        (defaultValue !== undefined && activeTab?.title !== defaultValue))
    ) {
      setActiveTab(newInitialTab);
    } else if (!newInitialTab && activeTab) {
      // Handle case where all tabs are removed
      setActiveTab(undefined);
    }
  }, [propTabs, defaultValue]); // Rerun when tabs or initial title changes

  return {
    activeTab,
    setActiveTab,
  };
};

/**
 * Custom hook to manage the state for compound component pattern.
 * @param defaultValue - The default value for the active tab (uncontrolled)
 * @param value - The current value for the active tab (controlled)
 * @param onValueChange - Callback when the active value changes
 * @returns An object containing the current activeValue and a function to update it.
 */
export const useTabsCompoundState = (
  defaultValue?: string | number,
  value?: string | number,
  onValueChange?: (value: string | number) => void
) => {
  const [internalValue, setInternalValue] = useState<string | number | null>(
    defaultValue || null
  );

  // Use controlled value if provided, otherwise use internal state
  const activeValue = value !== undefined ? value : internalValue;

  const setActiveValue = (newValue: string | number) => {
    // Only update internal state if not controlled
    if (value === undefined) {
      setInternalValue(newValue);
    }

    // Always call the callback
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return {
    activeValue,
    setActiveValue,
  };
};
