import React from 'react';
import { DesignSystemScopeProps } from './types';

/**
 * DesignSystemScope (native): React Native has no CSS selectors to mark the
 * subtree for, and a web `<div>` crashes the renderer, so the children render
 * as they are.
 */
export const DesignSystemScope: React.FC<DesignSystemScopeProps> = ({
  children,
}) => <>{children}</>;
