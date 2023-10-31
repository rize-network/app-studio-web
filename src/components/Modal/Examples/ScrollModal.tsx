import React, { useState } from 'react';
import { Button, Text } from '../..';

import Modal from '../Modal';

export const ScrollModal = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button onClick={() => setShow(true)} isAuto>
        Scroll
      </Button>
      {show && (
        <Modal.Overlay isOpen={show} onClose={() => setShow(false)}>
          <Modal.Container>
            <Modal.Header buttonPosition="none">
              <Text size="lg" weight="semiBold">
                Title
              </Text>
            </Modal.Header>
            <Modal.Body height="200px">
              Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras
              mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis
              consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis
              consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis
              consectetur purus sit amet Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus
              sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet
              fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet
              fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet
              fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet
              fermentum.
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
