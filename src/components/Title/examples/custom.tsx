import React from 'react';
import { Title } from '../Title';

/**
 * Example of Title with custom styling using the views prop
 */
export const CustomTitle = () => {
  return (
    <Title
      views={{
        container: {
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        },
        highlight: {
          borderRadius: '8px',
          padding: '0 12px',
        },
      }}
      highlightText="Custom"
      highlightStyle="background"
      highlightColor="color.purple.500"
    >
      Title with Custom Styling
    </Title>
  );
};
