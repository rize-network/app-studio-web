import React from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { showMessage } from '../Message/Message.store';
import { Message } from '../Message/Message.type';

export const VariantDemo = () => {
  return (
    <Horizontal gap={10}>
      {['info', 'error', 'warning', 'success'].map((variant, index) => (
        <Button
          key={index}
          onClick={() =>
            showMessage(
              variant as Message,
              `${variant.toUpperCase()} toast here!`
            )
          }
          isAuto
        >
          Show Toast
        </Button>
      ))}
    </Horizontal>
  );
};
