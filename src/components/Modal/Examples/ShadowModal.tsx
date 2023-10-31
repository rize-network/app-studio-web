import React, { useState } from 'react';
import { Button, Text } from 'src/components';

import Modal from '../Modal';

export const ShadowModal = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button onClick={() => setShow(true)} isAuto>
        Shadow
      </Button>

      {show && (
        <Modal.Overlay isOpen={show} onClose={() => setShow(false)}>
          <Modal.Container shadow={{ boxShadow: '0px 7px 8px rgba(0, 0, 0, 0.6)' }}>
            <Modal.Body>
              <Text isTruncated maxLines={2}>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                scelerisque nisl consectetur et.
              </Text>
            </Modal.Body>
          </Modal.Container>
        </Modal.Overlay>
      )}
    </>
  );
};
