import React from 'react';
import { Vertical } from 'app-studio';
import { Title } from '../Title';

/**
 * Examples of Title with different animation loop controls
 */
export const AnimationLoopTitle = () => {
  return (
    <Vertical gap={48}>
      {/* Title with single play animation (default) */}
      <Title
        animate={{
          from: { opacity: 0, transform: 'translateY(-20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
          duration: '1s',
          timingFunction: 'ease-out',
        }}
        animationLoop={1}
        highlightText="Once"
        highlightStyle="background"
        highlightColor="theme.primary"
      >
        Animation Plays Once (Default)
      </Title>

      {/* Title with animation that plays 3 times */}
      <Title
        animate={{
          from: { transform: 'scale(0.8)' },
          to: { transform: 'scale(1)' },
          duration: '0.8s',
          timingFunction: 'ease-in-out',
        }}
        animationLoop={3}
        highlightText="Three"
        highlightStyle="gradient"
        highlightColor="theme.primary"
        highlightSecondaryColor="theme.secondary"
      >
        Animation Plays Three Times
      </Title>

      {/* Title with infinite animation loop */}
      <Title
        animate={{
          from: { transform: 'translateX(-10px)' },
          to: { transform: 'translateX(10px)' },
          duration: '2s',
          timingFunction: 'ease-in-out',
          direction: 'alternate',
        }}
        animationLoop="infinite"
        highlightText="Infinite"
        highlightStyle="glow"
        highlightColor="theme.primary"
      >
        Animation Loops Infinitely
      </Title>

      {/* Highlight animation with different loop control */}
      <Title
        highlightAnimate={{
          from: { transform: 'rotate(-5deg)' },
          to: { transform: 'rotate(5deg)' },
          duration: '1s',
          timingFunction: 'ease-in-out',
          direction: 'alternate',
        }}
        highlightAnimationLoop="infinite"
        highlightText="Wiggling"
        highlightStyle="outline"
        highlightColor="theme.warning"
      >
        Title with Wiggling Highlight
      </Title>

      {/* Both title and highlight with different loop controls */}
      <Title
        animate={{
          from: { opacity: 0.5 },
          to: { opacity: 1 },
          duration: '2s',
          timingFunction: 'ease-in-out',
          direction: 'alternate',
        }}
        animationLoop="infinite"
        highlightAnimate={{
          from: { backgroundColor: 'theme.primary' },
          to: { backgroundColor: 'theme.secondary' },
          duration: '1.5s',
          timingFunction: 'ease-in-out',
          direction: 'alternate',
        }}
        highlightAnimationLoop="infinite"
        highlightText="Pulsing"
        highlightStyle="background"
      >
        Title with Pulsing Background and Highlight
      </Title>

      {/* Bounce animation with limited loops */}
      <Title
        animate={{
          from: { transform: 'translateY(0)' },
          '20%': { transform: 'translateY(-30px)' },
          '40%': { transform: 'translateY(0)' },
          '60%': { transform: 'translateY(-15px)' },
          '80%': { transform: 'translateY(0)' },
          to: { transform: 'translateY(0)' },
          duration: '2s',
          timingFunction: 'ease-in-out',
        }}
        animationLoop={2}
        highlightText="Bounce"
        highlightStyle="background"
        highlightColor="theme.success"
      >
        Bounce Animation (2 Times)
      </Title>

      {/* Typewriter with infinite highlight animation */}
      <Title
        highlightAnimate={{
          from: { textShadow: '0 0 5px theme.primary' },
          to: { textShadow: '0 0 20px theme.primary' },
          duration: '1.5s',
          timingFunction: 'ease-in-out',
          direction: 'alternate',
        }}
        highlightAnimationLoop="infinite"
        highlightText="glowing"
        highlightStyle="glow"
        highlightColor="theme.primary"
        highlightTypewriter={true}
        highlightTypewriterDuration={2000}
      >
        Typewriter with glowing highlight
      </Title>
    </Vertical>
  );
};
