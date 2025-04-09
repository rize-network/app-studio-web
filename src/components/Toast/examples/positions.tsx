import React from 'react';
import { Button } from '../../Button/Button';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Toast } from '../Toast';
import { ToastPosition } from '../Toast/Toast.type';

export const ToastPositions = () => {
  const showToastAtPosition = (position: ToastPosition) => {
    Toast.info(
      `${position} Toast`,
      `This toast appears at the ${position} position.`,
      { position }
    );
  };

  return (
    <Vertical gap={16}>
      <Horizontal gap={10}>
        <Button onClick={() => showToastAtPosition('top-left')}>
          Top Left
        </Button>
        <Button onClick={() => showToastAtPosition('top')}>Top</Button>
        <Button onClick={() => showToastAtPosition('top-right')}>
          Top Right
        </Button>
      </Horizontal>

      <Horizontal gap={10}>
        <Button onClick={() => showToastAtPosition('bottom-left')}>
          Bottom Left
        </Button>
        <Button onClick={() => showToastAtPosition('bottom')}>Bottom</Button>
        <Button onClick={() => showToastAtPosition('bottom-right')}>
          Bottom Right
        </Button>
      </Horizontal>
    </Vertical>
  );
};
