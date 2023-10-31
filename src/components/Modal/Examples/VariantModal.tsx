import React, { useState } from 'react';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

import Modal from '../Modal';

export const VariantModal = () => {
  const [showSharp, setShowSharp] = useState(false);
  const [showRounded, setShowRounded] = useState(false);
  return (
    <>
      <Horizontal gap={10}>
        <Button onClick={() => setShowSharp(true)} isAuto>
          Sharp
        </Button>
        <Button onClick={() => setShowRounded(true)} isAuto>
          Rounded
        </Button>
      </Horizontal>

      {showSharp && (
        <Modal.Overlay isOpen={showSharp} onClose={() => setShowSharp(false)}>
          <Modal.Container shape="sharp">
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
      {showRounded && (
        <Modal.Overlay isOpen={showRounded} onClose={() => setShowRounded(false)}>
          <Modal.Container shape="rounded">
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
