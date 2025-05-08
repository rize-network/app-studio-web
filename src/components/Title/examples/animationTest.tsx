import React from 'react';
import { View, Animation } from 'app-studio';

/**
 * Test component to verify Animation object works correctly
 */
export const AnimationTest = () => {
  console.log('Animation object:', Animation);
  
  return (
    <View
      width={200}
      height={100}
      backgroundColor="color.blue.500"
      animate={Animation.fadeIn({
        duration: '1s',
        timingFunction: 'ease',
      })}
    >
      Animation Test
    </View>
  );
};
