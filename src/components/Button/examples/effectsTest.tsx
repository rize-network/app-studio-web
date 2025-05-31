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
    <Button variant="borderMoving">Border Moving Button</Button>
    <Button variant="animatedStroke">Animated Stroke Button</Button>

    {/* Effect variants with custom props */}
    <Button
      variant="borderMoving"
      borderMovingDuration={1}
      borderMovingGradientColors={['#FF0000', '#00FF00', '#0000FF']}
    >
      Fast Red/Green/Blue
    </Button>

    <Button
      variant="animatedStroke"
      animatedStrokeAccentColor="#FF6B6B"
      animatedStrokeTextColor="#FF6B6B"
    >
      Red Stroke Effect
    </Button>
  </Vertical>
);
