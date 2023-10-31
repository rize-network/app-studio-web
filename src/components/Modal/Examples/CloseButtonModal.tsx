import React, { useState } from 'react';
import { Button, Horizontal } from 'src/components';

import Modal from '../Modal';

export const CloseButtonModal = () => {
  const [showWith, setShowWith] = useState(false);
  const [showWithout, setShowWithout] = useState(false);

  return (
    <>
      <Horizontal gap={10}>
        <Button onPress={() => setShowWith(true)} isAuto>
          With Close Button
        </Button>
        <Button onPress={() => setShowWithout(true)} isAuto>
          Without Close Button
        </Button>
      </Horizontal>
      {showWith && (
        <Modal.Overlay isOpen={showWith} onClose={() => setShowWith(false)}>
          <Modal.Container>
            <Modal.Header buttonPosition="left" />
            <Modal.Body>Cras mattis consectetur purus sit amet fermentum.</Modal.Body>
            <Modal.Footer>
              <Button onPress={() => setShowWith(false)}>Cancel</Button>
            </Modal.Footer>
          </Modal.Container>
        </Modal.Overlay>
      )}
      {showWithout && (
        <Modal.Overlay isOpen={showWithout} onClose={() => setShowWithout(false)}>
          <Modal.Container>
            <Modal.Header buttonPosition="none">Without Close Button</Modal.Header>
            <Modal.Body>Cras mattis consectetur purus sit amet fermentum.</Modal.Body>
            <Modal.Footer>
              <Button onPress={() => setShowWithout(false)}>Cancel</Button>
            </Modal.Footer>
          </Modal.Container>
        </Modal.Overlay>
      )}
    </>
  );
};
