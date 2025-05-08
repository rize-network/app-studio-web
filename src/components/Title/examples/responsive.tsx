import React from 'react';
import { Title } from '../Title';
import { View } from 'app-studio';

/**
 * Example of Title component with responsive behavior
 */
export const ResponsiveTitle = () => {
  return (
    <View>
      <Title
        media={{
          mobile: {
            fontSize: 32,
            lineHeight: '40px',
          },
          tablet: {
            fontSize: 48,
            lineHeight: '56px',
          },
          desktop: {
            fontSize: 64,
            lineHeight: '72px',
          },
        }}
        highlightText="Responsive"
        highlightStyle="background"
        highlightColor="theme.primary"
      >
        Responsive Title Example
      </Title>
    </View>
  );
};
