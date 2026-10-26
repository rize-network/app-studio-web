import React from 'react';
import { Horizontal, View } from 'app-studio';

export function HorizontalExample() {
  return (
    <Horizontal gap={12} flexWrap="wrap">
      {['Build', 'Compose', 'Ship'].map((label) => (
        <View
          key={label}
          padding={16}
          backgroundColor="color-blue-50"
          borderRadius={8}
        >
          {label}
        </View>
      ))}
    </Horizontal>
  );
}
