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
  defaultValue?: string | number,
  value?: string | number
) => {
  // Helper to extract the identifier (value or title) from a tab
  const getTabId = (tab: Tab) =>
    tab.value !== undefined ? tab.value : tab.title;

  // Find the initial tab based on defaultValue, or default to the first tab.
  const findInitialTab = (): Tab | undefined => {
    if (!propTabs || propTabs.length === 0) {
      return undefined;
    }
    if (defaultValue !== undefined) {
      const foundTab = propTabs.find((tab) => getTabId(tab) === defaultValue);
      if (foundTab) {
        return foundTab;
      }
    }
    return propTabs[0];
  };

  const [internalActiveTab, setInternalActiveTab] = useState<Tab | undefined>(
    findInitialTab()
  );

  // Determine the effective active tab
  // In controlled mode (value provided), find the tab matching value.
  // In uncontrolled mode, use internal state.
  const activeTab =
    value !== undefined
      ? propTabs.find((tab) => getTabId(tab) === value)
      : internalActiveTab;

  const setActiveTab = (tab: Tab) => {
    // Only update internal state if uncontrolled
    if (value === undefined) {
      setInternalActiveTab(tab);
    }
  };

  // Effect to update internal active tab if defaultValue changes or tabs change
  useEffect(() => {
    if (value !== undefined) return; // Skip logic if controlled

    const newInitialTab = findInitialTab();
    const currentActiveTabStillValid =
      internalActiveTab &&
      propTabs.some((t) => getTabId(t) === getTabId(internalActiveTab));

    // If current tab is invalid, or if defaultValue changed and suggests a different tab
    // (Note: The original logic forced reset on defaultValue change, we keep that behavior)
    if (
      newInitialTab &&
      (!currentActiveTabStillValid ||
        (defaultValue !== undefined &&
          internalActiveTab &&
          getTabId(internalActiveTab) !== defaultValue))
    ) {
      setInternalActiveTab(newInitialTab);
    } else if (!newInitialTab && internalActiveTab) {
      setInternalActiveTab(undefined);
    }
  }, [propTabs, defaultValue]); // Remove internalActiveTab dependency to avoid loops, though it shouldn't cause one if guarded

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
