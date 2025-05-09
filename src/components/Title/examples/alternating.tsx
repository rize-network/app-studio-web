import React from 'react';
import { Title } from '../Title';
import { Vertical } from 'app-studio';

/**
 * Example of Title component with alternating highlighted text
 */
export const AlternatingTitle = () => {
  return (
    <Vertical gap={48}>
      <Title
        alternateAnimation
        highlightText="WORD"
        alternateHighlightText={['Amazing', 'Powerful', 'Flexible']}
        alternateDuration={2000}
        highlightStyle="background"
        highlightColor="theme.primary"
      >
        Our Product is WORD
      </Title>

      <Title
        alternateAnimation
        highlightText="FEATURE"
        alternateHighlightText={['Fast', 'Reliable', 'Secure']}
        alternateDuration={1500}
        highlightStyle="gradient"
        highlightColor="color.blue.500"
        highlightSecondaryColor="color.purple.500"
      >
        Experience a FEATURE Solution
      </Title>

      <Title
        alternateAnimation
        highlightText="ADJECTIVE"
        alternateHighlightText={['Creative', 'Innovative', 'Cutting-edge']}
        alternateDuration={3000}
        highlightStyle="underline"
        highlightColor="color.green.500"
        size="lg"
      >
        Discover our ADJECTIVE Technology
      </Title>
    </Vertical>
  );
};
