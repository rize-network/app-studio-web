import React from 'react';
import { View, Scroll, Vertical } from 'app-studio';

// Removed use-stick-to-bottom as it's not installed.
// Implementing basic scroll container.

export interface ChatContainerRootProps {
  children: React.ReactNode;
  className?: string; // Ignored
}

export function ChatContainerRoot({ children, className, ...props }: ChatContainerRootProps) {
  return (
    <View
      height="100%"
      width="100%"
      overflowY="auto"
      display="flex"
      flexDirection="column"
      {...props}
    >
      {children}
    </View>
  );
}

export interface ChatContainerContentProps {
  children: React.ReactNode;
  className?: string;
}

export function ChatContainerContent({ children, className, ...props }: ChatContainerContentProps) {
  return (
    <Vertical
      width="100%"
      gap={16} // default gap
      padding="20px"
      {...props}
    >
      {children}
    </Vertical>
  );
}
