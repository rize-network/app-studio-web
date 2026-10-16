import React from 'react';
import { Vertical, Text } from 'app-studio';
import { Title } from '../Title';

/**
 * Examples of Title with different highlight styles applied to the entire title
 */
export const HighlightStylesDemo = () => {
  return (
    <Vertical gap={32}>
      <Text fontSize={14} color="color-gray-500" marginBottom={16}>
        Different highlight styles applied to entire titles (no highlightText
        prop)
      </Text>

      <Title
        highlightStyle="background"
        highlightColor="theme-primary"
        size="xl"
      >
        Background Highlight Style
      </Title>

      <Title
        highlightStyle="underline"
        highlightColor="theme-secondary"
        size="xl"
      >
        Underline Highlight Style
      </Title>

      <Title
        highlightStyle="gradient"
        highlightColor="color-blue-500"
        highlightSecondaryColor="color-purple-500"
        size="xl"
      >
        Gradient Highlight Style
      </Title>

      <Title highlightStyle="outline" highlightColor="theme-primary" size="xl">
        Outline Highlight Style
      </Title>

      <Title highlightStyle="glow" highlightColor="theme-primary" size="xl">
        Glow Highlight Style
      </Title>
    </Vertical>
  );
};
