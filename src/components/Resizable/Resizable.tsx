import React from 'react';
import { ResizableProps, ResizableType } from './Resizable/Resizable.props';
import { useResizableState } from './Resizable/Resizable.state';
import {
  ResizableProvider,
  ResizablePanel,
  ResizableHandle,
  ResizableView,
} from './Resizable/Resizable.view';
// This file defines the main `Resizable` component, which orchestrates the functionality for resizable panels. It utilizes the `useResizableState` hook to manage all resizing logic and state, then exposes this context through `ResizableProvider` to its sub-components. The visual layout is rendered by `ResizableView`, and convenience sub-components like `Resizable.Panel` and `Resizable.Handle` are attached for structured usage.
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
  autoSaveId,
  storage,
  keyboardResizeBy = 10,
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
    isPanelCollapsed,
    togglePanelCollapse,
    startResize,
    onResize,
    endResize,
  } = useResizableState(
    orientation,
    defaultSizes,
    onSizesChange,
    minSize,
    maxSize,
    collapsible,
    autoSaveId,
    storage,
    keyboardResizeBy
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
        isPanelCollapsed,
        togglePanelCollapse,
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
        autoSaveId={autoSaveId}
        keyboardResizeBy={keyboardResizeBy}
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
Resizable.Panel = ResizablePanel;
Resizable.Handle = ResizableHandle;
