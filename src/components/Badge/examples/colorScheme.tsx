import React from 'react';
import { View } from 'src/components';
import { Badge } from '../Badge';

export const ColorSchemeDemo = () => {
  return (
    <View position="relative">
      <Badge content="content" colorScheme={'theme.secondary'} />
    </View>
  );
};
