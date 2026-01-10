import React, { useState, useCallback, useEffect, useRef } from 'react';

export interface ContextElement {
  id: string;
  name: string;
  tagName: string;
  rect: DOMRect;
}

interface UseContextSelectorProps {
  onSelect: (element: ContextElement) => void;
  onCancel: () => void;
  active: boolean;
}

export function useContextSelector({
  onSelect,
  onCancel,
  active,
}: UseContextSelectorProps) {
  const [highlightedElement, setHighlightedElement] =
    useState<ContextElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Handle mouse move to consistently highlight elements
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!active) return;

      const target = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement;

      // Ignore if targeting the overlay itself or the widget
      if (
        !target ||
        target === document.body ||
        target.closest('[data-chatwidget-ignore="true"]') ||
        target.closest('#chatwidget-overlay')
      ) {
        setHighlightedElement(null);
        return;
      }

      const rect = target.getBoundingClientRect();

      // Compute a helpful name
      let name = target.tagName.toLowerCase();
      if (target.id) name += `#${target.id}`;
      else if (target.className && typeof target.className === 'string') {
        // Just take the first class for brevity
        const firstClass = target.className.split(' ')[0];
        if (firstClass) name += `.${firstClass}`;
      }

      // Get some text content if available for better context
      const text = target.innerText?.slice(0, 20);
      if (text) name += ` ("${text}...")`;

      setHighlightedElement({
        id: target.id || `el-${Date.now()}`,
        name,
        tagName: target.tagName.toLowerCase(),
        rect,
      });
    },
    [active]
  );

  // Handle click to select
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!active) return;

      // If clicking inside the widget, don't trigger selection
      const target = e.target as HTMLElement;
      if (target.closest('[data-chatwidget-ignore="true"]')) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (highlightedElement) {
        onSelect(highlightedElement);
      }
    },
    [active, highlightedElement, onSelect]
  );

  // Handle escape to cancel
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!active) return;

      if (e.key === 'Escape') {
        onCancel();
      }
    },
    [active, onCancel]
  );

  useEffect(() => {
    if (active) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('click', handleClick, true); // Capture phase to prevent default
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.cursor = 'crosshair';
    } else {
      setHighlightedElement(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.cursor = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.cursor = '';
    };
  }, [active, handleMouseMove, handleClick, handleKeyDown]);

  return { highlightedElement };
}

/**
 * Overlay component to render the highlight box
 */
export function ContextOverlay({
  element,
}: {
  element: ContextElement | null;
}) {
  if (!element) return null;

  return (
    <div
      id="chatwidget-overlay"
      style={{
        position: 'fixed',
        top: element.rect.top,
        left: element.rect.left,
        width: element.rect.width,
        height: element.rect.height,
        border: '2px solid #2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'all 0.1s ease-out',
        borderRadius: '4px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-24px',
          left: '0',
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
        }}
      >
        {element.name}
      </div>
    </div>
  );
}
