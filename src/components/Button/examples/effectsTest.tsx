import React from 'react';
import { Button } from '../Button';
import { Vertical } from 'app-studio';

export const EffectsTestButtons = () => (
  <Vertical gap={20}>
    {/* Standard variants */}
    <Button variant="filled">Filled Button</Button>
    <Button variant="outline">Outline Button</Button>
    <Button variant="ghost">Ghost Button</Button>
    <Button variant="link">Link Button</Button>

    {/* New effect variants */}
    <Button animation="borderMoving" variant="filled">
      Border Moving Button
    </Button>
    <Button animation="animatedStroke" variant="ghost">
      Animated Stroke Button
    </Button>

    {/* Effect variants with custom props */}
    <Button
      animation="borderMoving"
      variant="filled"
      borderMovingDuration={1}
      borderMovingGradientColors={[
        'color.red.500',
        'color.green.500',
        'color.blue.500',
      ]}
    >
      Fast Red/Green/Blue
    </Button>

    <Button
      animation="animatedStroke"
      variant="ghost"
      animatedStrokeAccentColor="color.red.400"
      animatedStrokeTextColor="color.red.400"
    >
      Red Stroke Effect
    </Button>
  </Vertical>
);
