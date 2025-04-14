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
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Text } from '../../Text/Text';
import { View } from '../../Layout/View/View';
import { Card } from '../../Card/Card';

export const DesignSystemSeparator = () => {
  return (
    <Vertical gap={32}>
      {/* Basic Separators */}
      <View>
        <Text
          marginBottom={8}
          fontWeight="600"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Basic Separators
        </Text>
        <Vertical
          gap={16}
          backgroundColor="white"
          padding={16}
          borderRadius="8px"
        >
          <Text fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif">
            This is content above the separator. The separator creates a visual
            distinction between content sections.
          </Text>
          <Separator spacing="8px" />
          <Text fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif">
            This is content below the separator. Notice how it helps organize
            the content into distinct sections.
          </Text>
        </Vertical>
      </View>

      {/* Separator Variants */}
      <View>
        <Text
          marginBottom={8}
          fontWeight="600"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Separator Variants
        </Text>
        <Vertical
          gap={16}
          backgroundColor="white"
          padding={16}
          borderRadius="8px"
        >
          <View>
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Solid (Default)
            </Text>
            <Separator variant="solid" spacing="8px" />
          </View>

          <View>
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Dashed
            </Text>
            <Separator variant="dashed" spacing="8px" />
          </View>

          <View>
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Dotted
            </Text>
            <Separator variant="dotted" spacing="8px" />
          </View>
        </Vertical>
      </View>

      {/* Separator Thicknesses */}
      <View>
        <Text
          marginBottom={8}
          fontWeight="600"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Separator Thicknesses
        </Text>
        <Vertical
          gap={16}
          backgroundColor="white"
          padding={16}
          borderRadius="8px"
        >
          <View>
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Thin (1px)
            </Text>
            <Separator thickness="thin" spacing="8px" />
          </View>

          <View>
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Medium (2px)
            </Text>
            <Separator thickness="medium" spacing="8px" />
          </View>

          <View>
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Thick (4px)
            </Text>
            <Separator thickness="thick" spacing="8px" />
          </View>
        </Vertical>
      </View>

      {/* Separator Orientations */}
      <View>
        <Text
          marginBottom={8}
          fontWeight="600"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Separator Orientations
        </Text>
        <Vertical
          gap={16}
          backgroundColor="white"
          padding={16}
          borderRadius="8px"
        >
          <View>
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Horizontal (Default)
            </Text>
            <Separator orientation="horizontal" spacing="8px" />
          </View>

          <View>
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Vertical
            </Text>
            <Horizontal
              height={80}
              alignItems="center"
              backgroundColor="color.gray.50"
              padding={16}
              borderRadius="8px"
            >
              <Text fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif">
                Left Content
              </Text>
              <Separator orientation="vertical" spacing="16px" />
              <Text fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif">
                Right Content
              </Text>
            </Horizontal>
          </View>
        </Vertical>
      </View>

      {/* Separator Colors */}
      <View>
        <Text
          marginBottom={8}
          fontWeight="600"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Separator Colors
        </Text>
        <Vertical
          gap={16}
          backgroundColor="white"
          padding={16}
          borderRadius="8px"
        >
          <View>
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Default (Gray)
            </Text>
            <Separator color="color.gray.200" spacing="8px" />
          </View>

          <View>
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Primary (Blue)
            </Text>
            <Separator color="color.blue.500" spacing="8px" />
          </View>

          <View>
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Success (Green)
            </Text>
            <Separator color="color.green.500" spacing="8px" />
          </View>

          <View>
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Warning (Yellow)
            </Text>
            <Separator color="color.yellow.500" spacing="8px" />
          </View>

          <View>
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Danger (Red)
            </Text>
            <Separator color="color.red.500" spacing="8px" />
          </View>
        </Vertical>
      </View>

      {/* Separator with Label */}
      <View>
        <Text
          marginBottom={8}
          fontWeight="600"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Separator with Label
        </Text>
        <Vertical
          gap={16}
          backgroundColor="white"
          padding={16}
          borderRadius="8px"
        >
          <View>
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
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
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
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
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
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
        <Text
          marginBottom={8}
          fontWeight="600"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Separator in Card
        </Text>
        <Card variant="outlined" shape="rounded" isFullWidth>
          <Card.Header>
            <Text
              fontWeight="600"
              fontSize="18px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Card with Separators
            </Text>
          </Card.Header>
          <Card.Content>
            <Vertical gap={16}>
              <Text fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif">
                This is the first section of content in the card. The separator
                below helps to organize the content into distinct sections.
              </Text>
              <Separator spacing="8px" />
              <Text fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif">
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
              <Text fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif">
                This is the third section with additional information. The
                labeled separator provides context for this section.
              </Text>
            </Vertical>
          </Card.Content>
        </Card>
      </View>

      {/* Advanced Customization */}
      <View>
        <Text
          marginBottom={8}
          fontWeight="600"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Advanced Customization
        </Text>
        <Vertical
          gap={16}
          backgroundColor="white"
          padding={16}
          borderRadius="8px"
        >
          <View>
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
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
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
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
            <Text
              marginBottom={4}
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Fancy Label Separator
            </Text>
            <Separator
              label={
                <View
                  backgroundColor="color.purple.600"
                  color="white"
                  paddingX="12px"
                  paddingY="4px"
                  borderRadius="16px"
                  boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                >
                  <Text
                    fontWeight="600"
                    fontSize="12px"
                    fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
                  >
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
