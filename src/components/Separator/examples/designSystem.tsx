/**
 * Separator Examples - Design System
 *
 * Showcases the Separator component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { Separator } from '../Separator';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from '../../Text/Text';
import { View } from 'app-studio';
import { Card } from '../../Card/Card';

export const DesignSystemSeparator = () => {
  return (
    <Vertical gap={32}>
      {/* Basic Separators */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Basic Separators
        </Text>
        <Vertical
          gap={16}
          backgroundColor="white"
          padding={16}
          borderRadius="8px"
        >
          <Text>
            This is content above the separator. The separator creates a visual
            distinction between content sections.
          </Text>
          <Separator spacing="8px" />
          <Text>
            This is content below the separator. Notice how it helps organize
            the content into distinct sections.
          </Text>
        </Vertical>
      </View>

      {/* Separator Variants */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Separator Variants
        </Text>
        <Vertical
          gap={16}
          backgroundColor="white"
          padding={16}
          borderRadius="8px"
        >
          <View>
            <Text marginBottom={4} fontSize="14px">
              Solid (Default)
            </Text>
            <Separator variant="solid" spacing="8px" />
          </View>

          <View>
            <Text marginBottom={4} fontSize="14px">
              Dashed
            </Text>
            <Separator variant="dashed" spacing="8px" />
          </View>

          <View>
            <Text marginBottom={4} fontSize="14px">
              Dotted
            </Text>
            <Separator variant="dotted" spacing="8px" />
          </View>
        </Vertical>
      </View>

      {/* Separator Thicknesses */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Separator Thicknesses
        </Text>
        <Vertical
          gap={16}
          backgroundColor="white"
          padding={16}
          borderRadius="8px"
        >
          <View>
            <Text marginBottom={4} fontSize="14px">
              Thin (1px)
            </Text>
            <Separator thickness="thin" spacing="8px" />
          </View>

          <View>
            <Text marginBottom={4} fontSize="14px">
              Medium (2px)
            </Text>
            <Separator thickness="medium" spacing="8px" />
          </View>

          <View>
            <Text marginBottom={4} fontSize="14px">
              Thick (4px)
            </Text>
            <Separator thickness="thick" spacing="8px" />
          </View>
        </Vertical>
      </View>

      {/* Separator Orientations */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Separator Orientations
        </Text>
        <Vertical
          gap={16}
          backgroundColor="white"
          padding={16}
          borderRadius="8px"
        >
          <View>
            <Text marginBottom={4} fontSize="14px">
              Horizontal (Default)
            </Text>
            <Separator orientation="horizontal" spacing="8px" />
          </View>

          <View>
            <Text marginBottom={4} fontSize="14px">
              Vertical
            </Text>
            <Horizontal
              height={80}
              alignItems="center"
              backgroundColor="color.gray.50"
              padding={16}
              borderRadius="8px"
            >
              <Text>Left Content</Text>
              <Separator orientation="vertical" spacing="16px" />
              <Text>Right Content</Text>
            </Horizontal>
          </View>
        </Vertical>
      </View>

      {/* Separator Colors */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Separator Colors
        </Text>
        <Vertical
          gap={16}
          backgroundColor="white"
          padding={16}
          borderRadius="8px"
        >
          <View>
            <Text marginBottom={4} fontSize="14px">
              Default (Gray)
            </Text>
            <Separator color="color.gray.200" spacing="8px" />
          </View>

          <View>
            <Text marginBottom={4} fontSize="14px">
              Primary (Blue)
            </Text>
            <Separator color="color.blue.500" spacing="8px" />
          </View>

          <View>
            <Text marginBottom={4} fontSize="14px">
              Success (Green)
            </Text>
            <Separator color="color.green.500" spacing="8px" />
          </View>

          <View>
            <Text marginBottom={4} fontSize="14px">
              Warning (Yellow)
            </Text>
            <Separator color="color.yellow.500" spacing="8px" />
          </View>

          <View>
            <Text marginBottom={4} fontSize="14px">
              Danger (Red)
            </Text>
            <Separator color="color.red.500" spacing="8px" />
          </View>
        </Vertical>
      </View>

      {/* Separator with Label */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Separator with Label
        </Text>
        <Vertical
          gap={16}
          backgroundColor="white"
          padding={16}
          borderRadius="8px"
        >
          <View>
            <Text marginBottom={4} fontSize="14px">
              Simple Label
            </Text>
            <Separator
              label="OR"
              spacing="16px"
              views={{
                label: {
                  fontFamily:
                    'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                },
              }}
            />
          </View>

          <View>
            <Text marginBottom={4} fontSize="14px">
              Styled Label
            </Text>
            <Separator
              label="SECTION DIVIDER"
              spacing="16px"
              views={{
                label: {
                  fontWeight: '600',
                  color: 'color.blue.600',
                  textTransform: 'uppercase',
                  fontSize: '12px',
                  letterSpacing: '0.05em',
                  fontFamily:
                    'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                },
                container: {
                  borderTopColor: 'color.blue.400',
                },
              }}
            />
          </View>

          <View>
            <Text marginBottom={4} fontSize="14px">
              Colored Label with Thicker Line
            </Text>
            <Separator
              label="IMPORTANT"
              color="color.red.400"
              thickness="medium"
              spacing="16px"
              views={{
                label: {
                  fontWeight: '600',
                  color: 'color.red.600',
                  backgroundColor: 'color.red.50',
                  paddingHorizontal: '12px',
                  paddingVertical: '4px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontFamily:
                    'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                },
              }}
            />
          </View>
        </Vertical>
      </View>

      {/* Separator in Card */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Separator in Card
        </Text>
        <Card variant="outlined" shape="rounded" isFullWidth>
          <Card.Header>
            <Text fontWeight="600" fontSize="18px">
              Card with Separators
            </Text>
          </Card.Header>
          <Card.Content>
            <Vertical gap={16}>
              <Text>
                This is the first section of content in the card. The separator
                below helps to organize the content into distinct sections.
              </Text>
              <Separator spacing="8px" />
              <Text>
                This is the second section of content. Notice how the separator
                creates a clear visual distinction between content areas within
                the card.
              </Text>
              <Separator
                label="ADDITIONAL INFORMATION"
                spacing="8px"
                views={{
                  label: {
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'color.gray.600',
                    fontFamily:
                      'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  },
                }}
              />
              <Text>
                This is the third section with additional information. The
                labeled separator provides context for this section.
              </Text>
            </Vertical>
          </Card.Content>
        </Card>
      </View>

      {/* Advanced Customization */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Advanced Customization
        </Text>
        <Vertical
          gap={16}
          backgroundColor="white"
          padding={16}
          borderRadius="8px"
        >
          <View>
            <Text marginBottom={4} fontSize="14px">
              Gradient Separator
            </Text>
            <Separator
              thickness="medium"
              spacing="16px"
              views={{
                container: {
                  background:
                    'linear-gradient(90deg, rgba(59,130,246,0) 0%, rgba(59,130,246,1) 50%, rgba(59,130,246,0) 100%)',
                  height: '2px',
                  border: 'none',
                },
              }}
            />
          </View>

          <View>
            <Text marginBottom={4} fontSize="14px">
              Double Line Separator
            </Text>
            <Separator
              spacing="24px"
              views={{
                container: {
                  height: '4px',
                  borderTopWidth: '1px',
                  borderTopColor: 'color.gray.300',
                  borderBottomWidth: '1px',
                  borderBottomColor: 'color.gray.300',
                  borderBottomStyle: 'solid',
                  backgroundColor: 'color.gray.100',
                },
              }}
            />
          </View>

          <View>
            <Text marginBottom={4} fontSize="14px">
              Fancy Label Separator
            </Text>
            <Separator
              label={
                <View
                  backgroundColor="color.purple.600"
                  color="white"
                  paddingLeft="12px"
                  paddingTop="4px"
                  borderRadius="16px"
                  boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                >
                  <Text fontWeight="600" fontSize="12px">
                    CUSTOM LABEL
                  </Text>
                </View>
              }
              color="color.purple.300"
              spacing="16px"
            />
          </View>
        </Vertical>
      </View>
    </Vertical>
  );
};
