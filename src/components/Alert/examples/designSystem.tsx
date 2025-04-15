/**
 * Alert Examples - Design System
 *
 * Showcases the Alert component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { Alert } from '../Alert';
import { Vertical } from 'app-studio';
import { Text } from '../../Text/Text';
import { View } from 'app-studio';
import { EditIcon } from '../../Icon/Icon';

export const DesignSystemAlerts = () => (
  <Vertical gap={24}>
    {/* Variant Examples */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Alert Variants
      </Text>
      <Vertical gap={16}>
        <Alert
          variant="default"
          title="Default Alert"
          description="This is a default alert with neutral styling."
        />

        <Alert
          variant="info"
          title="Information"
          description="This alert provides helpful information to the user."
        />

        <Alert
          variant="success"
          title="Success"
          description="The operation was completed successfully."
        />

        <Alert
          variant="warning"
          title="Warning"
          description="This action might have some consequences."
        />

        <Alert
          variant="error"
          title="Error"
          description="Something went wrong. Please try again."
        />
      </Vertical>
    </View>

    {/* Custom Icon Example */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Custom Icon
      </Text>
      <Alert
        variant="info"
        title="Custom Icon Alert"
        description="This alert uses a custom icon instead of the default one."
        icon={<EditIcon size={20} color="color.blue.500" />}
      />
    </View>

    {/* Custom Styling Example */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Custom Styling
      </Text>
      <Alert
        title="Custom Styled Alert"
        description="This alert has custom styling applied to it."
        views={{
          container: {
            backgroundColor: 'color.purple.50',
            borderColor: 'color.purple.200',
            boxShadow: '0 2px 8px rgba(124, 58, 237, 0.1)',
            borderRadius: '12px',
            borderLeftWidth: '4px',
            borderRightWidth: '1px',
            borderTopWidth: '1px',
            borderBottomWidth: '1px',
          },
          title: {
            color: 'color.purple.700',
            fontSize: '18px',
            fontWeight: '600',
          },
          description: {
            color: 'color.purple.600',
          },
          icon: {
            color: 'color.purple.500',
          },
        }}
      />
    </View>

    {/* Rich Content Example */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Rich Content
      </Text>
      <Alert
        variant="info"
        title="Alert with Rich Content"
        description={
          <Vertical gap={8}>
            <Text>
              This alert contains rich content with multiple paragraphs:
            </Text>
            <Text>• First item in the list</Text>
            <Text>• Second item in the list</Text>
            <Text>
              • Third item with{' '}
              <Text as="span" fontWeight="600">
                emphasized
              </Text>{' '}
              text
            </Text>
          </Vertical>
        }
      />
    </View>
  </Vertical>
);
