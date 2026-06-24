import React from 'react';
import { ScrollView } from 'react-native';

/**
 * TableScroll (React Native) — a wide table (cells with a sensible minimum
 * width) would otherwise be clipped at the screen edge. Wrap it in a horizontal
 * ScrollView so all columns are reachable.
 */
export const TableScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ minWidth: '100%' }}
  >
    {children}
  </ScrollView>
);
