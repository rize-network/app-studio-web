import React from 'react';
import { Title } from '../Title';
import { Vertical } from 'app-studio';

/**
 * Test for gradient highlighting in Title component
 */
export const GradientTest = () => {
  return (
    <Vertical gap={32}>
      <Title 
        highlightText="gradient" 
        highlightStyle="gradient"
        highlightColor="#3b82f6"
        highlightSecondaryColor="#8b5cf6"
      >
        Text with gradient words using hex colors
      </Title>
      
      <Title 
        highlightText="gradient" 
        highlightStyle="gradient"
        highlightColor="rgb(59, 130, 246)"
        highlightSecondaryColor="rgb(139, 92, 246)"
      >
        Text with gradient words using RGB colors
      </Title>
      
      <Title 
        highlightText="gradient" 
        highlightStyle="gradient"
        highlightColor="color.blue.500"
        highlightSecondaryColor="color.purple.500"
      >
        Text with gradient words using theme colors
      </Title>
    </Vertical>
  );
};
