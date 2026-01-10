import React, { useState } from 'react';
import { View, Button, Text } from 'app-studio';
import { Tabs } from '../Tabs';

export const ControlledTabs = () => {
  const [activeTab, setActiveTab] = useState<string | number>('profile');

  const tabs = [
    {
      title: 'Profile',
      value: 'profile',
      content: (
        <View padding={20}>
          <Text fontWeight="600" marginBottom={12} fontSize={18}>
            Profile Settings
          </Text>
          <Text color="color.gray.600">
            Manage your public profile, bio, and avatar.
          </Text>
        </View>
      ),
    },
    {
      title: 'Account',
      value: 'account',
      content: (
        <View padding={20}>
          <Text fontWeight="600" marginBottom={12} fontSize={18}>
            Account Details
          </Text>
          <Text color="color.gray.600">
            Update your email, password, and security preferences.
          </Text>
        </View>
      ),
    },
    {
      title: 'Notifications',
      value: 'notifications',
      content: (
        <View padding={20}>
          <Text fontWeight="600" marginBottom={12} fontSize={18}>
            Notification Preferences
          </Text>
          <Text color="color.gray.600">
            Configure how and when you want to be notified.
          </Text>
        </View>
      ),
    },
  ];

  return (
    <View width="100%">
      <View
        marginBottom={20}
        padding={16}
        backgroundColor="color.blue.50"
        borderRadius={8}
        border="1px dashed"
        borderColor="color.blue.200"
      >
        <Text marginBottom={12}>
          Current Active Value: <strong>{activeTab}</strong>
        </Text>
        <View display="flex" flexDirection="row" gap={10}>
          <Button
            size="small"
            variant={activeTab === 'profile' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('profile')}
          >
            Select Profile
          </Button>
          <Button
            size="small"
            variant={activeTab === 'account' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('account')}
          >
            Select Account
          </Button>
          <Button
            size="small"
            variant={activeTab === 'notifications' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('notifications')}
          >
            Select Notifications
          </Button>
        </View>
      </View>

      <Tabs
        tabs={tabs}
        value={activeTab}
        onTabChange={(tab) => {
          console.log('Tab changed:', tab);
          if (tab.value) setActiveTab(tab.value);
        }}
      />
    </View>
  );
};
