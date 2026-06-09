/**
 * Portal (React Native) – there is no DOM portal target on RN, so we just
 * render children inline. Consumers that need true overlay behaviour should
 * use the RN-native <Modal/> (already used by ModalOverlay / Drawer /
 * Tooltip's .native views).
 */

import React from 'react';

interface PortalProps {
  children: React.ReactNode;
  containerId?: string;
}

export const Portal: React.FC<PortalProps> = ({ children }) => <>{children}</>;
export default Portal;
