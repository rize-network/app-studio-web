import React from 'react';
import { Vertical, Text } from 'app-studio';
import { Title } from '../Title';

/**
 * Examples of Title with alternating highlight text
 */
export const AlternatingTitle = () => {
  return (
    <Vertical gap={48}>
      <Title
        highlightText="changing"
        alternateHighlightText={[
          'innovative',
          'powerful',
          'flexible',
          'intuitive',
        ]}
        alternateAnimation={true}
        alternateDuration={2000}
        highlightStyle="background"
        highlightColor="theme-primary"
        size="xl"
      >
        Our changing solution for your business
      </Title>

      <Text
        fontSize={14}
        color="color-gray-500"
        marginTop={8}
        marginBottom={24}
      >
        The word &quot;changing&quot; will cycle through &quot;innovative&quot;,
        &quot;powerful&quot;, &quot;flexible&quot;, and &quot;intuitive&quot;
        every 2 seconds
      </Text>

      <Title
        highlightText="rotating"
        alternateHighlightText={['React', 'Vue', 'Angular', 'Svelte']}
        alternateAnimation={true}
        alternateDuration={1500}
        highlightStyle="gradient"
        highlightColor="theme-primary"
        highlightSecondaryColor="theme-secondary"
        highlightAnimate={{
          from: { opacity: 0 },
          to: { opacity: 1 },
          duration: '0.5s',
        }}
        size="xl"
      >
        Build with rotating and other modern frameworks
      </Title>

      <Text
        fontSize={14}
        color="color-gray-500"
        marginTop={8}
        marginBottom={24}
      >
        The word &quot;rotating&quot; will cycle through framework names with a
        gradient style and fade-in animation
      </Text>

      <Title
        highlightText="cycling"
        alternateHighlightText={['fast', 'reliable', 'secure', 'scalable']}
        alternateAnimation={true}
        alternateDuration={3000}
        highlightStyle="glow"
        highlightColor="theme-primary"
        size="xl"
      >
        Our platform is cycling and built for performance
      </Title>

      <Text fontSize={14} color="color-gray-500" marginTop={8}>
        The word &quot;cycling&quot; will cycle through attributes with a glow
        effect every 3 seconds
      </Text>
    </Vertical>
  );
};
