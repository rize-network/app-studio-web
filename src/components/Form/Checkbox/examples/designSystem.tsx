/**
 * Checkbox Examples - Design System
 *
 * Showcases the Checkbox component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { Checkbox } from '../Checkbox';
import { Vertical } from 'app-studio';
import { Text } from 'app-studio';
import { View } from 'app-studio';

export const DesignSystemCheckboxes = () => (
  <Vertical gap={24}>
    {/* Size Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Size Variants
      </Text>
      <Vertical gap={16}>
        <Checkbox size="xs" label="Extra Small Checkbox" />

        <Checkbox size="sm" label="Small Checkbox" />

        <Checkbox size="md" label="Medium Checkbox (Default)" />

        <Checkbox size="lg" label="Large Checkbox" />

        <Checkbox size="xl" label="Extra Large Checkbox" />
      </Vertical>
    </View>

    {/* States */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        States
      </Text>
      <Vertical gap={16}>
        <Checkbox label="Unchecked (Default)" />

        <Checkbox label="Checked" defaultIsSelected />

        <Checkbox label="Indeterminate" isIndeterminate />

        <Checkbox label="Disabled Unchecked" isDisabled />

        <Checkbox label="Disabled Checked" isDisabled defaultIsSelected />

        <Checkbox label="Read-only Unchecked" isReadOnly />

        <Checkbox label="Read-only Checked" isReadOnly defaultIsSelected />

        <Checkbox label="Error State" error="This field is required" />
      </Vertical>
    </View>

    {/* Label Positions */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Label Positions
      </Text>
      <Vertical gap={16}>
        <Checkbox label="Label on the right (Default)" labelPosition="right" />

        <Checkbox label="Label on the left" labelPosition="left" />
      </Vertical>
    </View>

    {/* With Info Text */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        With Info Text
      </Text>
      <Vertical gap={16}>
        <Checkbox
          label="Terms and Conditions"
          infoText="I agree to the terms and conditions of the service"
        />

        <Checkbox
          label="Newsletter Subscription"
          infoText="Receive weekly updates about new products and features"
          defaultIsSelected
        />
      </Vertical>
    </View>

    {/* Custom Styling */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Custom Styling
      </Text>
      <Vertical gap={16}>
        <Checkbox
          label="Primary Theme"
          views={{
            checkbox: {
              backgroundColor: 'theme.primary',
              borderColor: 'theme.primary',
            },
            label: {
              color: 'theme.primary',
              fontWeight: '600',
            },
          }}
          defaultIsSelected
        />

        <Checkbox
          label="Custom Border Radius"
          views={{
            checkbox: {
              borderRadius: '50%',
              borderColor: 'color.purple.400',
              backgroundColor: 'color.purple.500',
            },
            label: {
              color: 'color.purple.700',
            },
          }}
          defaultIsSelected
        />

        <Checkbox
          label="Custom Shadow"
          shadow={{
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
          }}
          views={{
            checkbox: {
              borderRadius: '8px',
              backgroundColor: 'color.blue.500',
              transition: 'all 0.3s ease',
              _hover: {
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                transform: 'scale(1.05)',
              },
            },
          }}
          defaultIsSelected
        />
      </Vertical>
    </View>

    {/* Group Example */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Checkbox Group Example
      </Text>
      <Vertical
        gap={8}
        padding={16}
        backgroundColor="color.gray.50"
        borderRadius="8px"
      >
        <Text fontWeight="600" marginBottom={8}>
          Select your interests:
        </Text>
        <Checkbox label="Technology" defaultIsSelected />
        <Checkbox label="Design" />
        <Checkbox label="Business" />
        <Checkbox label="Marketing" defaultIsSelected />
        <Checkbox label="Finance" />
      </Vertical>
    </View>
  </Vertical>
);
