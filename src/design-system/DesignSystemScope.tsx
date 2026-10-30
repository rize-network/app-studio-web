import React from 'react';
import { DesignSystemScopeProps } from './types';

/**
 * Marks the design system's subtree for CSS (`[data-design-system]`,
 * `[data-appearance]`) without adding a layout box. Native twin:
 * DesignSystemScope.native, which has no DOM to mark.
 */
export const DesignSystemScope: React.FC<DesignSystemScopeProps> = ({
  children,
  id,
  appearance,
}) => (
  <div
    data-design-system={id}
    data-appearance={appearance}
    style={{ display: 'contents' }}
  >
    {children}
  </div>
);
