import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  containerId?: string;
}

export const Portal: React.FC<PortalProps> = ({
  children,
  containerId = 'portal-root',
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(containerId);
    let created = false;

    if (!element) {
      created = true;
      element = document.createElement('div');
      element.setAttribute('id', containerId);
      document.body.appendChild(element);
    }

    setContainer(element);

    return () => {
      // Clean up only if we created it and it's empty?
      // safer not to remove it if other components use it,
      // but if we created it, we might want to remove it if empty.
      // For simplicity, let's keep it.
      if (
        created &&
        element &&
        element.parentNode &&
        element.childNodes.length === 0
      ) {
        element.parentNode.removeChild(element);
      }
    };
  }, [containerId]);

  if (!container) return null;

  return ReactDOM.createPortal(children, container);
};
