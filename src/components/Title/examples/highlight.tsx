import React from 'react';
import { Vertical } from 'app-studio';
import { Title } from '../Title';

/**
 * Examples of Title with different highlight animations
 */
export const HighlightTest = () => {
  return (
    <Vertical gap={32}>
      <Title
        highlightText="animated highlight"
        highlightStyle="background"
        highlightColor="theme.primary"
        highlightAnimate={{
          from: { opacity: 0, transform: 'scale(0.9)' },
          to: { opacity: 1, transform: 'scale(1)' },
          duration: '0.5s',
          delay: '0.2s',
        }}
      >
        Text with animated highlight
      </Title>

      <Title
        highlightText={['first', 'second', 'third']}
        highlightStyle="background"
        highlightColor="theme.primary"
        highlightAnimate={[
          {
            from: { opacity: 0, transform: 'translateY(-10px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
            duration: '0.5s',
            delay: '0.1s',
          },
          {
            from: { opacity: 0, transform: 'translateY(-10px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
            duration: '0.5s',
            delay: '0.3s',
          },
          {
            from: { opacity: 0, transform: 'translateY(-10px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
            duration: '0.5s',
            delay: '0.5s',
          },
        ]}
      >
        This text has first, second, and third highlighted words with staggered
        animations
      </Title>
    </Vertical>
  );
};
