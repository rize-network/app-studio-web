import { Tab } from './Tabs.type';
import { TabsViewProps } from './Tabs.props';
import React from 'react';
import { View } from 'src/components/Layout/View/View';
import { Button, Text, Horizontal } from 'src/components';

export const TabsView = (props: TabsViewProps) => {
  const { tabs, styles, isActive, setIsActive, tabsState, setTabsState } =
    props;

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...tabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabsState(newTabs);
    setIsActive(newTabs[0]);
  };
  const isContentActive = (tab: Tab) => {
    return tab.value === tabsState[0].value;
  };

  return (
    <Horizontal width="100w" height={'100%'} {...styles?.container}>
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
    </Horizontal>
  );
};
