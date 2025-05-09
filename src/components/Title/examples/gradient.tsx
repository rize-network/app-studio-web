import React from 'react';
import { Vertical, Text } from 'app-studio';
import { Title } from '../Title';

/**
 * Examples of Title with gradient highlight styles
 */
export const GradientTest = () => {
  return (
    <Vertical gap={32}>
      <Text fontSize={14} color="color.gray.500" marginBottom={16}>
        The highlighted words below should appear with gradient text effects
      </Text>

      <Title
        highlightText={['primary', 'secondary']}
        highlightStyle="gradient"
        highlightColor="theme.primary"
        highlightSecondaryColor="theme.secondary"
        size="2xl"
      >
        Gradient from primary to secondary
      </Title>

      <Title
        highlightText={['specific', 'colors']}
        highlightStyle="gradient"
        highlightColor="#3b82f6"
        highlightSecondaryColor="#a855f7"
        size="2xl"
      >
        Gradient with specific hex colors #3b82f6 to #a855f7
      </Title>

      <Title
        highlightText={['blue', 'purple']}
        highlightStyle="gradient"
        highlightColor="color.blue.500"
        highlightSecondaryColor="color.purple.500"
        size="2xl"
      >
        Gradient from blue to purple
      </Title>

      <Title
        highlightText={['orange', 'red']}
        highlightStyle="gradient"
        highlightColor="color.orange.500"
        highlightSecondaryColor="color.red.500"
        size="2xl"
      >
        Gradient from orange to red
      </Title>

      <Title
        highlightText={['green', 'teal']}
        highlightStyle="gradient"
        highlightColor="color.green.500"
        highlightSecondaryColor="color.teal.500"
        size="2xl"
      >
        Gradient from green to teal
      </Title>

      <Title
        highlightStyle="gradient"
        highlightColor="color.purple.500"
        highlightSecondaryColor="color.pink.500"
        size="2xl"
      >
        This entire title has a gradient with no specific highlight
      </Title>
    </Vertical>
  );
};
