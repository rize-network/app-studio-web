import React from 'react';
import { Button } from '../../Button/Button';
import { Text } from 'app-studio';
import { Horizontal } from 'app-studio';

import { Modal } from '../Modal';
import { showModal } from '../Modal/Modal.store';

export const ModalPosition = () => {
  return (
    <>
      <Horizontal gap={10} flexWrap="nowrap">
        <Button
          onClick={() => showModal('ModalPosition', {}, { position: 'top' })}
        >
          Top
        </Button>
        <Button
          onClick={() => showModal('ModalPosition', {}, { position: 'bottom' })}
        >
          Bottom
        </Button>
        <Button
          onClick={() => showModal('ModalPosition', {}, { position: 'right' })}
        >
          Right
        </Button>
        <Button
          onClick={() => showModal('ModalPosition', {}, { position: 'left' })}
        >
          Left
        </Button>
        <Button
          onClick={() => showModal('ModalPosition', {}, { position: 'center' })}
        >
          Center
        </Button>
      </Horizontal>
      <Modal.Layout
        modals={{
          ModalPosition: () => (
            <Modal.Container width="fit-content">
              <Modal.Body>
                <Text color="theme-error" weight="bold">
                  Unknown Error
                </Text>
              </Modal.Body>
            </Modal.Container>
          ),
        }}
      />
    </>
  );
};
