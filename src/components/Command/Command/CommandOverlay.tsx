import React from 'react';
import { View } from 'app-studio';

/**
 * CommandOverlay (web) — full-screen fixed backdrop that centers the palette.
 * Clicking the backdrop (but not the palette) closes.
 */
export const CommandOverlay: React.FC<{
  onClose?: () => void;
  children: React.ReactNode;
  [key: string]: any;
}> = ({ onClose, children, ...props }) => (
  <View
    position="fixed"
    top={0}
    left={0}
    right={0}
    bottom={0}
    display="flex"
    alignItems="center"
    justifyContent="center"
    backgroundColor="color-dark-50-240"
    zIndex={9999}
    onClick={(e: any) => {
      if (e.target === e.currentTarget) onClose?.();
    }}
    {...props}
  >
    {children}
  </View>
);
