import React from 'react';
import { Card } from '../Card';
import { Vertical, Horizontal, Text, View, useTheme } from 'app-studio';
import { Button } from '../../Button/Button';

export const DesignSystemCards = () => {
  const { themeMode } = useTheme();
  const secondaryTextColor =
    themeMode === 'light' ? 'color-gray-600' : 'color-gray-400';

  return (
    <Vertical gap={24}>
      {/* Variant Examples */}
      <View>
        <Text marginBottom={8} fontWeight="600" color="theme-primary">
          Card Variants
        </Text>
        <Horizontal gap={16} alignItems="flex-start" flexWrap="wrap">
          <Card variant="default" width="250px">
            <Card.Header>
              <Text fontWeight="600" fontSize="18px" color="theme-primary">
                Default Card
              </Text>
            </Card.Header>
            <Card.Content>
              <Text fontSize="14px" color={secondaryTextColor}>
                This is a default card with no border or shadow.
              </Text>
            </Card.Content>
            <Card.Footer>
              <Button size="sm">Action</Button>
            </Card.Footer>
          </Card>

          <Card variant="outlined" width="250px">
            <Card.Header>
              <Text fontWeight="600" fontSize="18px" color="theme-primary">
                Outlined Card
              </Text>
            </Card.Header>
            <Card.Content>
              <Text fontSize="14px" color={secondaryTextColor}>
                This card has a subtle border to define its boundaries.
              </Text>
            </Card.Content>
            <Card.Footer>
              <Button size="sm">Action</Button>
            </Card.Footer>
          </Card>

          <Card variant="elevated" width="250px">
            <Card.Header>
              <Text fontWeight="600" fontSize="18px" color="theme-primary">
                Elevated Card
              </Text>
            </Card.Header>
            <Card.Content>
              <Text fontSize="14px" color={secondaryTextColor}>
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
        <Text marginBottom={8} fontWeight="600" color="theme-primary">
          Card Sizes
        </Text>
        <Vertical gap={16}>
          {['sm', 'md', 'lg'].map((size) => (
            <Card key={size} variant="outlined" size={size as any} width="100%">
              <Text fontWeight="600" color="theme-primary">
                {size.toUpperCase()} Card
              </Text>
              <Text fontSize="14px" color={secondaryTextColor}>
                This card uses the {size} size, which affects its padding.
              </Text>
            </Card>
          ))}
        </Vertical>
      </View>

      {/* Shape Examples */}
      <View>
        <Text marginBottom={8} fontWeight="600" color="theme-primary">
          Card Shapes
        </Text>
        <Horizontal gap={16} alignItems="flex-start" flexWrap="wrap">
          {['square', 'rounded', 'pill'].map((shape) => (
            <Card
              key={shape}
              variant="outlined"
              shape={shape as any}
              width="250px"
            >
              <Card.Header>
                <Text fontWeight="600" color="theme-primary">
                  {shape} Card
                </Text>
              </Card.Header>
              <Card.Content>
                <Text fontSize="14px" color={secondaryTextColor}>
                  This card has {shape === 'square' ? 'no' : shape} corners.
                </Text>
              </Card.Content>
            </Card>
          ))}
        </Horizontal>
      </View>

      {/* Custom Styling */}
      <View>
        <Text marginBottom={8} fontWeight="600" color="theme-primary">
          Custom Styling
        </Text>
        <Horizontal gap={16} alignItems="flex-start" flexWrap="wrap">
          <Card
            width="300px"
            views={{
              container: {
                backgroundColor:
                  themeMode === 'light' ? 'color-blue-50' : 'color-gray-800',
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                borderColor:
                  themeMode === 'light' ? 'color-blue-200' : 'color-blue-500',
                borderWidth: 1,
              },
              header: {
                backgroundColor: 'theme-primary',
                padding: '16px',
                borderBottom: 'none',
              },
              content: {
                padding: '20px',
              },
              footer: {
                padding: '16px',
                borderTopOffset: 1,
                borderTopStyle: 'solid',
                borderTopColor:
                  themeMode === 'light' ? 'color-blue-100' : 'color-gray-700',
              },
            }}
          >
            <Card.Header>
              <Text fontWeight="600" fontSize="18px" color="color-white">
                Custom Card
              </Text>
            </Card.Header>
            <Card.Content>
              <Text
                fontSize="14px"
                color={
                  themeMode === 'light' ? 'color-gray-800' : 'color-gray-200'
                }
              >
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
        </Horizontal>
      </View>
    </Vertical>
  );
};
