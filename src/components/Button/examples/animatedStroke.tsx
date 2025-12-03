import React from 'react';
import { Button } from '../Button';
import { Vertical } from 'app-studio';

export const AnimatedStrokeButtons = () => (
  <Vertical gap={15}>
    <Button variant="animatedStroke">Hover Me</Button>
    <Button
      variant="animatedStroke"
      animatedStrokeAccentColor="color.red.400"
      animatedStrokeTextColor="color.red.400"
    >
      Custom Red
    </Button>
    <Button
      variant="animatedStroke"
      animatedStrokeAccentColor="color.teal.400"
      animatedStrokeTextColor="color.blueGray.800"
    >
      Teal Stroke
    </Button>
  </Vertical>
);
