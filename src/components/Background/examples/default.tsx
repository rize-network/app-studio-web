import React from 'react';
import { Background } from '../Background';
import { Vertical } from 'app-studio';
import { Text } from '../../Text/Text';

export const DefaultDemo = () => (
  <Vertical gap={32}>
    <Text fontSize={16} fontWeight="600">
      Background Component Examples
    </Text>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Aurora Background
      </Text>
      <Background.Aurora height="200px" showRadialGradient={true}>
        <Text color="white" fontSize={18} fontWeight="500">
          Aurora Effect Background
        </Text>
      </Background.Aurora>
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Meteors Effect
      </Text>
      <Background.Meteors number={15} />
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Wall Effect
      </Text>
      <Background.Wall rows={15} cols={10} squareSize={40} />
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Particles Effect
      </Text>
      <Background.Particles
        count={30}
        speed="medium"
        shapes={['circle', 'square']}
      />
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Grid Effect
      </Text>
      <Background.Grid gridSize={25} animationSpeed="medium" />
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Ripples Effect
      </Text>
      <Background.Ripples rippleCount={4} maxSize={150} frequency={2} />
    </Vertical>
  </Vertical>
);
