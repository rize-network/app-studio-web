import React from 'react';
import { Vertical, Text } from 'app-studio';
import { Title } from '../Title';

/**
 * Examples of Title with slide effect on highlighted text
 *
 * ## The highlight/rotation contract
 *
 * `children` MUST be the complete sentence, with `highlightText` appearing
 * verbatim inside it (normal spaces). The highlight is a *substring lookup*:
 * the matched part of `children` gets styled, and with
 * `alternateHighlightText` + `alternateAnimation` it is *replaced* by each
 * rotating word in turn.
 *
 * ```tsx
 * // ✅ Correct — the sentence contains the first highlight verbatim:
 * <Title
 *   highlightText="finding co-founders"
 *   alternateHighlightText={['finding co-founders', 'raising funds']}
 *   alternateAnimation
 * >
 *   Build a startup without finding co-founders
 * </Title>
 *
 * // ❌ Incorrect — composing children out of parts with a separator:
 * <Title highlightText={highlight[0]} ...>
 *   {text + ' | ' + highlight[0]}
 * </Title>
 * // Two failures at once: if `highlightText` is not a substring of
 * // `children`, nothing is highlighted and rotation is disabled (a
 * // dev-warning fires); and `|` is Title's line-break character, so the
 * // ' | ' separator renders as a hard <br> in the middle of the sentence.
 * ```
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
