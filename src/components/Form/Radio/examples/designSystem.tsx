/**
 * Radio Examples - Design System
 *
 * Showcases the Radio and RadioGroup components following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { Radio, RadioGroup } from '../';
import { Vertical } from 'app-studio';
import { Text } from 'app-studio';
import { View } from 'app-studio';

export const DesignSystemRadios = () => (
  <Vertical gap={24}>
    {/* Size Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Size Variants
      </Text>
      <Vertical gap={16}>
        <Radio size="xs" label="Extra Small Radio" />

        <Radio size="sm" label="Small Radio" />

        <Radio size="md" label="Medium Radio (Default)" />

        <Radio size="lg" label="Large Radio" />

        <Radio size="xl" label="Extra Large Radio" />
      </Vertical>
    </View>

    {/* States */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        States
      </Text>
      <Vertical gap={16}>
        <Radio label="Unchecked (Default)" />

        <Radio label="Checked" defaultIsSelected />

        <Radio label="Disabled Unchecked" isDisabled />

        <Radio label="Disabled Checked" isDisabled defaultIsSelected />

        <Radio label="Read-only Unchecked" isReadOnly />

        <Radio label="Read-only Checked" isReadOnly defaultIsSelected />

        <Radio label="Error State" error="This field is required" />
      </Vertical>
    </View>

    {/* Label Positions */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Label Positions
      </Text>
      <Vertical gap={16}>
        <Radio label="Label on the right (Default)" labelPosition="right" />

        <Radio label="Label on the left" labelPosition="left" />
      </Vertical>
    </View>

    {/* With Info Text */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        With Info Text
      </Text>
      <Vertical gap={16}>
        <Radio
          label="Terms and Conditions"
          infoText="I agree to the terms and conditions of the service"
        />

        <Radio
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
        <Radio
          label="Primary Theme"
          views={{
            radio: {
              borderColor: 'theme-primary',
            },
            label: {
              color: 'theme-primary',
              fontWeight: '600',
            },
          }}
          defaultIsSelected
        />

        <Radio
          label="Custom Border Width"
          views={{
            radio: {
              borderWidth: '3px',
              borderColor: 'color-purple-400',
            },
            label: {
              color: 'color-purple-700',
            },
          }}
          defaultIsSelected
        />

        <Radio
          label="Custom Shadow"
          shadow={{
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
          }}
          views={{
            radio: {
              borderColor: 'color-blue-500',
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

    {/* RadioGroup Examples */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        RadioGroup - Vertical (Default)
      </Text>
      <RadioGroup
        label="Select your favorite fruit"
        name="fruits"
        defaultValue="apple"
        helperText="Choose one option from the list"
      >
        <Radio value="apple" label="Apple" />
        <Radio value="banana" label="Banana" />
        <Radio value="orange" label="Orange" />
        <Radio value="strawberry" label="Strawberry" />
        <Radio value="grape" label="Grape" />
      </RadioGroup>
    </View>

    <View>
      <Text marginBottom={8} fontWeight="600">
        RadioGroup - Horizontal
      </Text>
      <RadioGroup
        label="Select your preferred payment method"
        name="payment"
        defaultValue="credit"
        direction="horizontal"
        spacing={16}
      >
        <Radio value="credit" label="Credit Card" />
        <Radio value="debit" label="Debit Card" />
        <Radio value="paypal" label="PayPal" />
      </RadioGroup>
    </View>

    <View>
      <Text marginBottom={8} fontWeight="600">
        RadioGroup - With Error
      </Text>
      <RadioGroup
        label="Select your gender"
        name="gender"
        error="This field is required"
      >
        <Radio value="male" label="Male" />
        <Radio value="female" label="Female" />
        <Radio value="other" label="Other" />
        <Radio value="prefer-not" label="Prefer not to say" />
      </RadioGroup>
    </View>

    <View>
      <Text marginBottom={8} fontWeight="600">
        RadioGroup - Disabled
      </Text>
      <RadioGroup
        label="Select your subscription plan"
        name="subscription"
        defaultValue="basic"
        isDisabled
      >
        <Radio value="basic" label="Basic" />
        <Radio value="premium" label="Premium" />
        <Radio value="enterprise" label="Enterprise" />
      </RadioGroup>
    </View>

    <View>
      <Text marginBottom={8} fontWeight="600">
        RadioGroup - Custom Styling
      </Text>
      <RadioGroup
        label="Select your experience level"
        name="experience"
        defaultValue="intermediate"
        views={{
          container: {
            backgroundColor: 'color-gray-50',
            padding: 16,
            borderRadius: 8,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'color-gray-200',
          },
          label: {
            color: 'theme-primary',
            fontSize: '18px',
            fontWeight: '700',
          },
          helperText: {
            fontStyle: 'italic',
          },
        }}
        helperText="This will help us customize your experience"
      >
        <Radio value="beginner" label="Beginner" />
        <Radio value="intermediate" label="Intermediate" />
        <Radio value="advanced" label="Advanced" />
        <Radio value="expert" label="Expert" />
      </RadioGroup>
    </View>
  </Vertical>
);
