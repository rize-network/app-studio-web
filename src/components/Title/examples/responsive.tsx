import React from 'react';
import { Title } from '../Title';
import { Vertical } from 'app-studio';

/**
 * Example of responsive Title using the new responsive prop
 */
export const ResponsiveTitle = () => {
  return (
    <Vertical gap={32}>
      {/* Using the new responsive prop - automatically adapts based on size */}
      <Title
        size="xl"
        responsive={true}
        highlightText="Responsive"
        highlightStyle="background"
        highlightColor="theme.primary"
      >
        Responsive XL Title (H1 scale)
      </Title>

      <Title
        size="lg"
        responsive={true}
        highlightText="Responsive"
        highlightStyle="gradient"
        highlightColor="theme.primary"
        highlightSecondaryColor="theme.secondary"
      >
        Responsive LG Title (H2 scale)
      </Title>

      <Title
        size="md"
        responsive={true}
        highlightText="Responsive"
        highlightStyle="underline"
        highlightColor="theme.accent"
      >
        Responsive MD Title (H3 scale)
      </Title>

      <Title
        size="sm"
        responsive={true}
        highlightText="Responsive"
        highlightStyle="glow"
        highlightColor="theme.primary"
      >
        Responsive SM Title (T1 scale)
      </Title>

      <Title
        size="xs"
        responsive={true}
        highlightText="Responsive"
        highlightStyle="outline"
        highlightColor="theme.secondary"
      >
        Responsive XS Title (S1 scale)
      </Title>

      {/* Legacy example using manual media queries */}
      <Title
        media={{
          mobile: {
            fontSize: 32,
            lineHeight: '100%',
          },
          tablet: {
            fontSize: 48,
            lineHeight: '110%',
          },
          desktop: {
            fontSize: 64,
            lineHeight: '120%',
          },
        }}
        highlightText="Manual"
        highlightStyle="background"
        highlightColor="theme.primary"
      >
        Manual Media Queries Title
      </Title>
    </Vertical>
  );
};
