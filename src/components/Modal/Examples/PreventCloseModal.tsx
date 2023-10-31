import React, { useState } from 'react';
import { Button } from '../..';

import Modal from '../Modal';

export const PreventClose = () => {
  const [prevent, setPrevent] = useState(false);
  return (
    <>
      <Button onClick={() => setPrevent(true)} isAuto>
        Prevent Close Button on Overlay
      </Button>

      {prevent && (
        <Modal.Overlay isOpen={prevent} onClose={() => setPrevent(false)} isClosePrevented>
          <Modal.Container>
            <Modal.Header> Prevent Close Button on Overlay</Modal.Header>
            <Modal.Body>Cras mattis consectetur purus sit amet fermentum.</Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setPrevent(false)}>Cancel</Button>
            </Modal.Footer>
          </Modal.Container>
        </Modal.Overlay>
      )}
    </>
  );
};
