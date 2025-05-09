import React from 'react';
import { View, Vertical } from 'app-studio';

/**
 * Example of direct animation without using Animation object
 */
export const DirectAnimationExample = () => {
  return (
    <Vertical gap={32}>
      <View
        as="h1"
        fontSize={40}
        lineHeight="48px"
        fontWeight="bold"
        animate={{
          from: { opacity: 0 },
          to: { opacity: 1 },
          duration: '1.5s',
        }}
      >
        Direct Fade In Animation
      </View>

      <View
        as="h1"
        fontSize={40}
        lineHeight="48px"
        fontWeight="bold"
        animate={{
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
          duration: '1s',
        }}
      >
        Direct Slide In Animation
      </View>

      <View
        as="h1"
        fontSize={40}
        lineHeight="48px"
        fontWeight="bold"
        animate={{
          from: { transform: 'translateY(0)' },
          '20%': { transform: 'translateY(-30px)' },
          '40%': { transform: 'translateY(0)' },
          '60%': { transform: 'translateY(-15px)' },
          '80%': { transform: 'translateY(0)' },
          to: { transform: 'translateY(0)' },
          duration: '2s',
          iterationCount: '1',
        }}
      >
        Direct Bounce Animation
      </View>
    </Vertical>
  );
};
