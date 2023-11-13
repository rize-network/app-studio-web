import React from 'react';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

import {Modal} from '../Modal';
import { showModal } from '../Modal/Modal.store';

export const VariantModal = () => {
  return (
    <>
      <Horizontal gap={10}>
        <Button
          onClick={() => showModal('SharpModal', { shape: 'rounded' })}
          isAuto
        >
          Sharp
        </Button>
        <Button
          onClick={() => showModal('RoundedModal', { shape: 'sharp' })}
          isAuto
        >
          Rounded
        </Button>
      </Horizontal>
      <Modal.Layout
        modals={{
          SharpModal: () => (
            <Modal.Container>
              <Modal.Body>
                <Text isTruncated maxLines={2}>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo
                  odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                  risus, porta ac consectetur ac, vestibulum at eros. Praesent
                  commodo cursus magna, vel scelerisque nisl consectetur et.
                </Text>
              </Modal.Body>
            </Modal.Container>
          ),
          RoundedModal: () => (
            <Modal.Container shape="rounded">
              <Modal.Body>
                <Text isTruncated maxLines={2}>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo
                  odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                  risus, porta ac consectetur ac, vestibulum at eros. Praesent
                  commodo cursus magna, vel scelerisque nisl consectetur et.
                </Text>
              </Modal.Body>
            </Modal.Container>
          ),
        }}
      />
    </>
  );
};
