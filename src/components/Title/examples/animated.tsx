import React from 'react';
import { Vertical } from 'app-studio';
import { Title } from '../Title';

/**
 * Examples of Title with different animation types
 */
export const AnimatedTitle = () => {
  return (
    <Vertical gap={48}>
      <Title
        animate={{
          from: { opacity: 0 },
          to: { opacity: 1 },
          duration: '1.5s',
          iterationCount: '1',
        }}
      >
        Fade In Animation
      </Title>

      <Title
        animate={{
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
          duration: '1s',
          iterationCount: '1',
        }}
      >
        Slide In From Left
      </Title>

      <Title
        animate={{
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
          duration: '1s',
          iterationCount: '1',
        }}
      >
        Slide In From Right
      </Title>

      <Title
        animate={{
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
          duration: '1s',
          iterationCount: '1',
        }}
      >
        Slide In From Top
      </Title>

      <Title
        animate={{
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
          duration: '1s',
          iterationCount: '1',
        }}
      >
        Slide In From Bottom
      </Title>

      <Title
        animate={{
          from: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
          to: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
          duration: '1.5s',
          iterationCount: '1',
        }}
      >
        Reveal Animation
      </Title>

      <Title
        animate={{
          from: { transform: 'translateY(0)' },
          '20%': { transform: 'translateY(-30px)' },
          '40%': { transform: 'translateY(0)' },
          '60%': { transform: 'translateY(-15px)' },
          '80%': { transform: 'translateY(0)' },
          to: { transform: 'translateY(0)' },
          duration: '1s',
          iterationCount: '1',
        }}
      >
        Bounce Animation
      </Title>
    </Vertical>
  );
};
