import { useState, useEffect } from 'react';
import { Tab } from './Tabs.type';

/**
 * Custom hook to manage the state of the active tab.
 * @param propTabs - The array of tab objects provided as props.
 * @param initialTabValue - The optional title of the tab to be initially active.
 * @returns An object containing the current activeTab and a function to update it.
 */
export const useTabsState = (
  propTabs: Tab[],
  initialTabValue?: string | number
) => {
  // Find the initial tab based on initialTabValue, or default to the first tab.
  // Ensure propTabs is not empty before accessing index 0.
  const findInitialTab = (): Tab | undefined => {
    if (!propTabs || propTabs.length === 0) {
      return undefined; // No tabs, no initial active tab
    }
    if (initialTabValue !== undefined) {
      const foundTab = propTabs.find((tab) => tab.title === initialTabValue);
      if (foundTab) {
        return foundTab;
      }
      // Warn if initialTabValue is provided but not found
      // console.warn(
      //   `Tabs: initialTabValue "${initialTabValue}" not found in tabs. Defaulting to the first tab.`
      // );
    }
    return propTabs[0]; // Default to the first tab
  };

  const [activeTab, setActiveTab] = useState<Tab | undefined>(findInitialTab);

  // Effect to update the active tab if the initialTabValue prop changes
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
        (initialTabValue !== undefined && activeTab?.title !== initialTabValue))
    ) {
      setActiveTab(newInitialTab);
    } else if (!newInitialTab && activeTab) {
      // Handle case where all tabs are removed
      setActiveTab(undefined);
    }
  }, [propTabs, initialTabValue]); // Rerun when tabs or initial title changes

  return {
    activeTab,
    setActiveTab,
  };
};
