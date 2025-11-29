/**
 * Toast Examples - Design System
 *
 * Showcases the Toast component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from 'app-studio';
import { Vertical } from 'app-studio';
import { Text } from 'app-studio';
import { View } from 'app-studio';
import { Toast } from '../Toast';

export const DesignSystemToast = () => {
  // Handler for action buttons
  const handleAction = () => {
    Toast.success('Action Completed', 'The action was performed successfully.');
  };

  return (
    <Vertical gap={32}>
      {/* Toast Variants */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Toast Variants
        </Text>
        <Horizontal gap={12}>
          <Button
            onClick={() =>
              Toast.info(
                'Information',
                'This is an informational message following the design system guidelines.',
                {
                  position: 'top-right',
                }
              )
            }
          >
            Info Toast
          </Button>

          <Button
            onClick={() =>
              Toast.success(
                'Success',
                'Your action was completed successfully following the design system guidelines.',
                {
                  position: 'top-right',
                }
              )
            }
          >
            Success Toast
          </Button>

          <Button
            onClick={() =>
              Toast.warning(
                'Warning',
                'Please be careful with this action following the design system guidelines.',
                {
                  position: 'top-right',
                }
              )
            }
          >
            Warning Toast
          </Button>

          <Button
            onClick={() =>
              Toast.error(
                'Error',
                'An error occurred while processing your request following the design system guidelines.',
                {
                  position: 'top-right',
                }
              )
            }
          >
            Error Toast
          </Button>
        </Horizontal>
      </View>

      {/* Toast Positions */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Toast Positions
        </Text>
        <Horizontal gap={12} flexWrap="wrap">
          <Button
            onClick={() =>
              Toast.info(
                'Top Position',
                'This toast appears at the top of the screen.',
                {
                  position: 'top',
                }
              )
            }
          >
            Top
          </Button>

          <Button
            onClick={() =>
              Toast.info(
                'Top Right Position',
                'This toast appears at the top right of the screen.',
                {
                  position: 'top-right',
                }
              )
            }
          >
            Top Right
          </Button>

          <Button
            onClick={() =>
              Toast.info(
                'Top Left Position',
                'This toast appears at the top left of the screen.',
                {
                  position: 'top-left',
                }
              )
            }
          >
            Top Left
          </Button>

          <Button
            onClick={() =>
              Toast.info(
                'Bottom Position',
                'This toast appears at the bottom of the screen.',
                {
                  position: 'bottom',
                }
              )
            }
          >
            Bottom
          </Button>

          <Button
            onClick={() =>
              Toast.info(
                'Bottom Right Position',
                'This toast appears at the bottom right of the screen.',
                {
                  position: 'bottom-right',
                }
              )
            }
          >
            Bottom Right
          </Button>

          <Button
            onClick={() =>
              Toast.info(
                'Bottom Left Position',
                'This toast appears at the bottom left of the screen.',
                {
                  position: 'bottom-left',
                }
              )
            }
          >
            Bottom Left
          </Button>
        </Horizontal>
      </View>

      {/* Toast Durations */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Toast Durations
        </Text>
        <Horizontal gap={12}>
          <Button
            onClick={() =>
              Toast.info(
                'Short Duration',
                'This toast will disappear in 2 seconds.',
                {
                  duration: 2000,
                  position: 'top-right',
                }
              )
            }
          >
            2 Seconds
          </Button>

          <Button
            onClick={() =>
              Toast.info(
                'Default Duration',
                'This toast will disappear in 5 seconds (default).',
                {
                  position: 'top-right',
                }
              )
            }
          >
            5 Seconds (Default)
          </Button>

          <Button
            onClick={() =>
              Toast.info(
                'Long Duration',
                'This toast will disappear in 10 seconds.',
                {
                  duration: 10000,
                  position: 'top-right',
                }
              )
            }
          >
            10 Seconds
          </Button>

          <Button
            onClick={() =>
              Toast.info(
                'Persistent Toast',
                'This toast will not auto-dismiss. Click the X to dismiss it.',
                {
                  duration: 0, // Set to 0 to make it persistent
                  position: 'top-right',
                }
              )
            }
          >
            Persistent
          </Button>
        </Horizontal>
      </View>

      {/* Toast with Actions */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Toast with Actions
        </Text>
        <Horizontal gap={12}>
          <Button
            onClick={() =>
              Toast.success(
                'Item Deleted',
                'The item has been successfully deleted.',
                {
                  action: handleAction,
                  actionText: 'Undo',
                  position: 'top-right',
                }
              )
            }
          >
            With Undo Action
          </Button>

          <Button
            onClick={() =>
              Toast.error(
                'Failed to Save',
                'There was an error saving your changes.',
                {
                  action: handleAction,
                  actionText: 'Retry',
                  position: 'top-right',
                }
              )
            }
          >
            With Retry Action
          </Button>
        </Horizontal>
      </View>

      {/* Custom Styled Toast */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Custom Styled Toast
        </Text>
        <Horizontal gap={12}>
          <Button
            onClick={() =>
              Toast.info(
                'Custom Styled Toast',
                'This toast has custom styling following the design system.',
                {
                  position: 'top-right',
                  views: {
                    container: {
                      backgroundColor: 'color.purple.50',
                      borderColor: 'color.purple.300',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                    title: {
                      color: 'color.purple.700',
                      fontSize: '18px',
                      fontFamily:
                        'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    },
                    description: {
                      color: 'color.purple.600',
                      fontFamily:
                        'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    },
                  },
                }
              )
            }
          >
            Custom Styled Toast
          </Button>

          <Button
            onClick={() =>
              Toast.success(
                'No Close Button',
                'This toast does not have a close button.',
                {
                  isClosable: false,
                  position: 'top-right',
                }
              )
            }
          >
            No Close Button
          </Button>

          <Button
            onClick={() =>
              Toast.info('No Icon', 'This toast does not display an icon.', {
                showIcon: false,
                position: 'top-right',
              })
            }
          >
            No Icon
          </Button>
        </Horizontal>
      </View>

      {/* Custom Render Toast */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Custom Render Toast
        </Text>
        <Horizontal gap={12}>
          <Button
            onClick={() => {
              Toast.success(
                'Custom Render',
                'This toast uses a custom render function',
                {
                  position: 'top-right',
                  render: ({ onClose }) => (
                    <Vertical
                      backgroundColor="color.purple.100"
                      borderColor="color.purple.300"
                      borderWidth="1px"
                      borderStyle="solid"
                      borderRadius="8px"
                      padding="16px"
                      boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
                      width="100%"
                      maxWidth="400px"
                    >
                      <Text size="lg" fontWeight="600" color="color.purple.800">
                        Custom Design System Toast
                      </Text>
                      <Text
                        size="sm"
                        color="color.purple.700"
                        marginTop="8px"
                        lineHeight="1.5"
                      >
                        This toast is completely custom rendered following the
                        design system guidelines!
                      </Text>
                      <Horizontal justifyContent="flex-end" marginTop="12px">
                        <Button size="sm" onClick={onClose}>
                          Dismiss
                        </Button>
                      </Horizontal>
                    </Vertical>
                  ),
                }
              );
            }}
          >
            Custom Render Toast
          </Button>
        </Horizontal>
      </View>
    </Vertical>
  );
};
