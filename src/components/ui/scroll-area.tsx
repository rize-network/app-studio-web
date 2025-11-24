import React from 'react';
import { Scroll, View } from 'app-studio';

export const ScrollArea = React.forwardRef<HTMLDivElement, any>(
  ({ className, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        height="100%"
        width="100%"
        overflow="hidden"
        {...props}
      >
        <Scroll
            height="100%"
            width="100%"
            vertical
        >
          {children}
        </Scroll>
      </View>
    );
  }
);
ScrollArea.displayName = 'ScrollArea';

export const ScrollBar = () => null; // app-studio Scroll handles native scrollbars, custom scrollbar might need more work or just native.
