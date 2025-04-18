import React from 'react';
import { Alert } from '../Alert';
import { Vertical } from 'app-studio';
import { Text } from '../../Text/Text';

export const DarkModeDemo = () => {
  return (
    <Vertical gap={24}>
      <Text fontSize={20} fontWeight="bold">
        Light Mode Alerts
      </Text>
      <Vertical gap={16}>
        <Alert
          themeMode="light"
          variant="default"
          title="Default Alert (Light)"
          description="This is a default alert in light mode."
        />
        <Alert
          themeMode="light"
          variant="info"
          title="Info Alert (Light)"
          description="This is an info alert in light mode."
        />
        <Alert
          themeMode="light"
          variant="success"
          title="Success Alert (Light)"
          description="This is a success alert in light mode."
        />
        <Alert
          themeMode="light"
          variant="warning"
          title="Warning Alert (Light)"
          description="This is a warning alert in light mode."
        />
        <Alert
          themeMode="light"
          variant="error"
          title="Error Alert (Light)"
          description="This is an error alert in light mode."
        />
      </Vertical>

      <Text fontSize={20} fontWeight="bold" marginTop={40}>
        Dark Mode Alerts
      </Text>
      <Vertical gap={16}>
        <Alert
          themeMode="dark"
          variant="default"
          title="Default Alert (Dark)"
          description="This is a default alert in dark mode."
        />
        <Alert
          themeMode="dark"
          variant="info"
          title="Info Alert (Dark)"
          description="This is an info alert in dark mode."
        />
        <Alert
          themeMode="dark"
          variant="success"
          title="Success Alert (Dark)"
          description="This is a success alert in dark mode."
        />
        <Alert
          themeMode="dark"
          variant="warning"
          title="Warning Alert (Dark)"
          description="This is a warning alert in dark mode."
        />
        <Alert
          themeMode="dark"
          variant="error"
          title="Error Alert (Dark)"
          description="This is an error alert in dark mode."
        />
      </Vertical>
    </Vertical>
  );
};
