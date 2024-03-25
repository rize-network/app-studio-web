import { Tab } from './Tabs.type';
// TabsView component: Builds a horizontal view with interactive tabs. It manages state for active tabs and renders tab content.
import { TabsViewProps } from './Tabs.props';
import React from 'react';
import { View } from '../../Layout/View/View';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Button } from '../../Button/Button';
// moveSelectedTabToTop function: Reorders tabs by moving the selected tab at the specified index to the first position and updates the active tab state.
import { Text } from '../../Text/Text';
export const TabsView = (props: TabsViewProps) => {
  const { tabs, styles, isActive, setIsActive, tabsState, setTabsState } =
    props;
  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...tabs];
    // isContentActive function: Determines if the content of a passed tab is actively displayed based on the current state.
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    // Horizontal component at root: Sets up the overall layout, takes the full width and available height of the container.
    setTabsState(newTabs);
    // Mapping of tabs to render tab buttons: Iterates over tabs to produce a clickable button for each, applying styles and setting the active state.
    setIsActive(newTabs[0]);
  };
  const isContentActive = (tab: Tab) => {
    return tab.value === tabsState[0].value;
    // Button onClick event: Triggers reordering of tabs and updates the active tab state when a tab gets clicked.
  };
  // Button variant determination: Visually differentiates the active tab from inactive ones using filled or ghost variants.
  return (
    // Shape and cursor style: Sets the shape of the tab buttons to pill-shaped and changes the cursor to pointer on hover for better user experience.
    <Horizontal width="100w" height={'100%'} {...styles?.container}>
      <Horizontal marginBottom={20} {...styles?.headerTabs}>
        {tabs.map((tab, idx) => (
          <Button
            // Text component inside Button: Renders the title text within each tab, with applied styles and active state changes.
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
              // View component for tab content area: Provides a container for displaying the active tab's content.
            }}
            // Conditional rendering of tab content: Renders only the content of the tab that is currently selected by the user.
            variant={isActive.value === tab.value ? 'filled' : 'ghost'}
            shape="pillShaped"
            cursor="pointer"
            isAuto
            {...styles?.tab}
            {...(isActive.value === tab.value ? styles?.activeTab : {})}
          >
            <Text
              {...styles?.title}
              {...(isActive.value === tab.value ? styles?.activeText : {})}
            >
              {tab.title}
            </Text>
          </Button>
        ))}
      </Horizontal>
      <View width={'100%'} height="100%" {...styles?.content}>
        {tabsState.map(
          (tab, idx) =>
            isContentActive(tab) && <View key={idx}>{tab.content}</View>
        )}
      </View>
    </Horizontal>
  );
};
