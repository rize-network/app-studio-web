import React from 'react';
import { Button } from '../Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

export const ExternalButton = () => (
  <Horizontal gap={10}>
    <Button type="button" autofocus>
      Button
    </Button>
    <Button type="submit">Button</Button>
  </Horizontal>
);
