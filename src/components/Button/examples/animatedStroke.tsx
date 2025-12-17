import React from 'react';
import { Button } from '../Button';
import { Vertical } from 'app-studio';

export const AnimatedStrokeButtons = () => (
  <Vertical gap={15}>
    <Button animation="animatedStroke" variant="ghost">
      Hover Me
    </Button>
    <Button
      animation="animatedStroke"
      variant="ghost"
      animatedStrokeAccentColor="color.red.400"
      animatedStrokeTextColor="color.red.400"
    >
      Custom Red
    </Button>
    <Button
      animation="animatedStroke"
      variant="ghost"
      animatedStrokeAccentColor="#2dd4bf"
      animatedStrokeTextColor="color.blueGray.800"
    >
      Teal Stroke
    </Button>
  </Vertical>
);
