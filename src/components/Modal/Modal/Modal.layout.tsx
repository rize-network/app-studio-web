import React, { Fragment } from 'react';

import { ModalState, hideModal, useModalStore } from './Modal.store';
import { ModalOverlay } from './Modal.view';
import { ModalLayoutProps } from './Modal.props';

export const ModalLayout = ({ modals }: ModalLayoutProps) => {
  const modalStore = useModalStore(
    ({ modal, modalProps, overlayProps }: ModalState) => ({
      modal,
      modalProps,
      overlayProps,
    })
  );
  if (typeof modalStore.modal === 'boolean') {
    return null;
  }

  const Modal = modals[modalStore.modal];

  if (!Modal) {
    console.error(modalStore.modal + " modal doesn't exist");
    return null;
  }

  return (
    <Fragment>
      <ModalOverlay
        isOpen={modalStore.modalProps.isVisible}
        onClose={hideModal}
        blur={10}
        {...modalStore.overlayProps}
      >
        { Modal !== undefined && <Modal {...modalStore.modalProps} />}
      </ModalOverlay>
    </Fragment>
  );
};
