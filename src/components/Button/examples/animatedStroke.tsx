import React from 'react';
import { Button } from '../Button';
import { Vertical } from 'app-studio';

export const AnimatedStrokeButtons = () => (
  <Vertical gap={15}>
    <Button variant="animatedStroke">
      Hover Me
    </Button>
    <Button 
      variant="animatedStroke"
      animatedStrokeAccentColor="#FF6B6B"
      animatedStrokeTextColor="#FF6B6B"
    >
      Custom Red
    </Button>
    <Button 
      variant="animatedStroke"
      animatedStrokeAccentColor="#4ECDC4"
      animatedStrokeTextColor="#2C3E50"
    >
      Teal Stroke
    </Button>
  </Vertical>
);
