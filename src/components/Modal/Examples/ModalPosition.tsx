import React, { useState } from 'react';
import { Button, Horizontal, Text } from 'src/components';

import Modal from '../Modal';

export const ModalPosition = () => {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showCenter, setShowCenter] = useState(false);

  const content = (
    <Modal.Container width="fit-content">
      <Modal.Body>
        <Text color="theme.error" weight="bold">
          Unknown Error
        </Text>
      </Modal.Body>
    </Modal.Container>
  );

  return (
    <>
      <Horizontal gap={10} wrap="nowrap">
        <Button onClick={() => setShowTop(true)}>Top</Button>
        <Button onClick={() => setShowBottom(true)}>Bottom</Button>
        <Button onClick={() => setShowRight(true)}>Right</Button>
        <Button onClick={() => setShowLeft(true)}>Left</Button>
        <Button onClick={() => setShowCenter(true)}>Center</Button>
      </Horizontal>

      {showTop && (
        <Modal.Overlay isOpen={showTop} onClose={() => setShowTop(false)} position="top">
          {content}
        </Modal.Overlay>
      )}
      {showBottom && (
        <Modal.Overlay isOpen={showBottom} onClose={() => setShowBottom(false)} position="bottom">
          {content}
        </Modal.Overlay>
      )}
      {showRight && (
        <Modal.Overlay isOpen={showRight} onClose={() => setShowRight(false)} position="right">
          {content}
        </Modal.Overlay>
      )}

      {showLeft && (
        <Modal.Overlay isOpen={showLeft} onClose={() => setShowLeft(false)} position="left">
          {content}
        </Modal.Overlay>
      )}
      {showCenter && (
        <Modal.Overlay isOpen={showCenter} onClose={() => setShowCenter(false)} position="center">
          {content}
        </Modal.Overlay>
      )}
    </>
  );
};
