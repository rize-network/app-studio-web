import React from 'react';

export interface AppRootProps {
  children: React.ReactNode;
  /**
   * Extra props forwarded to app-studio's `ThemeProvider` (e.g. `theme`,
   * `themeMode`). Kept permissive so AppRoot tracks ThemeProvider without
   * re-declaring its surface.
   */
  [key: string]: any;
}
