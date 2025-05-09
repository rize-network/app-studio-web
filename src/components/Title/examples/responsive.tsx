import React from 'react';
import { Title } from '../Title';

/**
 * Example of responsive Title using media queries
 */
export const ResponsiveTitle = () => {
  return (
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
  );
};
