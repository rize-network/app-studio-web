import React from 'react';
import { Text, Vertical, View } from 'app-studio';
import { Tabs } from '../Tabs';

const EmptyContent = () => <View minHeight={8} />;

export const Default = () => {
  const topTabs = [
    { title: 'Overview', value: 'overview', content: <EmptyContent /> },
    { title: 'Activity', value: 'activity', content: <EmptyContent /> },
    { title: 'Files', value: 'files', content: <EmptyContent /> },
    { title: 'Settings', value: 'settings', content: <EmptyContent /> },
  ];

  const periodTabs = [
    { title: 'Day', value: 'day', content: <EmptyContent /> },
    { title: 'Week', value: 'week', content: <EmptyContent /> },
    { title: 'Month', value: 'month', content: <EmptyContent /> },
    { title: 'Year', value: 'year', content: <EmptyContent /> },
  ];

  const categoryTabs = [
    { title: 'All', value: 'all', content: <EmptyContent /> },
    { title: 'Buttons', value: 'buttons', content: <EmptyContent /> },
    { title: 'Forms', value: 'forms', content: <EmptyContent /> },
    { title: 'Overlays', value: 'overlays', content: <EmptyContent /> },
    { title: 'Feedback', value: 'feedback', content: <EmptyContent /> },
  ];

  return (
    <Vertical gap={28} width="100%" padding={24}>
      <Vertical gap={12}>
        <Text fontSize={12} color="color-gray-500" textTransform="uppercase">
          Underline
        </Text>
        <Tabs
          tabs={topTabs}
          defaultValue="overview"
          variant="underline"
          views={{
            container: { width: '100%' },
            headerTabs: { gap: 36 },
            content: { display: 'none' },
          }}
        />
      </Vertical>

      <Vertical gap={12}>
        <Text fontSize={12} color="color-gray-500" textTransform="uppercase">
          Segmented
        </Text>
        <Tabs
          tabs={periodTabs}
          defaultValue="week"
          variant="segmented"
          views={{
            content: { display: 'none' },
          }}
        />
      </Vertical>

      <Vertical gap={12}>
        <Text fontSize={12} color="color-gray-500" textTransform="uppercase">
          Pill
        </Text>
        <Tabs
          tabs={categoryTabs}
          defaultValue="all"
          variant="pill"
          views={{
            content: { display: 'none' },
          }}
        />
      </Vertical>
    </Vertical>
  );
};
