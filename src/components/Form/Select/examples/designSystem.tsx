/**
 * Select Examples - Design System
 *
 * Showcases the Select component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { Select } from '../Select';
import { Vertical } from 'app-studio';
import { Text } from 'app-studio';
import { View } from 'app-studio';

// Sample options for all examples
const sampleOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
];

// Sample options for categories
const categoryOptions = [
  { label: 'Productivity', value: 'productivity' },
  { label: 'Development', value: 'development' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Finance', value: 'finance' },
];

// Sample options for countries
const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Brazil', value: 'br' },
  { label: 'India', value: 'in' },
  { label: 'China', value: 'cn' },
];

export const DesignSystemSelects = () => (
  <Vertical gap={24}>
    {/* Size Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Size Variants
      </Text>
      <Vertical gap={16}>
        <Select
          size="xs"
          options={sampleOptions}
          placeholder="Extra Small Select"
        />

        <Select size="sm" options={sampleOptions} placeholder="Small Select" />

        <Select
          size="md"
          options={sampleOptions}
          placeholder="Medium Select (Default)"
        />

        <Select size="lg" options={sampleOptions} placeholder="Large Select" />

        <Select
          size="xl"
          options={sampleOptions}
          placeholder="Extra Large Select"
        />
      </Vertical>
    </View>

    {/* Shape Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Shape Variants
      </Text>
      <Vertical gap={16}>
        <Select
          shape="default"
          options={sampleOptions}
          placeholder="Default Shape (Rounded)"
        />

        <Select
          shape="square"
          options={sampleOptions}
          placeholder="square Corners"
        />

        <Select
          shape="rounded"
          options={sampleOptions}
          placeholder="Rounded Corners"
        />

        <Select
          shape="pill"
          options={sampleOptions}
          placeholder="Pill Shaped"
        />
      </Vertical>
    </View>

    {/* Style Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Style Variants
      </Text>
      <Vertical gap={16}>
        <Select
          variant="outline"
          options={sampleOptions}
          placeholder="Outline Variant"
        />

        <Select
          variant="default"
          options={sampleOptions}
          placeholder="Default Variant (Underline)"
        />

        <Select
          variant="none"
          options={sampleOptions}
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
        <Select options={sampleOptions} placeholder="Default State" />

        <Select
          options={sampleOptions}
          placeholder="Disabled State"
          isDisabled
        />

        <Select
          options={sampleOptions}
          placeholder="Read-only State"
          isReadOnly
        />

        <Select
          options={sampleOptions}
          placeholder="Error State"
          error={true}

          // error="This field is required"
        />

        <Select
          options={sampleOptions}
          placeholder="With Helper Text"
          helperText="This is some helpful information"
        />
      </Vertical>
    </View>

    {/* With Labels */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        With Labels
      </Text>
      <Vertical gap={16}>
        <Select
          label="Category"
          options={categoryOptions}
          placeholder="Select a category"
        />

        <Select
          label="Country"
          options={countryOptions}
          placeholder="Select a country"
        />

        <Select
          label="Priority"
          options={[
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ]}
          placeholder="Select priority level"
        />
      </Vertical>
    </View>

    {/* Multi-Select */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Multi-Select
      </Text>
      <Vertical gap={16}>
        <Select
          isMulti
          label="Categories"
          options={categoryOptions}
          placeholder="Select multiple categories"
        />

        <Select
          isMulti
          label="Countries"
          options={countryOptions}
          placeholder="Select multiple countries"
        />
      </Vertical>
    </View>

    {/* Custom Styling */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Custom Styling
      </Text>
      <Vertical gap={16}>
        <Select
          options={sampleOptions}
          placeholder="Primary Theme"
          views={{
            selectBox: {
              borderColor: 'theme-primary',
              borderWidth: '2px',
            },
            label: {
              color: 'theme-primary',
              fontWeight: '600',
            },
            text: {
              color: 'theme-primary',
            },
          }}
        />

        <Select
          options={sampleOptions}
          placeholder="Custom Border Radius"
          views={{
            selectBox: {
              borderRadius: '16px',
              borderColor: 'color-purple-400',
              backgroundColor: 'color-purple-50',
            },
            dropDown: {
              borderRadius: '16px',
              borderColor: 'color-purple-400',
            },
          }}
        />

        <Select
          options={sampleOptions}
          placeholder="Custom Shadow"
          variant="none"
          shadow={{
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
          }}
          views={{
            selectBox: {
              borderRadius: '8px',
              backgroundColor: 'color-white',
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
