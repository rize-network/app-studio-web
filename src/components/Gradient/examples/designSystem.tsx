/**
 * Gradient Examples - Design System
 *
 * Showcases the Gradient component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { Gradient } from '../Gradient';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from 'app-studio';
import { View } from 'app-studio';
import { Card } from '../../Card/Card';
import { Button } from '../../Button/Button';
import { Center } from 'app-studio';

export const DesignSystemGradients = () => {
  return (
    <Vertical gap={32}>
      {/* Basic Gradients */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Basic Gradients
        </Text>
        <Vertical gap={16}>
          <Horizontal gap={16} flexWrap="wrap">
            <Vertical gap={8} width="200px">
              <Text fontSize="14px">Linear Gradient</Text>
              <Gradient
                type="linear"
                from="color.blue.500"
                to="color.purple.500"
                height="100px"
                width="100%"
                borderRadius="8px" // 2 × 4px grid
              />
            </Vertical>

            <Vertical gap={8} width="200px">
              <Text fontSize="14px">Radial Gradient</Text>
              <Gradient
                type="radial"
                from="color.blue.500"
                to="color.purple.500"
                height="100px"
                width="100%"
                borderRadius="8px" // 2 × 4px grid
              />
            </Vertical>

            <Vertical gap={8} width="200px">
              <Text fontSize="14px">Conic Gradient</Text>
              <Gradient
                type="conic"
                colors={[
                  { color: 'color.red.500', position: '0deg' },
                  { color: 'color.yellow.500', position: '90deg' },
                  { color: 'color.green.500', position: '180deg' },
                  { color: 'color.blue.500', position: '270deg' },
                  { color: 'color.red.500', position: '360deg' },
                ]}
                height="100px"
                width="100%"
                borderRadius="8px" // 2 × 4px grid
              />
            </Vertical>
          </Horizontal>
        </Vertical>
      </View>

      {/* Gradient Directions */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Gradient Directions
        </Text>
        <Horizontal gap={16} flexWrap="wrap">
          {['to-right', 'to-bottom', 'to-top-right', '45deg'].map(
            (direction) => (
              <Vertical key={direction} gap={8} width="150px">
                <Text fontSize="14px">{direction}</Text>
                <Gradient
                  type="linear"
                  direction={direction}
                  from="color.blue.500"
                  to="color.purple.500"
                  height="100px"
                  width="100%"
                  borderRadius="8px" // 2 × 4px grid
                />
              </Vertical>
            )
          )}
        </Horizontal>
      </View>

      {/* Multi-color Gradients */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Multi-color Gradients
        </Text>
        <Vertical gap={16}>
          <Vertical gap={8}>
            <Text fontSize="14px">Three-color Linear</Text>
            <Gradient
              type="linear"
              colors={[
                { color: 'color.blue.500', position: '0%' },
                { color: 'color.purple.500', position: '50%' },
                { color: 'color.pink.500', position: '100%' },
              ]}
              height="100px"
              width="100%"
              borderRadius="8px" // 2 × 4px grid
            />
          </Vertical>

          <Vertical gap={8}>
            <Text fontSize="14px">Rainbow</Text>
            <Gradient
              type="linear"
              colors={[
                { color: 'color.red.500', position: '0%' },
                { color: 'color.orange.500', position: '16.67%' },
                { color: 'color.yellow.500', position: '33.33%' },
                { color: 'color.green.500', position: '50%' },
                { color: 'color.blue.500', position: '66.67%' },
                { color: 'color.indigo.500', position: '83.33%' },
                { color: 'color.purple.500', position: '100%' },
              ]}
              height="100px"
              width="100%"
              borderRadius="8px" // 2 × 4px grid
            />
          </Vertical>
        </Vertical>
      </View>

      {/* Animated Gradients */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Animated Gradients
        </Text>
        <Horizontal gap={16} flexWrap="wrap">
          <Vertical gap={8} width="200px">
            <Text fontSize="14px">Animated Linear</Text>
            <Gradient
              type="linear"
              from="color.blue.500"
              to="color.purple.500"
              animate={true}
              animationDuration={5}
              height="100px"
              width="100%"
              borderRadius="8px" // 2 × 4px grid
            />
          </Vertical>

          <Vertical gap={8} width="200px">
            <Text fontSize="14px">Animated Radial</Text>
            <Gradient
              type="radial"
              from="color.blue.500"
              to="color.purple.500"
              animate={true}
              animationDuration={5}
              height="100px"
              width="100%"
              borderRadius="8px" // 2 × 4px grid
            />
          </Vertical>

          <Vertical gap={8} width="200px">
            <Text fontSize="14px">Animated Conic</Text>
            <Gradient
              type="conic"
              colors={[
                { color: 'color.red.500', position: '0deg' },
                { color: 'color.yellow.500', position: '90deg' },
                { color: 'color.green.500', position: '180deg' },
                { color: 'color.blue.500', position: '270deg' },
                { color: 'color.red.500', position: '360deg' },
              ]}
              animate={true}
              animationDuration={8}
              height="100px"
              width="100%"
              borderRadius="8px" // 2 × 4px grid
            />
          </Vertical>
        </Horizontal>
      </View>

      {/* Practical Applications */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Practical Applications
        </Text>
        <Vertical gap={16}>
          {/* Hero Section */}
          <Gradient
            type="linear"
            from="color.blue.600"
            to="color.purple.600"
            height="200px"
            width="100%"
            borderRadius="12px" // 3 × 4px grid
          >
            <Center height="100%">
              <Vertical alignItems="center" gap={16}>
                <Text color="white" fontWeight="600" fontSize="24px">
                  Welcome to Gradients
                </Text>
                <Button
                  backgroundColor="color.white"
                  color="color.purple.600"
                  borderRadius="8px" // 2 × 4px grid
                  paddingLeft="16px" // 4 × 4px grid
                  paddingTop="8px" // 2 × 4px grid
                >
                  Get Started
                </Button>
              </Vertical>
            </Center>
          </Gradient>

          {/* Card with Gradient Header */}
          <Card variant="outlined" shape="rounded" isFullWidth>
            <Gradient
              type="linear"
              from="color.purple.500"
              to="color.pink.500"
              height="80px"
              borderTopLeftRadius="8px" // 2 × 4px grid
              borderTopRightRadius="8px" // 2 × 4px grid
            >
              <Center height="100%">
                <Text color="white" fontWeight="600" fontSize="18px">
                  Card with Gradient Header
                </Text>
              </Center>
            </Gradient>
            <Card.Content>
              <Text>
                This card uses a gradient for its header section, creating a
                visually appealing component.
              </Text>
            </Card.Content>
          </Card>

          {/* Image Overlay */}
          <Gradient
            type="radial"
            colors={[
              { color: 'rgba(0, 0, 0, 0.1)', position: '0%' },
              { color: 'rgba(0, 0, 0, 0.7)', position: '100%' },
            ]}
            height="200px"
            width="100%"
            borderRadius="12px" // 3 × 4px grid
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
              <Text
                color="white"
                fontWeight="600"
                fontSize="24px"
                textShadow="0 2px 4px rgba(0, 0, 0, 0.3)"
              >
                Gradient Overlay on Image
              </Text>
            </Center>
          </Gradient>
        </Vertical>
      </View>
    </Vertical>
  );
};
