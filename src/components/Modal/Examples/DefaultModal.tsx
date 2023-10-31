import React, { useState } from 'react';
import { Button, Text } from '../..';

import Modal from '../Modal';

export const DefaultModal = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)} isAuto>
        Blur Overlay
      </Button>

      {show && (
        <Modal.Overlay isOpen={show} onClose={() => setShow(false)}>
          <Modal.Container>
            <Modal.Header>
              <Text size="lg" weight="semiBold">
                Title
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Text>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                scelerisque nisl consectetur et.
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setShow(false)}>Cancel</Button>
            </Modal.Footer>
          </Modal.Container>
        </Modal.Overlay>
      )}
    </>
  );
};
