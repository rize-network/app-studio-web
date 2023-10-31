import React, { useState } from 'react';
import { Button } from '../../Button/Button';

import Modal from '../Modal';

export const FullScreenModal = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button onClick={() => setShow(true)} isAuto>
        Full Screen
      </Button>
      <Modal.Overlay isOpen={show} onClose={() => setShow(false)}>
        <Modal.Container isFullScreen>
          <Modal.Header>Title</Modal.Header>
          <Modal.Body>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShow(false)}>Cancel</Button>
          </Modal.Footer>
        </Modal.Container>
      </Modal.Overlay>
    </>
  );
};
