import React from 'react';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';

import {Modal} from '../Modal';
import { hideModal, showModal } from '../Modal/Modal.store';

export const ScrollModal = () => {
  return (
    <>
      <Button onClick={() => showModal('ScrollModal')} isAuto>
        Scroll
      </Button>
      <Modal.Layout
        modals={{
          ScrollModal: () => (
            <Modal.Container>
              <Modal.Header buttonPosition="none">
                <Text size="lg" weight="semiBold">
                  Title
                </Text>
              </Modal.Header>
              <Modal.Body height="200px">
                Cras mattis consectetur purus sit amet fermentum.Cras mattis
                consectetur purus sit amet fermentum.Cras mattis consectetur
                purus sit amet fermentum.Cras mattis consectetur purus sit amet
                fermentum.Cras mattis consectetur purus sit amet fermentum.Cras
                mattis consectetur purus sit amet fermentum.Cras mattis
                consectetur purus sit amet fermentum.Cras mattis consectetur
                purus sit amet fermentum.Cras mattis consectetur purus sit amet
                Cras mattis consectetur purus sit amet fermentum.Cras mattis
                consectetur purus sit amet fermentum.Cras mattis consectetur
                purus sit amet fermentum.Cras mattis consectetur purus sit amet
                fermentum.Cras mattis consectetur purus sit amet fermentum.Cras
                mattis consectetur purus sit amet fermentum.Cras mattis
                consectetur purus sit amet fermentum.Cras mattis consectetur
                purus sit amet fermentum.Cras mattis consectetur purus sit amet
                fermentum.Cras mattis consectetur purus sit amet fermentum.
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={hideModal}>Cancel</Button>
              </Modal.Footer>
            </Modal.Container>
          ),
        }}
      />
    </>
  );
};
