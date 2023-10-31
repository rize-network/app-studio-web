import React from 'react';
import { Button, Horizontal } from 'src/components';

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
