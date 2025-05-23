import React from 'react';
import { Title } from '../Title';

/**
 * Example of Title with direct animation props
 */
export const DirectAnimationExample = () => {
  return (
    <Title
      animate={{
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        duration: '1s',
        timingFunction: 'ease-out',
      }}
      highlightText="animated"
      highlightStyle="background"
      highlightColor="theme.primary"
      highlightAnimate={{
        from: { opacity: 0 },
        to: { opacity: 1 },
        duration: '1.5s',
        delay: '0.5s',
      }}
    >
      This title is directly animated with custom animation
    </Title>
  );
};
