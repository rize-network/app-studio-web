import React from 'react';
import { Button } from '../Button';
import { Vertical } from 'app-studio';

export const BorderMovingButtons = () => (
  <Vertical gap={15}>
    <Button animation="borderMoving" variant="filled">
      Border Moving Effect
    </Button>
    <Button
      animation="borderMoving"
      variant="filled"
      borderMovingDuration={3}
      borderMovingGradientColors={['#FF6B6B', '#4ECDC4', '#45B7D1']}
    >
      Custom Colors & Speed
    </Button>
    <Button
      animation="borderMoving"
      variant="filled"
      borderMovingDuration={1}
      borderMovingGradientColors={['#FFA726', '#FF7043', '#EC407A']}
    >
      Fast Animation
    </Button>
  </Vertical>
);
