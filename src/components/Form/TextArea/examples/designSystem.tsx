/**
 * TextArea Examples - Design System
 *
 * Showcases the TextArea component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { TextArea } from '../TextArea';
import { Vertical } from 'app-studio';
import { Text } from 'app-studio';
import { View } from 'app-studio';

export const DesignSystemTextAreas = () => (
  <Vertical gap={24}>
    {/* Size Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Size Variants
      </Text>
      <Vertical gap={16}>
        <TextArea size="xs" placeholder="Extra Small TextArea" />

        <TextArea size="sm" placeholder="Small TextArea" />

        <TextArea size="md" placeholder="Medium TextArea (Default)" />

        <TextArea size="lg" placeholder="Large TextArea" />

        <TextArea size="xl" placeholder="Extra Large TextArea" />
      </Vertical>
    </View>

    {/* Shape Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Shape Variants
      </Text>
      <Vertical gap={16}>
        <TextArea shape="default" placeholder="Default Shape (Rounded)" />

        <TextArea shape="square" placeholder="square Corners" />

        <TextArea shape="rounded" placeholder="Rounded Corners" />
      </Vertical>
    </View>

    {/* Style Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Style Variants
      </Text>
      <Vertical gap={16}>
        <TextArea variant="outline" placeholder="Outline Variant" />

        <TextArea variant="default" placeholder="Default Variant (Underline)" />

        <TextArea
          variant="none"
          placeholder="No Border Variant"
          shadow={{
            boxShadow:
              '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
          }}
        />
      </Vertical>
    </View>

    {/* States */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        States
      </Text>
      <Vertical gap={16}>
        <TextArea placeholder="Default State" />

        <TextArea placeholder="Disabled State" isDisabled />

        <TextArea
          placeholder="Read-only State"
          isReadOnly
          value="This is read-only text that cannot be edited. It demonstrates how the TextArea component appears when in a read-only state."
        />

        <TextArea
          placeholder="Error State"
          error={true}
          //error="This field is required"
        />

        <TextArea
          placeholder="With Helper Text"
          helperText="This is some helpful information about this field"
        />
      </Vertical>
    </View>

    {/* With Labels */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        With Labels
      </Text>
      <Vertical gap={16}>
        <TextArea label="Comments" placeholder="Enter your comments" />

        <TextArea label="Feedback" placeholder="Please provide your feedback" />

        <TextArea label="Description" placeholder="Describe your experience" />
      </Vertical>
    </View>

    {/* Rows and Columns */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Rows and Columns
      </Text>
      <Vertical gap={16}>
        <TextArea label="Small Area" placeholder="2 rows" maxRows={2} />

        <TextArea label="Medium Area" placeholder="4 rows" maxRows={4} />

        <TextArea label="Large Area" placeholder="6 rows" maxRows={6} />
      </Vertical>
    </View>

    {/* Custom Styling */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Custom Styling
      </Text>
      <Vertical gap={16}>
        <TextArea
          placeholder="Primary Theme"
          views={{
            container: {
              borderColor: 'theme.primary',
              borderWidth: '2px',
            },
            label: {
              color: 'theme.primary',
              fontWeight: '600',
            },
            field: {
              color: 'theme.primary',
            },
          }}
        />

        <TextArea
          placeholder="Custom Border Radius"
          views={{
            container: {
              borderRadius: '16px',
              borderColor: 'color.purple.400',
              backgroundColor: 'color.purple.50',
            },
          }}
        />

        <TextArea
          placeholder="Custom Shadow"
          variant="none"
          shadow={{
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
          }}
          views={{
            container: {
              borderRadius: '8px',
              backgroundColor: 'color.white',
              transition: 'all 0.3s ease',
              _hover: {
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(-2px)',
              },
            },
          }}
        />
      </Vertical>
    </View>
  </Vertical>
);
