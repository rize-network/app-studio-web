import React from 'react';
import { Center, Text } from 'app-studio';

export function CenterExample() {
  return (
    <Center
      height={160}
      width="100%"
      backgroundColor="color-blue-50"
      borderRadius={12}
    >
      <Text color="color-blue-900">Centered on both axes</Text>
    </Center>
  );
}
