import React from 'react';
import { Text, Vertical } from 'app-studio';

export function TextExample() {
  return (
    <Vertical gap={12}>
      <Text as="h3" fontSize={24} fontWeight="bold">
        Typography, your way.
      </Text>
      <Text color="color-blue-800">
        Theme and palette tokens work here too.
      </Text>
      <Text isItalic>Keep content semantic and readable.</Text>
    </Vertical>
  );
}
