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

/**
 * Toast component for displaying temporary notifications
 */
const ToastComponent: React.FC<ToastProps> = (props) => {
  return <ToastView {...props} />;
};

// Create a Toast object with static methods
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

export { Toast };
