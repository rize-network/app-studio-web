import React from 'react';

export interface AppRootProps {
  children: React.ReactNode;
  /**
   * Optional registry of named modals (`{ Name: ModalComponent }`). When
   * provided, AppRoot mounts the `ModalRouter` once at the root so any code can
   * drive them with `showModal('Name', props)` / `hideModal('Name')`.
   */
  modals?: { [name: string]: React.FC<any> };
  /** Called whenever a modal is shown (forwarded to the ModalRouter). */
  onModalShow?: (name: string, props?: any) => void;
  /** Called whenever a modal is hidden (forwarded to the ModalRouter). */
  onModalHide?: (name?: string, props?: any) => void;
  /**
   * Extra props forwarded to app-studio's `ThemeProvider` (e.g. `theme`,
   * `themeMode`). Kept permissive so AppRoot tracks ThemeProvider without
   * re-declaring its surface.
   */
  [key: string]: any;
}
