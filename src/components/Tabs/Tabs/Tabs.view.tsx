import { Tab } from './Tabs.type';
import { TabsViewProps } from './Tabs.props';
import React from 'react';
import { View } from '../../Layout/View/View';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';
// Defines a functional component 'TabsView' with props of type 'TabsViewProps'.
export const TabsView = (props: TabsViewProps) => {
  // Destructures 'tabs', 'styles', 'isActive', 'setIsActive', 'tabsState', and 'setTabsState' from the component props.
  const { tabs, styles, isActive, setIsActive, tabsState, setTabsState } =
    props;
  // Declares a function 'moveSelectedTabToTop' that takes an index and modifies the tabs order.
  const moveSelectedTabToTop = (idx: number) => {
    // Creates a copy of the 'tabs' array from props to be altered.
    const newTabs = [...tabs];
    // Removes the tab at the provided index, effectively selecting this tab.
    const selectedTab = newTabs.splice(idx, 1);
    // Places the selected tab at the start of the 'newTabs' array.
    newTabs.unshift(selectedTab[0]);
    // Updates the state with the reordered tabs.
    setTabsState(newTabs);
    // Sets the active tab to the first tab in the 'newTabs' array.
    setIsActive(newTabs[0]);
  };
  // Defines a function 'isContentActive' that checks if the given tab's content is to be displayed.
  const isContentActive = (tab: Tab) => {
    // Returns a boolean indicating if the given tab is identical to the first tab in 'tabsState'.
    return tab.value === tabsState[0].value;
  };
  return (
    <Vertical width="100w" height={'100%'} {...styles?.container}>
      <Horizontal marginBottom={20} {...styles?.headerTabs}>
        {tabs.map((tab, idx) => (
          <Button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
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
    </Vertical>
  );
};
