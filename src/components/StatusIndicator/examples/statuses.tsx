import React from 'react';
import { View } from 'app-studio';
import { StatusIndicator } from '../StatusIndicator';

export const StatusVariants = () => (
  <View gap={8}>
    <StatusIndicator label="Info" status="info" />
    <StatusIndicator label="Success" status="success" />
    <StatusIndicator label="Warning" status="warning" />
    <StatusIndicator label="Error" status="error" />
  </View>
);
