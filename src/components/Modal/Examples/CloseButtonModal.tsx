import React from 'react';
import { Button } from '../../Button/Button';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

import {Modal} from '../Modal';
import { hideModal, showModal } from '../Modal/Modal.store';

export const CloseButtonModal = () => {
  return (
    <>
      <Horizontal gap={10}>
        <Button
          onClick={() => showModal('CloseButtonModal', { canClose: true })}
          isAuto
        >
          With Close Button
        </Button>
        <Button
          onClick={() => showModal('CloseButtonModal', { canClose: false })}
          isAuto
        >
          Without Close Button
        </Button>
      </Horizontal>
      <Modal.Layout
        modals={{
          CloseButtonModal: ({ canClose = false }: any) => (
            <Modal.Container>
              {canClose && <Modal.Header buttonPosition="left" />}
              {canClose && (
                <Modal.Header buttonPosition="none">
                  Without Close Button
                </Modal.Header>
              )}

              <Modal.Body>
                Cras mattis consectetur purus sit amet fermentum.
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
