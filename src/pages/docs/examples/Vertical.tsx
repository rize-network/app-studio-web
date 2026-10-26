import React from 'react';
import { Vertical, Text } from 'app-studio';

export function VerticalExample() {
  return (
    <Vertical
      gap={12}
      padding={24}
      backgroundColor="color-blue-50"
      borderRadius={12}
    >
      <Text fontWeight="bold">A simple vertical stack</Text>
      <Text>Use gap to space children consistently.</Text>
      <Text color="color-blue-800">Compose it with any component.</Text>
    </Vertical>
  );
}
