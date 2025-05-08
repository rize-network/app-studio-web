import React from 'react';
import { Title } from '../Title';
import { Vertical } from 'app-studio';

/**
 * Examples of Title component with different highlight styles
 */
export const HighlightedTitle = () => {
  return (
    <Vertical gap={32}>
      <Title 
        highlightText="highlighted" 
        highlightStyle="background"
        highlightColor="theme.primary"
      >
        Text with highlighted words
      </Title>
      
      <Title 
        highlightText="underlined" 
        highlightStyle="underline"
        highlightColor="theme.secondary"
      >
        Text with underlined words
      </Title>
      
      <Title 
        highlightText="gradient" 
        highlightStyle="gradient"
        highlightColor="theme.primary"
        highlightSecondaryColor="theme.secondary"
      >
        Text with gradient words
      </Title>
      
      <Title 
        highlightText="outline" 
        highlightStyle="outline"
        highlightColor="theme.primary"
      >
        Text with outline words
      </Title>
      
      <Title 
        highlightText="glow" 
        highlightStyle="glow"
        highlightColor="theme.primary"
      >
        Text with glow words
      </Title>
      
      <Title 
        highlightText={["multiple", "highlights"]} 
        highlightStyle="background"
        highlightColor="theme.primary"
      >
        Text with multiple highlights in the same sentence
      </Title>
    </Vertical>
  );
};
