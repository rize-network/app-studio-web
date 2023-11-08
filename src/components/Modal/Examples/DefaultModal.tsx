import React from 'react';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';

import Modal from '../Modal';
import { hideModal, showModal } from '../Modal/Modal.store';

export const DefaultModal = () => {
  return (
    <>
      <Button onClick={() => showModal('DefaultModal')} isAuto>
        Blur Overlay
      </Button>
      <Modal.Layout
        modals={{
          DefaultModal: () => (
            <Modal.Container>
              <Modal.Header>
                <Text size="lg" weight="semiBold">
                  Title
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Text>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo
                  odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                  risus, porta ac consectetur ac, vestibulum at eros. Praesent
                  commodo cursus magna, vel scelerisque nisl consectetur et.
                </Text>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={hideModal}>Cancel</Button>
              </Modal.Footer>
            </Modal.Container>
          ),
        }}
      />
    </>
  );
};
