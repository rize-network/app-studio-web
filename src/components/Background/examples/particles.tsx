import React from 'react';
import { Background } from '../Background';
import { Vertical } from 'app-studio';
import { Text } from 'app-studio';

export const ParticlesDemo = () => (
  <Vertical gap={16}>
    <Text fontSize={16} fontWeight="600">
      Particles Background Effect
    </Text>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Default Particles (50 circles, medium speed)
      </Text>
      <Background.Particles />
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Mixed Shapes (circles, squares, triangles)
      </Text>
      <Background.Particles
        count={40}
        speed="medium"
        shapes={['circle', 'square', 'triangle']}
      />
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Fast Moving Circles
      </Text>
      <Background.Particles count={30} speed="fast" shapes={['circle']} />
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Custom Colors & Slow Speed
      </Text>
      <Background.Particles
        count={25}
        speed="slow"
        shapes={['square']}
        colors={[
          'rgb(255, 99, 132)', // red
          'rgb(54, 162, 235)', // blue
          'rgb(255, 205, 86)', // yellow
          'rgb(75, 192, 192)', // teal
        ]}
      />
    </Vertical>
  </Vertical>
);
