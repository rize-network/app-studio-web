import React from 'react';
import { Button } from '../Button';
import { Vertical } from 'app-studio';

export const BorderRevealButtons = () => (
  <Vertical gap={15}>
    <Button animation="borderReveal" variant="filled">
      Border Reveal Default
    </Button>
    <Button
      animation="borderReveal"
      variant="filled"
      borderMovingDuration={1}
      borderMovingGradientColors={['#705CFF']} // Single color for solid fill
    >
      Fast Reveal (Blue)
    </Button>
    <Button
      animation="borderReveal"
      variant="filled"
      borderMovingDuration={2}
      borderMovingGradientColors={['#FF5C97']}
    >
      Pink Reveal (Normal)
    </Button>
    <Button
      animation="borderReveal"
      variant="outline"
      borderMovingGradientColors={['#000000']}
    >
      Black Reveal (Outline)
    </Button>
  </Vertical>
);
