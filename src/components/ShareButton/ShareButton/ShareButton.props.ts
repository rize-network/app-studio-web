import type { ReactNode } from 'react';
import type { ButtonProps } from '../../Button/Button/Button.props';

export type ShareButtonData =
  | ShareData
  | (() => ShareData | Promise<ShareData>);

export interface ShareButtonCallbacks {
  onShareStart?: (data: ShareData) => void;
  onShareSuccess?: (data: ShareData) => void;
  onShareError?: (error: Error, data: ShareData) => void;
  onShareComplete?: (data: ShareData) => void;
  onUnsupported?: (data: ShareData) => void;
  fallback?: (data: ShareData) => void;
}

export interface ShareButtonOptions extends ShareButtonCallbacks {
  data?: ShareButtonData;
  disableWhenUnsupported?: boolean;
  unsupportedText?: ReactNode;
}

export type ShareButtonStateOptions = Pick<
  ShareButtonOptions,
  'data' | keyof ShareButtonCallbacks
>;

export interface ShareButtonProps
  extends Omit<ButtonProps, 'onClick'>,
    ShareButtonOptions {}

export interface ShareButtonViewProps
  extends Omit<ButtonProps, 'onClick'> {
  onShare: () => void;
  isShareSupported: boolean;
  isSharing: boolean;
  disableWhenUnsupported?: boolean;
  unsupportedText?: ReactNode;
}
