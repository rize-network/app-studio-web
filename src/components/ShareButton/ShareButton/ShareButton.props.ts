import React from 'react';
import { ButtonProps } from '../../Button/Button/Button.props';

/**
 * Properties for the ShareButton component.
 * Extends the design-system Button while wiring the Web Share API workflow.
 */
export interface ShareButtonProps extends Omit<ButtonProps, 'onClick'> {
  /** Data passed to the `navigator.share` call. */
  shareData: NavigatorShareData;
  /** Optional label rendered when no custom children are provided. Defaults to "Share". */
  label?: React.ReactNode;
  /** Called immediately before invoking the Web Share API. */
  onShareStart?: () => void;
  /** Called when the share sheet completes successfully. */
  onShareSuccess?: () => void;
  /** Called when the user dismisses the native share sheet. */
  onShareCancel?: () => void;
  /** Called when the share operation throws an unexpected error. */
  onShareError?: (error: unknown) => void;
  /** Called when the Web Share API is not available for the provided data. */
  onUnsupported?: () => void;
  /**
   * When true the button is disabled if the Web Share API is unavailable.
   * Defaults to true to avoid misleading interactions.
   */
  disableWhenUnsupported?: boolean;
  /** Additional click handler fired alongside the share workflow. */
  onClick?: ButtonProps['onClick'];
}

export interface ShareButtonViewProps
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
  /** Flag indicating if the current environment can use the Web Share API. */
  isSupported: boolean;
  /** True while awaiting the native share sheet to resolve. */
  isSharing: boolean;
  /** Internal handler that triggers the sharing flow. */
  onShare: ButtonProps['onClick'];
}
