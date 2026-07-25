import React from 'react';
import { ViewProps } from 'app-studio';

export interface KeyboardAvoidingViewProps extends ViewProps {
  /**
   * How the view reacts to the on-screen keyboard (native only). Defaults to
   * 'padding' on iOS and 'height' on Android — the combination that behaves
   * best in practice. Ignored on web.
   */
  behavior?: 'height' | 'position' | 'padding';
  /**
   * Distance between the top of the keyboard and the focused field (native
   * only) — e.g. to account for a fixed header. Ignored on web.
   */
  keyboardVerticalOffset?: number;
  /**
   * When true, tapping an empty (non-input) area dismisses the keyboard
   * (native only). Web browsers reflow around their own keyboard, so this is a
   * no-op there.
   */
  dismissOnTap?: boolean;
  /** Enable/disable the avoiding behavior (native only). Default true. */
  enabled?: boolean;
  children?: React.ReactNode;
}
