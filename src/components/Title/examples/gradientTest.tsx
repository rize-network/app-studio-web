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
        // highlightColor="color.white"
        // highlightSecondaryColor="color.red"

        highlightColor="theme.primary"
        highlightSecondaryColor="theme.secondary"
      >
        Text with gradient words using hex colors
      </Title>

      <Title
        highlightText="gradient"
        highlightStyle="gradient"
        highlightColor="theme.primary"
        highlightSecondaryColor="theme.secondary"
      >
        Text with gradient words using RGB colors
      </Title>

      <Title
        highlightText="gradient"
        highlightStyle="gradient"
        highlightColor="color.blue.500"
        highlightSecondaryColor="color.red.500"
      >
        Text with gradient words using theme colors
      </Title>
    </Vertical>
  );
};
