/**
 * Switch Examples - Design System
 *
 * Showcases the Switch component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { Switch } from '../Switch';
import { Vertical } from '../../../Layout/Vertical/Vertical';
import { Horizontal } from '../../../Layout/Horizontal/Horizontal';
import { Text } from '../../../Text/Text';
import { View } from '../../../Layout/View/View';

export const DesignSystemSwitches = () => (
  <Vertical gap={24}>
    {/* Size Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Size Variants
      </Text>
      <Vertical gap={16}>
        <Horizontal gap={24} alignItems="center">
          <View width="80px">
            <Text>XS</Text>
          </View>
          <Switch size="xs" />
          <Switch size="xs" isChecked />
        </Horizontal>

        <Horizontal gap={24} alignItems="center">
          <View width="80px">
            <Text>SM</Text>
          </View>
          <Switch size="sm" />
          <Switch size="sm" isChecked />
        </Horizontal>

        <Horizontal gap={24} alignItems="center">
          <View width="80px">
            <Text>MD</Text>
          </View>
          <Switch size="md" />
          <Switch size="md" isChecked />
        </Horizontal>

        <Horizontal gap={24} alignItems="center">
          <View width="80px">
            <Text>LG</Text>
          </View>
          <Switch size="lg" />
          <Switch size="lg" isChecked />
        </Horizontal>

        <Horizontal gap={24} alignItems="center">
          <View width="80px">
            <Text>XL</Text>
          </View>
          <Switch size="xl" />
          <Switch size="xl" isChecked />
        </Horizontal>
      </Vertical>
    </View>

    {/* States */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        States
      </Text>
      <Vertical gap={16}>
        <Horizontal gap={24} alignItems="center">
          <View width="120px">
            <Text>Default</Text>
          </View>
          <Switch />
        </Horizontal>

        <Horizontal gap={24} alignItems="center">
          <View width="120px">
            <Text>Checked</Text>
          </View>
          <Switch isChecked />
        </Horizontal>

        <Horizontal gap={24} alignItems="center">
          <View width="120px">
            <Text>Disabled</Text>
          </View>
          <Switch isDisabled />
          <Switch isDisabled isChecked />
        </Horizontal>

        <Horizontal gap={24} alignItems="center">
          <View width="120px">
            <Text>Read-only</Text>
          </View>
          <Switch isReadOnly />
          <Switch isReadOnly isChecked />
        </Horizontal>
      </Vertical>
    </View>

    {/* With Labels */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        With Labels
      </Text>
      <Vertical gap={16}>
        <Switch label="Label on the right (Default)" labelPosition="right" />

        <Switch label="Label on the left" labelPosition="left" />

        <Switch label="Checked with label" isChecked />

        <Switch label="Disabled with label" isDisabled />
      </Vertical>
    </View>

    {/* With Content */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        With Content
      </Text>
      <Vertical gap={16}>
        <Switch
          activeChild={
            <Text color="white" size="xs">
              ON
            </Text>
          }
          inActiveChild={
            <Text color="white" size="xs">
              OFF
            </Text>
          }
          size="md"
        />

        <Switch
          activeChild={
            <Text color="white" size="xs">
              ON
            </Text>
          }
          inActiveChild={
            <Text color="white" size="xs">
              OFF
            </Text>
          }
          size="md"
          isChecked
        />
      </Vertical>
    </View>

    {/* Custom Styling */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Custom Styling
      </Text>
      <Vertical gap={16}>
        <Switch
          views={{
            slider: {
              backgroundColor: 'color.purple.500',
            },
            circle: {
              backgroundColor: 'white',
            },
          }}
          isChecked
        />

        <Switch
          views={{
            slider: {
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: 'color.gray.300',
              backgroundColor: 'transparent',
            },
            circle: {
              backgroundColor: 'color.gray.700',
            },
          }}
        />

        <Switch
          shadow={{
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
          }}
          views={{
            slider: {
              backgroundColor: 'color.blue.500',
              transition: 'all 0.3s ease',
              _hover: {
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
              },
            },
          }}
          isChecked
        />
      </Vertical>
    </View>

    {/* Form Example */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Form Example
      </Text>
      <View
        padding={16}
        backgroundColor="color.gray.50"
        borderRadius="8px"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="color.gray.200"
      >
        <Vertical gap={16}>
          <Text fontWeight="600">Notification Settings</Text>

          <Switch label="Email notifications" isChecked />

          <Switch label="Push notifications" isChecked />

          <Switch label="SMS notifications" />

          <Switch label="Weekly digest" isChecked />
        </Vertical>
      </View>
    </View>
  </Vertical>
);
