import React from 'react';
import { Button } from '../Button';
import { Horizontal } from 'app-studio';

export const ExternalButton = () => (
  <Horizontal gap={10}>
    <Button type="button" autofocus>
      Button
    </Button>
    <Button type="submit">Button</Button>
  </Horizontal>
);
