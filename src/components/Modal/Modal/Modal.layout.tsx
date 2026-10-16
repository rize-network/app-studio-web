import React, { Fragment, useEffect } from 'react';
import { ModalState, hideModal, useModalStore } from './Modal.store';
import { ModalOverlay } from './Modal.view';
import { ModalLayoutProps } from './Modal.props';
// Defines the `ModalLayout` functional component, which is responsible for orchestrating and rendering multiple active modals based on their state.
export const ModalLayout = ({
  // Prop: `availableModals` is an object containing all possible modal components, keyed by their unique names, allowing for dynamic selection and rendering.
  modals: availableModals,
  // Prop: `onShow` is an optional callback function to be executed whenever a modal is displayed.
  onShow,
  // Prop: `onHide` is an optional callback function to be executed whenever a modal is hidden.
  onHide,
}: ModalLayoutProps) => {
  // Retrieves the list of currently active modals from the global modal store, determining which modals need to be rendered.
  const activeModals = useModalStore((state: ModalState) => state.modals);
  // Synchronizes the `onShow` callback prop with the modal store's internal `setOnShow` action, ensuring the store can trigger this callback.
  useEffect(() => {
    if (onShow) {
      useModalStore.getState().setOnShow(onShow);
    }
  }, [onShow]);
  // Synchronizes the `onHide` callback prop with the modal store's internal `setOnHide` action, ensuring the store can trigger this callback.
  useEffect(() => {
    if (onHide) {
      useModalStore.getState().setOnHide(onHide);
    }
  }, [onHide]);
  // Conditionally renders nothing if there are no active modals, optimizing performance by avoiding unnecessary component trees.
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
