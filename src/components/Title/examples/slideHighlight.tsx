import React from 'react';
import { Vertical, Text } from 'app-studio';
import { Title } from '../Title';

/**
 * Examples of Title with slide effect on highlighted text
 */
export const SlideHighlightDemo = () => {
  return (
    <Vertical gap={32}>
      <Text fontSize={14} color="color-gray-500">
        Slide effect on highlighted text
      </Text>

      {/* Single highlighted word with slide effect */}
      <Title
        highlightText="slide"
        highlightStyle="background"
        highlightColor="theme-primary"
        highlightSlide={true}
        highlightSlideDuration={500}
        highlightSlideStagger={500}
        alternateDuration={4000}
        size="xl"
      >
        This text has a slide effect on the highlighted word
      </Title>

      {/* Alternating text with slide effect */}
      <Title
        highlightText="changing solution"
        alternateHighlightText={[
          'innovative the future',
          'powerful the future',
          'flexible the future',
          'intuitive the future',
        ]}
        alternateAnimation={true}
        alternateDuration={6000}
        highlightStyle="background"
        highlightColor="theme-primary"
        highlightSlide={true}
        highlightSlideDuration={500}
        highlightSlideStagger={500}
        highlightSlideSequential={true}
        size="xl"
      >
        Our changing solution for your business
      </Title>

      {/* Alternating text with gradient and slide effect */}
      <Title
        highlightText="Amazing"
        alternateHighlightText={['Incredible', 'Fantastic', 'Wonderful']}
        alternateAnimation={true}
        alternateDuration={2000}
        highlightStyle="gradient"
        highlightColor="color-blue-500"
        highlightSecondaryColor="color-purple-500"
        highlightSlide={true}
        highlightSlideDuration={500}
        size="xl"
      >
        Build Amazing things together
      </Title>
    </Vertical>
  );
};
