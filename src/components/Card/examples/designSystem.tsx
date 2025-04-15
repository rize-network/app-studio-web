/**
 * Card Examples - Design System
 *
 * Showcases the Card component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { Card } from '../Card';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from '../../Text/Text';
import { View } from 'app-studio';
import { Button } from '../../Button/Button';

export const DesignSystemCards = () => (
  <Vertical gap={24}>
    {/* Variant Examples */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Card Variants
      </Text>
      <Horizontal gap={16} alignItems="flex-start" flexWrap="wrap">
        <Card variant="default" width="250px">
          <Card.Header>
            <Text fontWeight="600" fontSize="18px">
              Default Card
            </Text>
          </Card.Header>
          <Card.Content>
            <Text fontSize="14px" color="color.gray.600">
              This is a default card with no border or shadow.
            </Text>
          </Card.Content>
          <Card.Footer>
            <Button size="sm">Action</Button>
          </Card.Footer>
        </Card>

        <Card variant="outlined" width="250px">
          <Card.Header>
            <Text fontWeight="600" fontSize="18px">
              Outlined Card
            </Text>
          </Card.Header>
          <Card.Content>
            <Text fontSize="14px" color="color.gray.600">
              This card has a subtle border to define its boundaries.
            </Text>
          </Card.Content>
          <Card.Footer>
            <Button size="sm">Action</Button>
          </Card.Footer>
        </Card>

        <Card variant="elevated" width="250px">
          <Card.Header>
            <Text fontWeight="600" fontSize="18px">
              Elevated Card
            </Text>
          </Card.Header>
          <Card.Content>
            <Text fontSize="14px" color="color.gray.600">
              This card has a shadow to give it an elevated appearance.
            </Text>
          </Card.Content>
          <Card.Footer>
            <Button size="sm">Action</Button>
          </Card.Footer>
        </Card>
      </Horizontal>
    </View>

    {/* Size Examples */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Card Sizes
      </Text>
      <Vertical gap={16}>
        {['sm', 'md', 'lg'].map((size) => (
          <Card key={size} variant="outlined" size={size as any} width="100%">
            <Text fontWeight="600">{size.toUpperCase()} Card</Text>
            <Text fontSize="14px" color="color.gray.600">
              This card uses the {size} size, which affects its padding.
            </Text>
          </Card>
        ))}
      </Vertical>
    </View>

    {/* Shape Examples */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Card Shapes
      </Text>
      <Horizontal gap={16} alignItems="flex-start" flexWrap="wrap">
        {['sharp', 'rounded', 'pillShaped'].map((shape) => (
          <Card
            key={shape}
            variant="outlined"
            shape={shape as any}
            width="250px"
          >
            <Card.Header>
              <Text fontWeight="600">{shape} Card</Text>
            </Card.Header>
            <Card.Content>
              <Text fontSize="14px" color="color.gray.600">
                This card has {shape === 'sharp' ? 'no' : shape} corners.
              </Text>
            </Card.Content>
          </Card>
        ))}
      </Horizontal>
    </View>

    {/* Custom Styling */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Custom Styling
      </Text>
      <Horizontal gap={16} alignItems="flex-start" flexWrap="wrap">
        <Card
          width="300px"
          views={{
            container: {
              backgroundColor: 'color.blue.50',
              borderRadius: '12px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
            },
            header: {
              backgroundColor: 'color.blue.500',
              padding: '16px',
              borderBottom: 'none',
            },
            content: {
              padding: '20px',
            },
            footer: {
              backgroundColor: 'color.gray.50',
              padding: '16px',
              borderTop: 'none',
            },
          }}
        >
          <Card.Header>
            <Text fontWeight="600" fontSize="18px" color="white">
              Custom Card
            </Text>
          </Card.Header>
          <Card.Content>
            <Text fontSize="14px">
              This card has custom styling applied to all its parts using the
              views prop.
            </Text>
          </Card.Content>
          <Card.Footer>
            <Horizontal justifyContent="flex-end" gap={8}>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button size="sm">Submit</Button>
            </Horizontal>
          </Card.Footer>
        </Card>

        <Card
          width="300px"
          backgroundColor="color.purple.50"
          borderRadius="16px"
          boxShadow="0 4px 20px rgba(79, 70, 229, 0.2)"
          borderLeft="4px solid"
          borderColor="color.purple.500"
        >
          <Card.Header borderBottomColor="color.purple.200">
            <Text fontWeight="600" fontSize="18px" color="color.purple.700">
              Direct Props
            </Text>
          </Card.Header>
          <Card.Content>
            <Text fontSize="14px" color="color.purple.800">
              This card uses direct props for styling instead of the views prop.
            </Text>
          </Card.Content>
          <Card.Footer borderTopColor="color.purple.200">
            <Button
              size="sm"
              backgroundColor="color.purple.500"
              _hover={{ backgroundColor: 'color.purple.600' }}
            >
              Action
            </Button>
          </Card.Footer>
        </Card>
      </Horizontal>
    </View>
  </Vertical>
);
