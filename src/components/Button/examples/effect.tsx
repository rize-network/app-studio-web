import React from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

export const EffectButton = () => (
  <Horizontal gap={10}>
    <Button effect="hover">Hover</Button>
    <Button variant="ghost" effect="hover">
      Hover
    </Button>
    <Button variant="outline" effect="reverse">
      Reverse
    </Button>
    <Button variant="link" effect="reverse">
      Reverse
    </Button>
  </Horizontal>
);
