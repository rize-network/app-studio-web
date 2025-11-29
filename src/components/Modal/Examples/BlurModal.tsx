import React from 'react';
import { Button } from '../../Button/Button';
import { Text } from 'app-studio';
import { Modal } from '../Modal';
import { hideModal, showModal } from '../Modal/Modal.store';
export const BlurModal = () => {
  return (
    <>
      <Button onClick={() => showModal('BlurModal')} isAuto>
        Blur Overlay
      </Button>
      <Modal.Layout
        modals={{
          BlurModal: () => (
            <Modal.Container>
              <Modal.Header buttonPosition="none">
                <Text size="lg" weight="semiBold">
                  Title
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Text maxLines={2}>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo
                  odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                  risus, porta ac consectetur ac, vestibulum at eros. Praesent
                  commodo cursus magna, vel scelerisque nisl consectetur et.
                </Text>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => hideModal()}>Cancel</Button>
              </Modal.Footer>
            </Modal.Container>
          ),
        }}
      />
    </>
  );
};
