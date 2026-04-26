import React from 'react';
import { ButtonProps } from '../../Button/Button/Button.props';
// Defines a type alias for the data structure used by the Web Share API's `navigator.share` method.
export type NavigatorShareData = Parameters<Navigator['share']>[0];
// Defines the main properties for the ShareButton component, extending standard button properties while customizing the click handler.
export interface ShareButtonProps extends Omit<ButtonProps, 'onClick'> {
  // Specifies the data (e.g., URL, text, title) to be shared using the Web Share API.
  shareData: NavigatorShareData;
  // Defines the content displayed within the share button, which can be any React node.
  label?: React.ReactNode;
  // A callback function executed just before the sharing process is initiated.
  onShareStart?: () => void;
  // A callback function executed when the sharing operation successfully completes.
  onShareSuccess?: () => void;
  // A callback function executed if the user cancels the sharing dialog.
  onShareCancel?: () => void;
  // A callback function executed if an error occurs during the sharing process, providing the error object.
  onShareError?: (error: unknown) => void;
  // A callback function executed if the Web Share API is not supported by the user's browser.
  onUnsupported?: () => void;
  // A boolean property that determines whether the share button should be disabled if the Web Share API is unsupported.
  disableWhenUnsupported?: boolean;
  // An optional click handler for the button, overriding the default `onClick` from `ButtonProps`.
  onClick?: ButtonProps['onClick'];
}
// Defines the properties specifically for the presentational view component of the ShareButton.
export interface ShareButtonViewProps
  // Extends `ShareButtonProps` but omits properties handled by the container component, simplifying the view's responsibilities.
  extends Omit<
    ShareButtonProps,
    | 'shareData'
    | 'onShareStart'
    | 'onShareSuccess'
    | 'onShareCancel'
    | 'onShareError'
    | 'onUnsupported'
    | 'onClick'
  > {
  // A boolean indicating whether the Web Share API is supported in the current browser environment.
  isSupported: boolean;
  // A boolean indicating if a sharing operation is currently active (e.g., the share dialog is open).
  isSharing: boolean;
  // The event handler triggered when the view's button is clicked, initiating the sharing action.
  onShare: ButtonProps['onClick'];
}
