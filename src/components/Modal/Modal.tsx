import React from 'react';

import { ModalType } from './Modal/Modal.props';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from './Modal/Modal.view';
import { ModalLayout } from './Modal/Modal.layout';

/**
 * It is a custom content overlay that appears on top of the main screen.
 */
// eslint-disable-next-line react/prop-types
export const Modal: ModalType = ({ children }) => <>{children}</>;

Modal.Overlay = ModalOverlay;
Modal.Container = ModalContainer;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Layout = ModalLayout;

export * from './Modal/Modal.store';
