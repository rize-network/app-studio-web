import React from 'react';
import { Title } from '../Title';
import { Vertical } from 'app-studio';

/**
 * Default Title examples
 */
export const DefaultTitle = () => {
  return (
    <Vertical gap={32}>
      <Title>Simple Hero Title</Title>

      <Title size="xl">Larger Hero Title</Title>

      <Title size="xl" centered>
        Centered Hero Title
      </Title>
    </Vertical>
  );
};
