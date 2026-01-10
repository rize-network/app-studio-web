import React, { useState, useEffect, useRef } from 'react';
import { View, useElementPosition } from 'app-studio';
import { EditToolbar, ToolbarItem } from './EditToolbar';
import { EditPanel } from './EditPanel';

const TOOLBAR_ITEMS: ToolbarItem[] = [
  { id: 'download', icon: 'download', special: true },
  { id: 'style', icon: 'palette' },
  { id: 'text', icon: 'type' },
  { id: 'actions', icon: 'zap' },
  { id: 'format', icon: 'brush' },
  { id: 'move', icon: 'move' },
  { id: 'sync', icon: 'refresh-cw' },
  { id: 'info', icon: 'info' },
];

interface EditComponentProps {
  targetElement: HTMLElement | null;
  defaultToolId?: string;
  onClose?: () => void;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  variant?: 'floating' | 'overlay';
  items?: ToolbarItem[];
  onToolAction?: (id: string) => void;
}

export const EditComponent: React.FC<EditComponentProps> = ({
  targetElement,
  defaultToolId,
  onClose,
  side = 'right',
  sideOffset = 12,
  variant = 'floating',
  items = TOOLBAR_ITEMS,
  onToolAction,
}) => {
  const [activeToolId, setActiveToolId] = useState<string | undefined>(
    undefined
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const isOverlay = variant === 'overlay';

  // Use useElementPosition for intelligent positioning logic
  // mimicking HoverCard implementation
  const { ref: positionRef, relation } = useElementPosition({
    trackChanges: true,
    trackOnHover: false,
    trackOnScroll: true,
    trackOnResize: true,
  });

  // Sync the position ref with the target element
  useEffect(() => {
    if (targetElement && positionRef) {
      (positionRef as any).current = targetElement;
    }
    // Reset the active form when the element changes
    setActiveToolId(undefined);
  }, [targetElement, positionRef]);

  // Force re-render on scroll to update position
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const handleScroll = () => forceUpdate((n) => n + 1);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Lock the placement when target element changes (prevents shift when panel opens)
  const [lockedPlacement, setLockedPlacement] = useState<
    'top' | 'bottom' | 'left' | 'right' | null
  >(null);

  useEffect(() => {
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const spaces = {
        right: viewportWidth - rect.right,
        left: rect.left,
        top: rect.top,
        bottom: viewportHeight - rect.bottom,
      };
      const sorted = Object.entries(spaces).sort(([, a], [, b]) => b - a);
      setLockedPlacement(sorted[0][0] as 'top' | 'bottom' | 'left' | 'right');
    } else {
      setLockedPlacement(null);
    }
  }, [targetElement]);

  // Calculate position style
  const getPositionStyles = (): React.CSSProperties => {
    if (!targetElement) return { display: 'none' };

    const triggerRect = targetElement.getBoundingClientRect();

    if (isOverlay) {
      // Inner Top positioning
      return {
        position: 'fixed',
        left: triggerRect.left + 16,
        top: triggerRect.top + 16,
        zIndex: 9999,
      };
    }

    // Use locked placement (calculated once when target changes)
    const placement = lockedPlacement || 'right';

    let x = 0;
    let y = 0;
    let transform = 'None';

    switch (placement) {
      case 'bottom':
        x = triggerRect.left + triggerRect.width / 2;
        y = triggerRect.bottom + sideOffset;
        transform = 'translateX(-50%)';
        break;
      case 'top':
        x = triggerRect.left + triggerRect.width / 2;
        y = triggerRect.top - sideOffset;
        transform = 'translate(-50%, -100%)';
        break;
      case 'right':
        x = triggerRect.right + sideOffset;
        y = triggerRect.top;
        transform = 'none';
        break;
      case 'left':
        x = triggerRect.left - sideOffset;
        y = triggerRect.top;
        transform = 'translateX(-100%)';
        break;
    }

    return {
      position: 'fixed',
      left: x,
      top: y,
      zIndex: 9999,
      transform,
    };
  };

  const getPanelStyle = (): React.CSSProperties => {
    if (isOverlay) {
      return { position: 'absolute', top: '100%', left: 0, marginTop: '12px' };
    }

    const placement = lockedPlacement || 'right';
    switch (placement) {
      case 'top':
        return {
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '12px',
        };
      case 'bottom':
        return {
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '12px',
        };
      case 'left':
        return {
          position: 'absolute',
          right: '100%',
          top: 0,
          marginRight: '12px',
        };
      case 'right':
        return {
          position: 'absolute',
          left: '100%',
          top: 0,
          marginLeft: '12px',
        };
      default:
        return {};
    }
  };

  const handleToolSelect = (id: string) => {
    const tool = items.find((t) => t.id === id);

    if (tool?.actionOnly) {
      setActiveToolId(undefined); // Close pre-existing form
      onToolAction && onToolAction(id);
      return;
    }

    if (activeToolId === id) {
      // keep open or toggle logic
    } else {
      setActiveToolId(id);
    }
  };

  const handlePanelClose = () => {
    setActiveToolId(undefined);
    onClose && onClose();
  };

  if (!targetElement) return null;

  return (
    <View
      ref={containerRef}
      pointerEvents="auto"
      style={getPositionStyles()}
      onClick={(e) => e.stopPropagation()}
    >
      <EditToolbar
        items={items}
        activeToolId={activeToolId}
        onSelectTool={handleToolSelect}
        orientation={
          isOverlay || lockedPlacement === 'top' || lockedPlacement === 'bottom'
            ? 'horizontal'
            : 'vertical'
        }
      />

      {activeToolId && (
        <View animation="fadeIn 0.2s" style={getPanelStyle()}>
          <EditPanel activeToolId={activeToolId} onClose={handlePanelClose} />
        </View>
      )}
    </View>
  );
};
