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
// This file defines the main Modal component, which acts as a compound component. It groups and exports various sub-components (Overlay, Container, Header, Body, Footer, and Layout) as static properties, providing a flexible and structured way to compose modal dialogs.
export const Modal: ModalType = ({ children }) => <>{children}</>;
Modal.Overlay = ModalOverlay;
Modal.Container = ModalContainer;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Layout = ModalLayout;
export * from './Modal/Modal.store';
