import React from 'react';
import { View } from 'app-studio';

/**
 * TableScroll (web) — lets a wide table scroll horizontally instead of being
 * clipped. On web, native CSS overflow handles it.
 */
export const TableScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <View width="100%" style={{ overflowX: 'auto' } as any}>
    {children}
  </View>
);
