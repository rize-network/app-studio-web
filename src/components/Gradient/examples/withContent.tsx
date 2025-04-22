import React from 'react';
import { Gradient } from '../Gradient';
import { Vertical } from 'app-studio';
import { Text } from '../../Text/Text';
import { Button } from '../../Button/Button';
import { Center } from 'app-studio';

export const WithContentDemo = () => (
  <Vertical gap={16}>
    <Text fontWeight="500">Gradients with Content</Text>

    <Gradient
      type="linear"
      from="color.blue.600"
      to="color.purple.600"
      height="150px"
      width="100%"
      borderRadius="12px"
    >
      <Center height="100%">
        <Vertical alignItems="center" gap={16}>
          <Text color="white" fontWeight="600" fontSize="24px">
            Welcome to Gradients
          </Text>
          <Button backgroundColor="color.white" color="color.purple.600">
            Get Started
          </Button>
        </Vertical>
      </Center>
    </Gradient>

    <Gradient
      type="radial"
      colors={[
        { color: 'rgba(0, 0, 0, 0.1)', position: '0%' },
        { color: 'rgba(0, 0, 0, 0.7)', position: '100%' },
      ]}
      height="150px"
      width="100%"
      borderRadius="12px"
      views={{
        container: {
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        },
      }}
    >
      <Center height="100%">
        <Text color="white" fontWeight="600" fontSize="24px">
          Overlay on Image
        </Text>
      </Center>
    </Gradient>
  </Vertical>
);
