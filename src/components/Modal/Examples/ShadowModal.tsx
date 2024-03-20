import React from 'react';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';

import { Modal } from '../Modal';
import { showModal } from '../Modal/Modal.store';

export const ShadowModal = () => {
  return (
    <>
      <Button onClick={() => showModal('ShadowModal')} isAuto>
        Shadow
      </Button>
      <Modal.Layout
        modals={{
          ShadowModal: () => (
            <Modal.Container
              shadow={{ boxShadow: '0px 7px 8px rgba(0, 0, 0, 0.6)' }}
            >
              <Modal.Body>
                <Text isTruncated maxLines={2}>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo
                  odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                  risus, porta ac consectetur ac, vestibulum at eros. Praesent
                  commodo cursus magna, vel scelerisque nisl consectetur et.
                </Text>
              </Modal.Body>
            </Modal.Container>
          ),
        }}
      />
    </>
  );
};
