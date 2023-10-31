import React from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

export const ExternalButton = () => (
  <Horizontal gap={10}>
    <Button colorScheme="theme.secondary" type="button" autofocus>
      Button
    </Button>
    <Button colorScheme="theme.secondary" type="submit">
      Button
    </Button>
  </Horizontal>
);
