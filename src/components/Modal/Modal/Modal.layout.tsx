import React, { Fragment } from 'react';
import { ModalState, hideModal, useModalStore } from './Modal.store';
import { ModalOverlay } from './Modal.view';
import { ModalLayoutProps } from './Modal.props';

export const ModalLayout = ({
  modals: availableModals,
  onShow,
  onHide,
}: ModalLayoutProps) => {
  const activeModals = useModalStore((state: ModalState) => state.modals);

  if (onShow) {
    useModalStore.getState().setOnShow(onShow);
  }

  if (onHide) {
    useModalStore.getState().setOnHide(onHide);
  }

  if (activeModals.length === 0) {
    return null;
  }

  return (
    <Fragment>
      {activeModals.map((modal: any, index: number) => {
        const ModalComponent = availableModals[modal.name];

        if (!ModalComponent) {
          console.error(`${modal.name} modal doesn't exist`);
          return null;
        }

        return (
          <ModalOverlay
            key={index}
            isOpen={modal.props.isVisible}
            onClose={() => hideModal(modal.name)}
            blur={5}
            {...modal.overlayProps}
            style={{ zIndex: 1000 + index }}
          >
            <ModalComponent {...modal.props} />
          </ModalOverlay>
        );
      })}
    </Fragment>
  );
};
