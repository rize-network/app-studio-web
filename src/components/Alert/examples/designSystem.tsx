import React from 'react';
import { Alert } from '../Alert';
import { Vertical, Text, View, useTheme } from 'app-studio';
import { EditIcon } from '../../Icon/Icon';

export const DesignSystemAlerts = () => {
  const { themeMode } = useTheme();

  return (
    <Vertical gap={24}>
      {/* Variant Examples */}
      <View>
        <Text marginBottom={8} fontWeight="600" color="theme.primary">
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
        <Text marginBottom={8} fontWeight="600" color="theme.primary">
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
        <Text marginBottom={8} fontWeight="600" color="theme.primary">
          Custom Styling
        </Text>
        <Alert
          title="Custom Styled Alert"
          description="This alert has custom styling applied to it."
          views={{
            container: {
              backgroundColor:
                themeMode === 'light' ? 'color.purple.50' : 'color.gray.800',
              borderColor:
                themeMode === 'light' ? 'color.purple.200' : 'color.purple.500',
              boxShadow:
                themeMode === 'light'
                  ? '0 2px 8px rgba(124, 58, 237, 0.1)'
                  : 'none',
              borderRadius: '12px',
              borderLeftWidth: '4px',
              borderRightWidth: '1px',
              borderTopWidth: '1px',
              borderBottomWidth: '1px',
            },
            title: {
              color: 'theme.primary',
              fontSize: '18px',
              fontWeight: '600',
            },
            description: {
              color:
                themeMode === 'light' ? 'color.gray.700' : 'color.gray.300',
            },
            icon: {
              color: 'color.purple.500',
            },
          }}
        />
      </View>

      {/* Rich Content Example */}
      <View>
        <Text marginBottom={8} fontWeight="600" color="theme.primary">
          Rich Content
        </Text>
        <Alert
          variant="info"
          title="Alert with Rich Content"
          description={
            <Vertical gap={8}>
              <Text
                color={
                  themeMode === 'light' ? 'color.gray.700' : 'color.gray.300'
                }
              >
                This alert contains rich content with multiple paragraphs:
              </Text>
              <Text
                color={
                  themeMode === 'light' ? 'color.gray.700' : 'color.gray.300'
                }
              >
                • First item in the list
              </Text>
              <Text
                color={
                  themeMode === 'light' ? 'color.gray.700' : 'color.gray.300'
                }
              >
                • Second item in the list
              </Text>
              <Text
                color={
                  themeMode === 'light' ? 'color.gray.700' : 'color.gray.300'
                }
              >
                • Third item with{' '}
                <Text as="span" fontWeight="600" color="theme.primary">
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
};
