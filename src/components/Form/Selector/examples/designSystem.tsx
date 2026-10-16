import React from 'react';
import { Text, Vertical, View } from 'app-studio';
import { Selector } from '../Selector';

export const DesignSystemSelectors = () => (
  <Vertical gap={24}>
    <View>
      <Text marginBottom={8} fontWeight="600">
        Plain (theme-primary accent)
      </Text>
      <Selector
        label="Visibility"
        options={[
          { label: 'Public', value: 'public' },
          { label: 'Private', value: 'private' },
          { label: 'Unlisted', value: 'unlisted' },
        ]}
      />
    </View>

    <View>
      <Text marginBottom={8} fontWeight="600">
        With per-option colors
      </Text>
      <Selector
        label="Severity"
        options={[
          { label: 'Info', value: 'info', color: 'color-blue-500' },
          { label: 'Warning', value: 'warning', color: 'color-orange-500' },
          { label: 'Critical', value: 'critical', color: 'color-red-500' },
        ]}
      />
    </View>

    <View>
      <Text marginBottom={8} fontWeight="600">
        Custom item styles via views
      </Text>
      <Selector
        label="Density"
        options={[
          { label: 'Compact', value: 'compact' },
          { label: 'Cozy', value: 'cozy' },
          { label: 'Comfortable', value: 'comfortable' },
        ]}
        views={{
          item: {
            paddingVertical: 10,
            fontSize: '14px',
          },
        }}
      />
    </View>
  </Vertical>
);
