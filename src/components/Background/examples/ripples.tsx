import React from 'react';
import { Background } from '../Background';
import { Vertical } from 'app-studio';
import { Text } from '../../Text/Text';

export const RipplesDemo = () => (
  <Vertical gap={16}>
    <Text fontSize={16} fontWeight="600">
      Ripples Background Effect
    </Text>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Default Ripples (5 ripples, medium size)
      </Text>
      <Background.Ripples />
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Large Ripples (slow frequency)
      </Text>
      <Background.Ripples rippleCount={3} maxSize={300} frequency={2} />
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Many Small Ripples (fast frequency)
      </Text>
      <Background.Ripples rippleCount={8} maxSize={100} frequency={5} />
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Custom Colors
      </Text>
      <Background.Ripples
        rippleCount={4}
        maxSize={180}
        frequency={3}
        colors={[
          'rgba(255, 99, 132, 0.6)', // red
          'rgba(54, 162, 235, 0.6)', // blue
          'rgba(255, 205, 86, 0.6)', // yellow
        ]}
      />
    </Vertical>
  </Vertical>
);
