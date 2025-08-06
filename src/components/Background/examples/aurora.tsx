import React from 'react';
import { Background } from '../Background';
import { Vertical, Center } from 'app-studio';
import { Text } from '../../Text/Text';
import { Button } from '../../Button/Button';

export const AuroraDemo = () => (
  <Vertical gap={32}>
    <Text fontSize={16} fontWeight="600">
      Aurora Background Variations
    </Text>

    <Vertical gap={24}>
      <Text fontSize={14} color="color.gray.600">
        With Radial Gradient
      </Text>
      <Background.Aurora height="300px" showRadialGradient={true}>
        <Center height="100%">
          <Vertical alignItems="center" gap={16}>
            <Text color="white" fontSize={24} fontWeight="600">
              Aurora Background
            </Text>
            <Text color="white" fontSize={16} textAlign="center">
              Beautiful animated gradient effect
            </Text>
            <Button backgroundColor="color.white" color="color.blue.600">
              Get Started
            </Button>
          </Vertical>
        </Center>
      </Background.Aurora>
    </Vertical>

    <Vertical gap={24}>
      <Text fontSize={14} color="color.gray.600">
        Without Radial Gradient
      </Text>
      <Background.Aurora height="200px" showRadialGradient={false}>
        <Center height="100%">
          <Text color="white" fontSize={20} fontWeight="500">
            Full Aurora Effect
          </Text>
        </Center>
      </Background.Aurora>
    </Vertical>

    <Vertical gap={24}>
      <Text fontSize={14} color="color.gray.600">
        Custom Height
      </Text>
      <Background.Aurora height="150px" showRadialGradient={true}>
        <Center height="100%">
          <Text color="white" fontSize={16}>
            Compact Aurora
          </Text>
        </Center>
      </Background.Aurora>
    </Vertical>
  </Vertical>
);
