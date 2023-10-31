import { useState } from 'react';
import React from 'react';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';

import Modal from '../Modal';

export const BlurModal = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button onClick={() => setShow(true)} isAuto>
        Blur Overlay
      </Button>

      {show && (
        <Modal.Overlay isOpen={show} onClose={() => setShow(false)} blur={10}>
          <Modal.Container>
            <Modal.Header buttonPosition="none">
              <Text size="lg" weight="semiBold">
                Title
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Text isTruncated maxLines={2}>
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
