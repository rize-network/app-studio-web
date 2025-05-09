import React from 'react';
import { Vertical } from 'app-studio';
import { Title } from '../Title';

/**
 * Examples of Title with different highlight styles
 */
export const HighlightedTitle = () => {
  return (
    <Vertical gap={32}>
      <Title 
        highlightText="background" 
        highlightStyle="background" 
        highlightColor="theme.primary"
      >
        Text with background highlight
      </Title>
      
      <Title 
        highlightText="underlined" 
        highlightStyle="underline" 
        highlightColor="theme.secondary"
      >
        Text with underlined highlight
      </Title>
      
      <Title 
        highlightText="gradient" 
        highlightStyle="gradient" 
        highlightColor="theme.primary" 
        highlightSecondaryColor="theme.secondary"
      >
        Text with gradient highlight
      </Title>
      
      <Title 
        highlightText="outline" 
        highlightStyle="outline" 
        highlightColor="theme.primary"
      >
        Text with outline highlight
      </Title>
      
      <Title 
        highlightText="glow" 
        highlightStyle="glow" 
        highlightColor="theme.primary"
      >
        Text with glow highlight
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
