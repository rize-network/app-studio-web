import React from 'react';
import { Button } from '../../Button/Button';

import { Modal } from '../Modal';
import { hideModal, showModal } from '../Modal/Modal.store';

export const FullScreenModal = () => {
  return (
    <>
      <Button onClick={() => showModal('FullScreenModal')} isAuto>
        Full Screen
      </Button>
      <Modal.Layout
        modals={{
          FullScreenModal: () => (
            <Modal.Container isFullScreen>
              <Modal.Header>Title</Modal.Header>
              <Modal.Body>
                Cras mattis consectetur purus sit amet fermentum. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                risus, porta ac consectetur ac, vestibulum at eros. Praesent
                commodo cursus magna, vel scelerisque nisl consectetur et.
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
