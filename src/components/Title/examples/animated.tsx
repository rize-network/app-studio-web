import React from 'react';
import { Title } from '../Title';
import { Vertical } from 'app-studio';

/**
 * Examples of Title component with different animations
 */
export const AnimatedTitle = () => {
  return (
    <Vertical gap={48}>
      <Title
        animation="fadeIn"
        animationDuration="1.5s"
      >
        Fade In Animation
      </Title>

      <Title
        animation="slideIn"
        animationDirection="left"
        animationDuration="1s"
      >
        Slide In From Left
      </Title>

      <Title
        animation="slideIn"
        animationDirection="right"
        animationDuration="1s"
      >
        Slide In From Right
      </Title>

      <Title
        animation="slideIn"
        animationDirection="top"
        animationDuration="1s"
      >
        Slide In From Top
      </Title>

      <Title
        animation="slideIn"
        animationDirection="bottom"
        animationDuration="1s"
      >
        Slide In From Bottom
      </Title>

      <Title
        animation="typewriter"
        animationDuration="3s"
      >
        Typewriter Effect Animation
      </Title>

      <Title
        animation="reveal"
        animationDuration="1.5s"
      >
        Reveal Animation
      </Title>

      <Title
        animation="bounce"
        animationDuration="1s"
      >
        Bounce Animation
      </Title>

      <Title
        animation="highlight"
        animationDuration="1.5s"
        highlightText="highlighted"
        highlightStyle="underline"
        highlightColor="theme.primary"
      >
        Text with highlighted animation
      </Title>
    </Vertical>
  );
};
