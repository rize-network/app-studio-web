import React from 'react';
import { Horizontal } from 'app-studio';
import { Button } from '../Button';
import { ButtonElement } from '../Button/Button.element';

// `ref` reaches the rendered <button> on web (the underlying view on native).
export const ButtonRef = () => {
  const target = React.useRef<ButtonElement>(null);
  return (
    <Horizontal gap={8}>
      <Button onClick={() => target.current?.focus()}>Focus the other</Button>
      <Button ref={target} variant="outline" onClick={() => {}}>
        Focus target
      </Button>
    </Horizontal>
  );
};
