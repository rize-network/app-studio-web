import React from 'react';
import { Title } from '../Title';
import { Vertical } from 'app-studio';

/**
 * Example of Title component with custom styling
 */
export const CustomTitle = () => {
  return (
    <Vertical gap={48}>
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
      
      <Title
        views={{
          container: {
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            border: '2px solid',
            borderColor: 'theme.primary',
            padding: '16px',
            borderRadius: '8px',
          },
        }}
        animation="fadeIn"
        animationDuration="1.5s"
      >
        Another Custom Title Style
      </Title>
      
      <Title
        views={{
          container: {
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          },
          highlight: {
            fontStyle: 'italic',
          },
        }}
        highlightText="shadow"
        highlightStyle="underline"
        highlightColor="theme.primary"
      >
        Title with shadow effect
      </Title>
    </Vertical>
  );
};
