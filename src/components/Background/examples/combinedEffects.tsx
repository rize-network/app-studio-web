import React from 'react';
import { Background } from '../Background';
import { Button } from '../../Button/Button';
import { Vertical, Center, Horizontal } from 'app-studio';
import { Text } from '../../Text/Text';

export const CombinedEffectsDemo = () => (
  <Vertical gap={32}>
    <Text fontSize={16} fontWeight="600">
      Combined Background Effects
    </Text>

    <Vertical gap={24}>
      <Text fontSize={14} color="color.gray.600">
        Aurora with Interactive Elements
      </Text>
      <Background.Aurora height="400px" showRadialGradient={true}>
        <Center height="100%">
          <Vertical alignItems="center" gap={24}>
            <Text color="white" fontSize={28} fontWeight="600">
              Welcome to the Future
            </Text>
            <Text
              color="white"
              fontSize={16}
              textAlign="center"
              maxWidth="400px"
            >
              Experience the next generation of web interfaces with beautiful
              animated backgrounds
            </Text>

            <Horizontal gap={16} flexWrap="wrap">
              <Button variant="borderMoving" borderMovingDuration={2}>
                Get Started
              </Button>

              <Button
                variant="animatedStroke"
                animatedStrokeAccentColor="white"
                animatedStrokeTextColor="white"
              >
                Learn More
              </Button>
            </Horizontal>
          </Vertical>
        </Center>
      </Background.Aurora>
    </Vertical>

    <Vertical gap={24}>
      <Text fontSize={14} color="color.gray.600">
        Meteors with Content Overlay
      </Text>
      <Background.Meteors number={25} width={600} height={300}>
        <Vertical
          alignItems="center"
          justifyContent="center"
          gap={16}
          height="100%"
        >
          <Text color="white" fontSize={20} fontWeight="600">
            Shooting Stars
          </Text>
          <Button variant="borderMoving" borderMovingDuration={3}>
            Explore
          </Button>
        </Vertical>
      </Background.Meteors>
    </Vertical>

    <Vertical gap={24}>
      <Text fontSize={14} color="color.gray.600">
        Multiple Interactive Elements
      </Text>
      <Horizontal gap={16} flexWrap="wrap" justifyContent="center">
        <Button
          variant="borderMoving"
          borderMovingDuration={1.5}
          borderMovingGradientColors={['#FF6B6B', '#4ECDC4', '#45B7D1']}
        >
          Fast Animation
        </Button>

        <Button
          variant="animatedStroke"
          animatedStrokeAccentColor="color.purple.500"
          animatedStrokeTextColor="color.purple.700"
        >
          Hover Effect
        </Button>

        <Button
          variant="borderMoving"
          borderMovingDuration={3}
          borderMovingGradientColors={['#FFD93D', '#6BCF7F', '#4D96FF']}
        >
          Slow Animation
        </Button>
      </Horizontal>
    </Vertical>
  </Vertical>
);
