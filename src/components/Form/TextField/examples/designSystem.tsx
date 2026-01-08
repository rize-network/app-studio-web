/**
 * TextField Examples - Design System
 *
 * Showcases the TextField component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { TextField } from '../TextField';
import { Vertical } from 'app-studio';
import { Text } from 'app-studio';
import { View } from 'app-studio';
import { SearchIcon, UserIcon, LockIcon } from '../../../Icon/Icon';

export const DesignSystemTextFields = () => (
  <Vertical gap={24}>
    {/* Size Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Size Variants
      </Text>
      <Vertical gap={16}>
        <TextField size="xs" placeholder="Extra Small Input" />

        <TextField size="sm" placeholder="Small Input" />

        <TextField size="md" placeholder="Medium Input (Default)" />

        <TextField size="lg" placeholder="Large Input" />

        <TextField size="xl" placeholder="Extra Large Input" />
      </Vertical>
    </View>

    {/* Shape Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Shape Variants
      </Text>
      <Vertical gap={16}>
        <TextField shape="default" placeholder="Default Shape (Rounded)" />

        <TextField shape="square" placeholder="square Corners" />

        <TextField shape="rounded" placeholder="Rounded Corners" />

        <TextField shape="pill" placeholder="Pill Shaped" />
      </Vertical>
    </View>

    {/* Style Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Style Variants
      </Text>
      <Vertical gap={16}>
        <TextField variant="outline" placeholder="Outline Variant" />

        <TextField
          variant="default"
          placeholder="Default Variant (Underline)"
        />

        <TextField
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
        <TextField placeholder="Default State" />

        <TextField placeholder="Disabled State" isDisabled />

        <TextField
          placeholder="Read-only State"
          isReadOnly
          value="This is read-only text"
        />

        <TextField placeholder="Error State" error="This field is required" />

        <TextField
          placeholder="With Helper Text"
          helperText="This is some helpful information"
        />
      </Vertical>
    </View>

    {/* With Icons */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        With Icons
      </Text>
      <Vertical gap={16}>
        <TextField
          placeholder="Search..."
          left={<SearchIcon widthHeight={20} color="color.gray.400" />}
        />

        <TextField
          placeholder="Username"
          left={<UserIcon widthHeight={20} color="color.gray.400" />}
        />

        <TextField
          placeholder="Password"
          left={<LockIcon widthHeight={20} color="color.gray.400" />}
          type="password"
        />

        <TextField
          placeholder="With Left and Right Icons"
          left={<UserIcon widthHeight={20} color="color.gray.400" />}
          right={<SearchIcon widthHeight={20} color="color.gray.400" />}
        />
      </Vertical>
    </View>

    {/* With Labels */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        With Labels
      </Text>
      <Vertical gap={16}>
        <TextField label="Username" placeholder="Enter your username" />

        <TextField label="Email" placeholder="Enter your email" type="email" />

        <TextField
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
      </Vertical>
    </View>

    {/* Custom Styling */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Custom Styling
      </Text>
      <Vertical gap={16}>
        <TextField
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

        <TextField
          placeholder="Custom Border Radius"
          views={{
            container: {
              borderRadius: '16px',
              borderColor: 'color.purple.400',
              backgroundColor: 'color.purple.50',
            },
          }}
        />

        <TextField
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
