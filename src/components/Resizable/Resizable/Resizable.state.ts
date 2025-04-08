import { useState, useRef, useCallback, useEffect } from 'react';
import { Orientation } from './Resizable.type';

interface PanelInfo {
  id: string;
  size: number;
  minSize?: number;
  maxSize?: number;
}

export const useResizableState = (
  orientation: Orientation,
  defaultSizes?: (number | string)[],
  onSizesChange?: (sizes: number[]) => void,
  defaultMinSize: number = 50,
  defaultMaxSize: number = Infinity
) => {
  const [isResizing, setIsResizing] = useState(false);
  const [panels, setPanels] = useState<PanelInfo[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeHandleRef = useRef<string | null>(null);
  const startPositionRef = useRef<number>(0);
  const startSizesRef = useRef<number[]>([]);

  // Calculate the total size of the container
  const getTotalSize = useCallback(() => {
    if (!containerRef.current) return 0;
    return orientation === 'horizontal'
      ? containerRef.current.offsetWidth
      : containerRef.current.offsetHeight;
  }, [orientation]);

  // Register a panel with the resizable container
  const registerPanel = useCallback(
    (id: string, initialSize: number, minSize?: number, maxSize?: number) => {
      setPanels((prevPanels) => {
        // Check if panel already exists
        if (prevPanels.some((panel) => panel.id === id)) {
          return prevPanels;
        }

        // Add new panel
        return [
          ...prevPanels,
          {
            id,
            size: initialSize,
            minSize: minSize ?? defaultMinSize,
            maxSize: maxSize ?? defaultMaxSize,
          },
        ];
      });
    },
    [defaultMinSize, defaultMaxSize]
  );

  // Unregister a panel from the resizable container
  const unregisterPanel = useCallback((id: string) => {
    setPanels((prevPanels) => prevPanels.filter((panel) => panel.id !== id));
  }, []);

  // Get the size of a panel
  const getPanelSize = useCallback(
    (id: string) => {
      const panel = panels.find((p) => p.id === id);
      return panel ? panel.size : 0;
    },
    [panels]
  );

  // Set the size of a panel
  const setPanelSize = useCallback(
    (id: string, size: number) => {
      setPanels((prevPanels) =>
        prevPanels.map((panel) =>
          panel.id === id ? { ...panel, size } : panel
        )
      );
    },
    []
  );

  // Start resizing
  const startResize = useCallback(
    (handleId: string, clientPosition: number) => {
      activeHandleRef.current = handleId;
      startPositionRef.current = clientPosition;
      startSizesRef.current = panels.map((panel) => panel.size);
      setIsResizing(true);
    },
    [panels]
  );

  // Handle resize
  const onResize = useCallback(
    (clientPosition: number) => {
      if (!isResizing || !activeHandleRef.current) return;

      const handleId = activeHandleRef.current;
      const delta = clientPosition - startPositionRef.current;
      const panelIndex = panels.findIndex((p) => p.id === handleId);
      
      if (panelIndex === -1 || panelIndex >= panels.length - 1) return;

      const currentPanel = panels[panelIndex];
      const nextPanel = panels[panelIndex + 1];
      
      // Calculate new sizes
      let newCurrentSize = startSizesRef.current[panelIndex] + (orientation === 'horizontal' ? delta : delta);
      let newNextSize = startSizesRef.current[panelIndex + 1] - (orientation === 'horizontal' ? delta : delta);
      
      // Apply constraints
      newCurrentSize = Math.max(currentPanel.minSize ?? defaultMinSize, Math.min(currentPanel.maxSize ?? defaultMaxSize, newCurrentSize));
      newNextSize = Math.max(nextPanel.minSize ?? defaultMinSize, Math.min(nextPanel.maxSize ?? defaultMaxSize, newNextSize));
      
      // Update panel sizes
      setPanels((prevPanels) =>
        prevPanels.map((panel, index) => {
          if (index === panelIndex) {
            return { ...panel, size: newCurrentSize };
          }
          if (index === panelIndex + 1) {
            return { ...panel, size: newNextSize };
          }
          return panel;
        })
      );
    },
    [isResizing, panels, orientation, defaultMinSize, defaultMaxSize]
  );

  // End resizing
  const endResize = useCallback(() => {
    if (isResizing && onSizesChange) {
      onSizesChange(panels.map((panel) => panel.size));
    }
    activeHandleRef.current = null;
    setIsResizing(false);
  }, [isResizing, panels, onSizesChange]);

  // Handle keyboard navigation for accessibility
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isResizing || !activeHandleRef.current) return;

      const handleId = activeHandleRef.current;
      const panelIndex = panels.findIndex((p) => p.id === handleId);
      
      if (panelIndex === -1 || panelIndex >= panels.length - 1) return;

      let delta = 0;
      const step = 10; // 10px step for keyboard navigation

      // Handle arrow keys based on orientation
      if (orientation === 'horizontal') {
        if (e.key === 'ArrowLeft') delta = -step;
        if (e.key === 'ArrowRight') delta = step;
      } else {
        if (e.key === 'ArrowUp') delta = -step;
        if (e.key === 'ArrowDown') delta = step;
      }

      if (delta !== 0) {
        e.preventDefault();
        onResize(startPositionRef.current + delta);
      }

      // Handle escape key to cancel resizing
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
    [isResizing, panels, orientation, onResize, endResize]
  );

  // Set up event listeners for mouse/touch events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const position = orientation === 'horizontal' ? e.clientX : e.clientY;
      onResize(position);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isResizing || e.touches.length === 0) return;
      const touch = e.touches[0];
      const position = orientation === 'horizontal' ? touch.clientX : touch.clientY;
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
      
      // Set cursor based on orientation
      document.body.style.cursor = orientation === 'horizontal' ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
      
      // Reset cursor
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, orientation, onResize, endResize, handleKeyDown]);

  // Initialize panel sizes when the component mounts
  useEffect(() => {
    if (panels.length === 0 || defaultSizes) return;
    
    // If no default sizes are provided, distribute sizes equally
    const totalSize = getTotalSize();
    const equalSize = totalSize / panels.length;
    
    setPanels((prevPanels) =>
      prevPanels.map((panel) => ({
        ...panel,
        size: equalSize,
      }))
    );
  }, [panels.length, defaultSizes, getTotalSize]);

  // Update panel sizes when defaultSizes changes
  useEffect(() => {
    if (!defaultSizes || defaultSizes.length === 0 || panels.length === 0) return;
    
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

  return {
    isResizing,
    setIsResizing,
    containerRef,
    panels,
    registerPanel,
    unregisterPanel,
    getPanelSize,
    setPanelSize,
    startResize,
    onResize,
    endResize,
  };
};
