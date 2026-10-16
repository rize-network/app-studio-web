import React from 'react';
import { ViewProps } from 'app-studio';

export interface PageLayoutViews {
  container?: ViewProps;
  header?: ViewProps;
  content?: ViewProps;
  footer?: ViewProps;
}

export interface PageLayoutProps extends ViewProps {
  /** Pinned header rendered above the scrollable content. */
  header?: React.ReactNode;
  /**
   * Pinned footer (e.g. a submit bar). It rides above the keyboard on native
   * because it sits inside the keyboard-avoiding region.
   */
  footer?: React.ReactNode;
  /** Replace the content with a centered Loader. */
  isLoading?: boolean;
  /** Apply device safe-area insets to the outer container. Default true. */
  safe?: boolean;
  /** Make the content area scroll when it overflows. Default true. */
  scrollable?: boolean;
  /** Tap an empty area to dismiss the keyboard (native only). Default true. */
  dismissKeyboardOnTap?: boolean;
  /** Offset for the keyboard-avoiding region, e.g. a fixed header height. */
  keyboardVerticalOffset?: number;
  /** Per-slot style overrides. */
  views?: PageLayoutViews;
  children?: React.ReactNode;
}
