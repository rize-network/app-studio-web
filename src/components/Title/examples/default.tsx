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
      <Title size="xl">Extra Large Title (xl - default)</Title>
      <Title size="2xl">2XL Title</Title>
      <Title size="3xl">3XL Title</Title>
      <Title size="4xl">4XL Title</Title>
      <Title size="5xl">5XL Title</Title>
      <Title size="6xl">6XL Title</Title>
    </Vertical>
  );
};
