import { useState, useRef, useCallback, useEffect } from 'react';
import { Orientation, PanelInfo, ResizableStorage } from './Resizable.type';
const createDefaultStorage = (): ResizableStorage => ({
  getItem: (id: string) => {
    try {
      return localStorage.getItem(`resizable-${id}`);
    } catch (e) {
      console.warn('Failed to access localStorage:', e);
      return null;
    }
  },
  setItem: (id: string, value: string) => {
    try {
      localStorage.setItem(`resizable-${id}`, value);
    } catch (e) {
      console.warn('Failed to write to localStorage:', e);
    }
  },
});
// This file encapsulates the state management logic for the Resizable component, providing a custom hook (`useResizableState`) to manage panel sizes, resizing operations, collapse states, and optional persistence of settings.
export const useResizableState = (
  orientation: Orientation,
  defaultSizes?: (number | string)[],
  onSizesChange?: (sizes: number[]) => void,
  defaultMinSize: number = 50,
  defaultMaxSize: number = Infinity,
  collapsible: boolean = false,
  autoSaveId?: string,
  storage?: ResizableStorage,
  keyboardResizeBy: number = 10
) => {
  const [isResizing, setIsResizing] = useState(false);
  const [panels, setPanels] = useState<PanelInfo[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeHandleRef = useRef<string | null>(null);
  const startPositionRef = useRef<number>(0);
  const startSizesRef = useRef<number[]>([]);
  const storageRef = useRef<ResizableStorage | null>(
    storage || (typeof window !== 'undefined' ? createDefaultStorage() : null)
  );
  const getTotalSize = useCallback(() => {
    if (!containerRef.current) return 0;
    return orientation === 'horizontal'
      ? containerRef.current.offsetWidth
      : containerRef.current.offsetHeight;
  }, [orientation]);
  const loadSavedSizes = useCallback(() => {
    if (!autoSaveId || !storageRef.current) return null;
    const savedData = storageRef.current.getItem(autoSaveId);
    if (!savedData) return null;
    try {
      const parsed = JSON.parse(savedData);
      if (Array.isArray(parsed.sizes)) {
        return parsed.sizes;
      }
      return null;
    } catch (e) {
      console.warn('Failed to parse saved panel sizes:', e);
      return null;
    }
  }, [autoSaveId]);
  const savePanelSizes = useCallback(() => {
    if (!autoSaveId || !storageRef.current || panels.length === 0) return;
    const sizes = panels.map((panel) => ({
      id: panel.id,
      size: panel.size,
      collapsed: panel.collapsed || false,
    }));
    storageRef.current.setItem(autoSaveId, JSON.stringify({ sizes }));
  }, [autoSaveId, panels]);
  const registerPanel = useCallback(
    (
      id: string,
      initialSize: number,
      minSize?: number,
      maxSize?: number,
      panelCollapsible?: boolean
    ) => {
      setPanels((prevPanels) => {
        if (prevPanels.some((panel) => panel.id === id)) {
          return prevPanels;
        }
        return [
          ...prevPanels,
          {
            id,
            size: initialSize,
            minSize: minSize ?? defaultMinSize,
            maxSize: maxSize ?? defaultMaxSize,
            collapsible: panelCollapsible ?? collapsible,
            collapsed: false,
          },
        ];
      });
    },
    [defaultMinSize, defaultMaxSize, collapsible]
  );
  const unregisterPanel = useCallback((id: string) => {
    setPanels((prevPanels) => prevPanels.filter((panel) => panel.id !== id));
  }, []);
  const getPanelSize = useCallback(
    (id: string) => {
      const panel = panels.find((p) => p.id === id);
      return panel ? panel.size : 0;
    },
    [panels]
  );
  const setPanelSize = useCallback((id: string, size: number) => {
    setPanels((prevPanels) =>
      prevPanels.map((panel) => (panel.id === id ? { ...panel, size } : panel))
    );
  }, []);
  const isPanelCollapsed = useCallback(
    (id: string) => {
      const panel = panels.find((p) => p.id === id);
      return panel ? !!panel.collapsed : false;
    },
    [panels]
  );
  const togglePanelCollapse = useCallback((id: string) => {
    setPanels((prevPanels) => {
      const panelIndex = prevPanels.findIndex((p) => p.id === id);
      if (panelIndex === -1) return prevPanels;
      const panel = prevPanels[panelIndex];
      if (!panel.collapsible) return prevPanels;
      const updatedPanel = {
        ...panel,
        collapsed: !panel.collapsed,
      };
      const newPanels = [...prevPanels];
      newPanels[panelIndex] = updatedPanel;
      return newPanels;
    });
  }, []);
  const startResize = useCallback(
    (handleId: string, clientPosition: number) => {
      activeHandleRef.current = handleId;
      startPositionRef.current = clientPosition;
      startSizesRef.current = panels.map((panel) => panel.size);
      setIsResizing(true);
    },
    [panels]
  );
  const onResize = useCallback(
    (clientPosition: number) => {
      if (!isResizing || !activeHandleRef.current) return;
      const handleId = activeHandleRef.current;
      const delta = clientPosition - startPositionRef.current;
      let handleIndex = -1;
      const handleNumMatch = handleId.match(/\d+$/);
      if (handleNumMatch) {
        handleIndex = parseInt(handleNumMatch[0], 10) - 1;
      }
      if (handleIndex === -1 && panels.length >= 2) {
        handleIndex = 0;
      }
      if (handleIndex < 0 || handleIndex >= panels.length - 1) return;
      const currentPanel = panels[handleIndex];
      const nextPanel = panels[handleIndex + 1];
      if (currentPanel.collapsed || nextPanel.collapsed) return;
      let newCurrentSize =
        startSizesRef.current[handleIndex] +
        (orientation === 'horizontal' ? delta : delta);
      let newNextSize =
        startSizesRef.current[handleIndex + 1] -
        (orientation === 'horizontal' ? delta : delta);
      newCurrentSize = Math.max(
        currentPanel.minSize ?? defaultMinSize,
        Math.min(currentPanel.maxSize ?? defaultMaxSize, newCurrentSize)
      );
      newNextSize = Math.max(
        nextPanel.minSize ?? defaultMinSize,
        Math.min(nextPanel.maxSize ?? defaultMaxSize, newNextSize)
      );
      setPanels((prevPanels) =>
        prevPanels.map((panel, index) => {
          if (index === handleIndex) {
            return { ...panel, size: newCurrentSize };
          }
          if (index === handleIndex + 1) {
            return { ...panel, size: newNextSize };
          }
          return panel;
        })
      );
    },
    [isResizing, panels, orientation, defaultMinSize, defaultMaxSize]
  );
  const endResize = useCallback(() => {
    if (isResizing && onSizesChange) {
      onSizesChange(panels.map((panel) => panel.size));
    }
    activeHandleRef.current = null;
    setIsResizing(false);
    if (autoSaveId) {
      savePanelSizes();
    }
  }, [isResizing, panels, onSizesChange, autoSaveId, savePanelSizes]);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isResizing || !activeHandleRef.current) return;
      const handleId = activeHandleRef.current;
      let handleIndex = -1;
      const handleNumMatch = handleId.match(/\d+$/);
      if (handleNumMatch) {
        handleIndex = parseInt(handleNumMatch[0], 10) - 1;
      }
      if (handleIndex === -1 && panels.length >= 2) {
        handleIndex = 0;
      }
      if (handleIndex < 0 || handleIndex >= panels.length - 1) return;
      let delta = 0;
      if (orientation === 'horizontal') {
        if (e.key === 'ArrowLeft') delta = -keyboardResizeBy;
        if (e.key === 'ArrowRight') delta = keyboardResizeBy;
        if (e.key === 'Home') delta = -100;
        if (e.key === 'End') delta = 100;
      } else {
        if (e.key === 'ArrowUp') delta = -keyboardResizeBy;
        if (e.key === 'ArrowDown') delta = keyboardResizeBy;
        if (e.key === 'Home') delta = -100;
        if (e.key === 'End') delta = 100;
      }
      if (delta !== 0) {
        e.preventDefault();
        onResize(startPositionRef.current + delta);
      }
      if (e.key === 'Escape') {
        setPanels((prevPanels) =>
          prevPanels.map((panel, index) => ({
            ...panel,
            size: startSizesRef.current[index],
          }))
        );
        endResize();
      }
    },
    [isResizing, panels, orientation, onResize, endResize, keyboardResizeBy]
  );
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const position = orientation === 'horizontal' ? e.clientX : e.clientY;
      onResize(position);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isResizing || e.touches.length === 0) return;
      const touch = e.touches[0];
      const position =
        orientation === 'horizontal' ? touch.clientX : touch.clientY;
      onResize(position);
    };
    const handleMouseUp = () => {
      if (isResizing) {
        endResize();
      }
    };
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleMouseUp);
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.cursor =
        orientation === 'horizontal' ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, orientation, onResize, endResize, handleKeyDown]);
  useEffect(() => {
    if (panels.length === 0) return;
    if (autoSaveId) {
      const savedSizes = loadSavedSizes();
      if (savedSizes) {
        setPanels((prevPanels) => {
          return prevPanels.map((panel) => {
            const savedPanel = savedSizes.find((s: any) => s.id === panel.id);
            if (savedPanel) {
              return {
                ...panel,
                size: savedPanel.size,
                collapsed: savedPanel.collapsed || false,
              };
            }
            return panel;
          });
        });
        return;
      }
    }
    if (!defaultSizes) {
      const totalSize = getTotalSize();
      const equalSize = totalSize / panels.length;
      setPanels((prevPanels) =>
        prevPanels.map((panel) => ({
          ...panel,
          size: equalSize,
        }))
      );
    }
  }, [panels.length, defaultSizes, getTotalSize, autoSaveId, loadSavedSizes]);
  useEffect(() => {
    if (!defaultSizes || defaultSizes.length === 0 || panels.length === 0)
      return;
    const totalSize = getTotalSize();
    const newSizes = defaultSizes.map((size) => {
      if (typeof size === 'string' && size.endsWith('%')) {
        return (parseFloat(size) / 100) * totalSize;
      }
      return typeof size === 'number' ? size : parseFloat(size);
    });
    setPanels((prevPanels) =>
      prevPanels.map((panel, index) => ({
        ...panel,
        size: index < newSizes.length ? newSizes[index] : panel.size,
      }))
    );
  }, [defaultSizes, panels.length, getTotalSize]);
  useEffect(() => {
    if (panels.length > 0 && autoSaveId && !isResizing) {
      savePanelSizes();
    }
  }, [panels, autoSaveId, isResizing, savePanelSizes]);
  return {
    isResizing,
    setIsResizing,
    containerRef,
    panels,
    registerPanel,
    unregisterPanel,
    getPanelSize,
    setPanelSize,
    isPanelCollapsed,
    togglePanelCollapse,
    startResize,
    onResize,
    endResize,
  };
};
