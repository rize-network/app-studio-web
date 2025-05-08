import React from 'react';
import { Title } from '../Title';
import { Vertical } from 'app-studio';

/**
 * Test for highlighting issues in Title component
 */
export const HighlightTest = () => {
  return (
    <Vertical gap={32}>
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
        size="xl"
        animation="fadeIn"
        animationDuration="1s"
        highlightText="Platform"
        highlightStyle="gradient"
        highlightColor="theme.primary"
        highlightSecondaryColor="theme.secondary"
        centered
      >
        Welcome to Our Platform
      </Title>
      
      {/* Test with exact matches for comparison */}
      <Title 
        highlightText="gradient" 
        highlightStyle="gradient"
        highlightColor="theme.primary"
        highlightSecondaryColor="theme.secondary"
      >
        This text contains the exact word gradient by itself
      </Title>
      
      <Title 
        highlightText="Platform" 
        highlightStyle="gradient"
        highlightColor="theme.primary"
        highlightSecondaryColor="theme.secondary"
      >
        This text contains the exact word Platform by itself
      </Title>
    </Vertical>
  );
};
