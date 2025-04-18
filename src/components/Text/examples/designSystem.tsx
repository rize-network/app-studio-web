/**
 * Text Examples - Design System
 *
 * Showcases the Text component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 */

import React from 'react';
import { Text } from '../Text';
import { Vertical } from 'app-studio';
import { View } from 'app-studio';

export const DesignSystemText = () => (
  <Vertical gap={32}>
    {/* Headings */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Typography - Headings
      </Text>
      <Vertical gap={16}>
        <Text heading="h1">Heading 1</Text>
        <Text heading="h2">Heading 2</Text>
        <Text heading="h3">Heading 3</Text>
        <Text heading="h4">Heading 4</Text>
        <Text heading="h5">Heading 5</Text>
        <Text heading="h6">Heading 6</Text>
      </Vertical>
    </View>

    {/* Text Sizes */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Typography - Text Sizes
      </Text>
      <Vertical gap={8}>
        <Text size="xs">Extra Small (xs) - 12px</Text>
        <Text size="sm">Small (sm) - 14px</Text>
        <Text size="md">Medium (md) - 16px (default)</Text>
        <Text size="lg">Large (lg) - 18px</Text>
        <Text size="xl">Extra Large (xl) - 20px</Text>
      </Vertical>
    </View>

    {/* Font Weights */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Typography - Font Weights
      </Text>
      <Vertical gap={8}>
        <Text weight="hairline">Hairline (100)</Text>
        <Text weight="thin">Thin (200)</Text>
        <Text weight="light">Light (300)</Text>
        <Text weight="normal">Normal (400) - Default</Text>
        <Text weight="medium">Medium (500)</Text>
        <Text weight="semiBold">Semi Bold (600)</Text>
        <Text weight="bold">Bold (700)</Text>
        <Text weight="extraBold">Extra Bold (800)</Text>
        <Text weight="black">Black (900)</Text>
      </Vertical>
    </View>

    {/* Text Styles */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Typography - Text Styles
      </Text>
      <Vertical gap={8}>
        <Text isItalic>Italic Text</Text>
        <Text isUnderlined>Underlined Text</Text>
        <Text isStriked>Strikethrough Text</Text>
        <Text>
          Text with <Text isSub>subscript</Text> elements
        </Text>
        <Text>
          Text with <Text isSup>superscript</Text> elements
        </Text>
        <Text maxLines={2}>
          This is a long text that will be truncated after 2 lines. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
          aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis
          nisl.
        </Text>
      </Vertical>
    </View>

    {/* Semantic Text */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Typography - Semantic Text
      </Text>
      <Vertical gap={16}>
        <View padding={16} backgroundColor="color.gray.50" borderRadius="8px">
          <Vertical gap={8}>
            <Text color="color.gray.900" fontWeight="semiBold">
              Primary Text
            </Text>
            <Text color="color.gray.700">Secondary Text</Text>
            <Text color="color.gray.500" size="sm">
              Tertiary Text
            </Text>
            <Text color="color.gray.400" size="xs">
              Disabled Text
            </Text>
          </Vertical>
        </View>

        <View padding={16} backgroundColor="color.blue.50" borderRadius="8px">
          <Vertical gap={8}>
            <Text color="color.blue.900" fontWeight="semiBold">
              Info Heading
            </Text>
            <Text color="color.blue.700">Info Text</Text>
            <Text color="color.blue.500" size="sm">
              Info Details
            </Text>
          </Vertical>
        </View>

        <View padding={16} backgroundColor="color.green.50" borderRadius="8px">
          <Vertical gap={8}>
            <Text color="color.green.900" fontWeight="semiBold">
              Success Heading
            </Text>
            <Text color="color.green.700">Success Text</Text>
            <Text color="color.green.500" size="sm">
              Success Details
            </Text>
          </Vertical>
        </View>

        <View padding={16} backgroundColor="color.red.50" borderRadius="8px">
          <Vertical gap={8}>
            <Text color="color.red.900" fontWeight="semiBold">
              Error Heading
            </Text>
            <Text color="color.red.700">Error Text</Text>
            <Text color="color.red.500" size="sm">
              Error Details
            </Text>
          </Vertical>
        </View>
      </Vertical>
    </View>
  </Vertical>
);
