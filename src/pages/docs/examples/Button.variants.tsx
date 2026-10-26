import React from 'react';
import { Button } from 'src/components/Button/Button';
import { Horizontal } from 'app-studio';

export function ButtonVariantsExample() {
  return (
    <Horizontal gap={12} flexWrap="wrap">
      {(['filled', 'outline', 'ghost', 'subtle'] as const).map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </Horizontal>
  );
}
