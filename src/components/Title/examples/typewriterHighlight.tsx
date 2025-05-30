import React, { useState } from 'react';
import { Vertical, Text, Button, Horizontal } from 'app-studio';
import { Title } from '../Title';

/**
 * Examples of Title with typewriter effect on highlighted text
 */
export const TypewriterHighlightDemo = () => {
  const [resetKey, setResetKey] = useState(0);

  // Function to reset all typewriter animations
  const resetTypewriters = () => {
    setResetKey((prev) => prev + 1);
  };

  return (
    <Vertical gap={32}>
      <Horizontal
        justifyContent="space-between"
        alignItems="center"
        marginBottom={16}
      >
        <Text fontSize={14} color="color.gray.500">
          Typewriter effect on highlighted text
        </Text>
        <Button variant="outline" size="sm" onClick={resetTypewriters}>
          Reset Animations
        </Button>
      </Horizontal>

      {/* Single highlighted word with typewriter effect */}
      <Title
        key={`single-${resetKey}`}
        highlightText="typewriter"
        highlightStyle="background"
        highlightColor="theme.primary"
        highlightTypewriter={true}
        highlightTypewriterDuration={1500}
        size="xl"
      >
        This text has a typewriter effect on the highlighted word
      </Title>

      {/* Multiple highlighted words with typewriter effect */}
      <Title
        key={`multiple-${resetKey}`}
        highlightText={['multiple', 'highlighted', 'words']}
        highlightStyle="background"
        highlightColor="theme.primary"
        highlightTypewriter={true}
        highlightTypewriterDuration={2500}
        size="xl"
      >
        This text has multiple highlighted words with typewriter effect
      </Title>

      {/* Gradient highlight with typewriter effect */}
      <Title
        key={`gradient-${resetKey}`}
        highlightText="gradient"
        highlightStyle="gradient"
        highlightColor="color.blue.500"
        highlightSecondaryColor="color.purple.500"
        highlightTypewriter={true}
        highlightTypewriterDuration={1000}
        size="xl"
      >
        This text has a gradient highlight with typewriter effect
      </Title>

      {/* Full title with typewriter effect */}
      <Title
        key={`full-${resetKey}`}
        highlightStyle="gradient"
        highlightColor="color.blue.500"
        highlightSecondaryColor="color.purple.500"
        highlightTypewriter={true}
        highlightTypewriterDuration={3000}
        size="xl"
      >
        This entire title has a gradient with typewriter effect
      </Title>

      {/* Typewriter with highlight animation */}
      <Title
        key={`animated-${resetKey}`}
        highlightText="animated"
        highlightStyle="background"
        highlightColor="theme.primary"
        highlightTypewriter={true}
        highlightTypewriterDuration={1500}
        highlightAnimate={{
          from: { opacity: 0.5, transform: 'scale(0.95)' },
          to: { opacity: 1, transform: 'scale(1)' },
          duration: '0.5s',
          delay: '1.5s', // Start animation after typewriter completes
        }}
        size="xl"
      >
        This highlight has typewriter followed by animation
      </Title>

      {/* Alternating text with typewriter */}
      <Title
        key={`alternating-${resetKey}`}
        highlightText="changing"
        alternateHighlightText={[
          'innovative',
          'powerful',
          'flexible',
          'intuitive',
        ]}
        alternateAnimation={true}
        alternateDuration={3000}
        highlightStyle="background"
        highlightColor="theme.primary"
        highlightTypewriter={true}
        highlightTypewriterDuration={1000}
        size="xl"
      >
        Our changing solution for your business
      </Title>

      <Text fontSize={14} color="color.gray.500" marginTop={8}>
        The typewriter effect adds a blinking cursor while typing and has a
        natural typing rhythm. This implementation is based on a more robust
        TypewriterEffect component that handles the animation directly in the
        view.
      </Text>
    </Vertical>
  );
};
