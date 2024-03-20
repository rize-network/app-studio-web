import React from 'react';
import { Button } from 'src/components/Button/Button';
import { Horizontal } from 'src/components/Layout/Horizontal/Horizontal';

export const EffectButton = () => (
  <Horizontal gap={10}>
    <Button effect="hover">Hover</Button>
    <Button colorScheme="theme.error" variant="ghost" effect="hover">
      Hover
    </Button>
    <Button colorScheme="theme.secondary" variant="outline" effect="reverse">
      Reverse
    </Button>
    <Button colorScheme="theme.warning" variant="link" effect="reverse">
      Reverse
    </Button>
  </Horizontal>
);
