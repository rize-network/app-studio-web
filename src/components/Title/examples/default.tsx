import React from 'react';
import { Vertical } from 'app-studio';
import { Title } from '../Title';

/**
 * Default Title examples showing different sizes
 */
export const DefaultTitle = () => {
  return (
    <Vertical gap={32}>
      <Title size="xs">Extra Small Title (xs)</Title>
      <Title size="sm">Small Title (sm)</Title>
      <Title size="md">Medium Title (md)</Title>
      <Title size="lg">Large Title (lg)</Title>
      <Title size="xl">Extra Large Title</Title>
    </Vertical>
  );
};
