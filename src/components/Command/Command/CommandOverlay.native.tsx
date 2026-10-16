import React from 'react';
import { ActionSheet } from '../../ActionSheet/ActionSheet';

/**
 * CommandOverlay (React Native) — render the command palette as a bottom sheet
 * (ActionSheet), the default native overlay behaviour shared with Select /
 * DropdownMenu / ContextMenu / Menubar / pickers. It only mounts while the
 * palette is open, so the sheet is always visible; `onClose` dismisses it.
 */
export const CommandOverlay: React.FC<{
  onClose?: () => void;
  children: React.ReactNode;
  [key: string]: any;
}> = ({ onClose, children }) => (
  <ActionSheet isOpen onClose={onClose} showHandle maxHeight="80%">
    {children}
  </ActionSheet>
);
