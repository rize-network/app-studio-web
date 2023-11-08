import React from 'react';
import { Button } from '../../Button/Button';

import Modal from '../Modal';
import { hideModal, showModal } from '../Modal/Modal.store';

export const PreventClose = () => {
  return (
    <>
      <Button
        onClick={() =>
          showModal('PreventClose', {}, { isClosePrevented: true })
        }
        isAuto
      >
        Prevent Close Button on Overlay
      </Button>
      <Modal.Layout
        modals={{
          PreventClose: () => (
            <Modal.Container>
              <Modal.Header> Prevent Close Button on Overlay</Modal.Header>
              <Modal.Body>
                Cras mattis consectetur purus sit amet fermentum.
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
