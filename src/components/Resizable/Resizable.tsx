import React from 'react';
import {
  ResizableProps,
  ResizableType,
} from './Resizable/Resizable.props';
import { useResizableState } from './Resizable/Resizable.state';
import {
  ResizableProvider,
  ResizablePanel,
  ResizableHandle,
  ResizableView,
} from './Resizable/Resizable.view';

/**
 * Resizable component for creating resizable panel groups and layouts.
 */
const ResizableComponent: React.FC<ResizableProps> = ({
  children,
  orientation = 'horizontal',
  size = 'md',
  variant = 'default',
  defaultSizes,
  onSizesChange,
  minSize = 50,
  maxSize,
  collapsible = false,
  views,
  ...props
}) => {
  const {
    isResizing,
    setIsResizing,
    containerRef,
    registerPanel,
    unregisterPanel,
    getPanelSize,
    setPanelSize,
    startResize,
    onResize,
    endResize,
  } = useResizableState(
    orientation,
    defaultSizes,
    onSizesChange,
    minSize,
    maxSize
  );

  return (
    <ResizableProvider
      value={{
        orientation,
        size,
        variant,
        isResizing,
        setIsResizing,
        registerPanel,
        unregisterPanel,
        getPanelSize,
        setPanelSize,
        startResize,
        onResize,
        endResize,
      }}
    >
      <ResizableView
        orientation={orientation}
        size={size}
        variant={variant}
        defaultSizes={defaultSizes}
        minSize={minSize}
        maxSize={maxSize}
        collapsible={collapsible}
        containerRef={containerRef}
        views={views}
        {...props}
      >
        {children}
      </ResizableView>
    </ResizableProvider>
  );
};

export const Resizable = ResizableComponent as ResizableType;

// Assign the sub-components to the main component
Resizable.Panel = ResizablePanel;
Resizable.Handle = ResizableHandle;
