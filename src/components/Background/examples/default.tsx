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

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Background Image
      </Text>
      <Background.Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
        height="200px"
        backgroundSize="cover"
        overlay="rgba(0,0,0,0.3)"
        blendMode="multiply"
      >
        <Text color="white" fontSize={18} fontWeight="500">
          Image Background with Overlay
        </Text>
      </Background.Image>
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Background Gradient
      </Text>
      <Background.Gradient
        from="color.blue.500"
        to="color.purple.500"
        height="200px"
        animate={true}
        animationDuration={4}
      >
        <Text color="white" fontSize={18} fontWeight="500">
          Animated Gradient Background
        </Text>
      </Background.Gradient>
    </Vertical>

    <Vertical gap={16}>
      <Text fontSize={14} color="color.gray.600">
        Multi-color Gradient
      </Text>
      <Background.Gradient
        type="radial"
        colors={[
          { color: 'color.red.500', position: '0%' },
          { color: 'color.orange.500', position: '50%' },
          { color: 'color.yellow.500', position: '100%' },
        ]}
        height="200px"
        shape="ellipse"
        position="top-left"
      >
        <Text color="white" fontSize={18} fontWeight="500">
          Radial Multi-color Gradient
        </Text>
      </Background.Gradient>
    </Vertical>
  </Vertical>
);
