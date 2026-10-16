import React from 'react';
import { ToastView, ToastContainer } from './Toast/Toast.view';
import { ToastProps, ToastContainerProps } from './Toast/Toast.props';
import {
  showToast,
  showInfoToast,
  showSuccessToast,
  showWarningToast,
  showErrorToast,
  removeToast,
  removeAllToasts,
} from './Toast/Toast.store';
import { useToast as useToastHook } from './Toast/Toast.hook';
// This file serves as the primary export for the Toast component system, consolidating its core view, management functions (show, hide, various types), and the `useToast` hook into a single, unified interface for easy consumption throughout the application.
const ToastComponent: React.FC<ToastProps> = (props) => {
  return <ToastView {...props} />;
};
const Toast = Object.assign(ToastComponent, {
  Container: (props: ToastContainerProps) => <ToastContainer {...props} />,
  show: showToast,
  info: showInfoToast,
  success: showSuccessToast,
  warning: showWarningToast,
  error: showErrorToast,
  remove: removeToast,
  removeAll: removeAllToasts,
});
export const useToast = useToastHook;
export { Toast, showToast };
