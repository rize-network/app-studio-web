import React, { createContext, useContext, useEffect } from 'react';
import { View } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Vertical } from 'app-studio';
import {
  ResizableProps,
  ResizablePanelProps,
  ResizableHandleProps,
} from './Resizable.props';
import {
  ResizableOrientations,
  getHandleSizeStyles,
  HandleVariants,
  HandleIconStyles,
} from './Resizable.style';
import { ResizableContextType } from './Resizable.type';
// Initializes the React Context for the Resizable component, providing default values for managing resizable panels' state and actions.
const ResizableContext = createContext<ResizableContextType>({
  orientation: 'horizontal',
  size: 'md',
  variant: 'default',
  isResizing: false,
  setIsResizing: () => {},
  registerPanel: () => {},
  unregisterPanel: () => {},
  getPanelSize: () => 0,
  setPanelSize: () => {},
  isPanelCollapsed: () => false,
  togglePanelCollapse: () => {},
  startResize: () => {},
  onResize: () => {},
  endResize: () => {},
});
// A custom hook to access the Resizable context, allowing child components to interact with the global state and functions of the resizable container.
export const useResizableContext = () => useContext(ResizableContext);
// Provides the Resizable context to its children, making the resizable state and functions available throughout the component tree.
export const ResizableProvider: React.FC<{
  value: ResizableContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <ResizableContext.Provider value={value}>
      {children}
    </ResizableContext.Provider>
  );
};
export const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  id,
  defaultSize,
  minSize,
  maxSize,
  collapsible,
  defaultCollapsed,
  onCollapseChange,
  views,
  ...props
}) => {
  const {
    orientation,
    registerPanel,
    unregisterPanel,
    getPanelSize,
    isPanelCollapsed,
    togglePanelCollapse,
  } = useResizableContext();
  const initialSize =
    typeof defaultSize === 'string' && defaultSize.endsWith('%')
      ? 0
      : typeof defaultSize === 'number'
      ? defaultSize
      : 0;
  useEffect(() => {
    registerPanel(id, initialSize, minSize, maxSize, collapsible);
    return () => unregisterPanel(id);
  }, [
    id,
    initialSize,
    minSize,
    maxSize,
    collapsible,
    registerPanel,
    unregisterPanel,
  ]);
  const size = getPanelSize(id);
  const isCollapsed = isPanelCollapsed(id);
  useEffect(() => {
    if (onCollapseChange && isCollapsed !== undefined) {
      onCollapseChange(isCollapsed);
    }
  }, [isCollapsed, onCollapseChange]);
  useEffect(() => {
    if (collapsible && defaultCollapsed && !isCollapsed) {
      togglePanelCollapse(id);
    }
  }, [id, collapsible, defaultCollapsed, isCollapsed, togglePanelCollapse]);
  if (isCollapsed) {
    return (
      <View
        flex="0 0 auto"
        width={orientation === 'horizontal' ? '10px' : '100%'}
        height={orientation === 'vertical' ? '10px' : '100%'}
        backgroundColor="color-gray-200"
        cursor="pointer"
        onClick={() => togglePanelCollapse(id)}
        aria-label={`Expand panel ${id}`}
        role="button"
        tabIndex={0}
        {...views?.collapsedPanel}
        {...props}
      />
    );
  }
  return (
    <View
      flex={size > 0 ? '0 0 auto' : '1'}
      width={orientation === 'horizontal' ? `${size}px` : '100%'}
      height={orientation === 'vertical' ? `${size}px` : '100%'}
      overflow="auto"
      {...views?.panel}
      {...props}
    >
      {children}
    </View>
  );
};
export const ResizableHandle: React.FC<ResizableHandleProps> = ({
  id,
  position = 'both',
  disabled = false,
  withVisualIndicator = true,
  withCollapseButton = false,
  collapseTarget,
  views,
  ...props
}) => {
  const {
    orientation,
    size,
    variant,
    startResize,
    isPanelCollapsed,
    togglePanelCollapse,
  } = useResizableContext();
  const getPanelToCollapse = () => {
    if (collapseTarget) return collapseTarget;
    const handleNumMatch = id.match(/\d+$/);
    if (!handleNumMatch) return '';
    const handleIndex = parseInt(handleNumMatch[0], 10);
    if (isNaN(handleIndex)) return '';
    return `panel${handleIndex}`;
  };
  const panelToCollapse = getPanelToCollapse();
  const isTargetPanelCollapsed = isPanelCollapsed(panelToCollapse);
  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    const clientPosition = orientation === 'horizontal' ? e.clientX : e.clientY;
    startResize(id, clientPosition);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || e.touches.length === 0) return;
    e.preventDefault();
    const touch = e.touches[0];
    const clientPosition =
      orientation === 'horizontal' ? touch.clientX : touch.clientY;
    startResize(id, clientPosition);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const clientPosition = 0;
      startResize(id, clientPosition);
    }
  };
  const handleCollapseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (panelToCollapse) {
      togglePanelCollapse(panelToCollapse);
    }
  };
  return (
    <View
      role="separator"
      aria-orientation={orientation}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={disabled ? -1 : 0}
      cursor={orientation === 'horizontal' ? 'col-resize' : 'row-resize'}
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      {...getHandleSizeStyles(size, orientation)}
      {...HandleVariants[variant]}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onKeyDown={handleKeyDown}
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? 'none' : 'auto'}
      {...views?.handle}
      {...props}
    >
      {withVisualIndicator && (
        <View
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={orientation === 'horizontal' ? '100%' : 'auto'}
          height={orientation === 'vertical' ? '100%' : 'auto'}
          pointerEvents="none"
          {...views?.handleIcon}
        >
          {orientation === 'horizontal' ? (
            <Horizontal gap={1}>
              <View {...HandleIconStyles.horizontal} />
              <View {...HandleIconStyles.horizontal} />
            </Horizontal>
          ) : (
            <Vertical gap={1}>
              <View {...HandleIconStyles.vertical} />
              <View {...HandleIconStyles.vertical} />
            </Vertical>
          )}
        </View>
      )}
      {withCollapseButton && panelToCollapse && (
        <View
          position="absolute"
          top={orientation === 'horizontal' ? '-20px' : '50%'}
          left={orientation === 'horizontal' ? '50%' : '-20px'}
          transform={
            orientation === 'horizontal'
              ? 'translateX(-50%)'
              : 'translateY(-50%)'
          }
          width="16px"
          height="16px"
          borderRadius="full"
          backgroundColor="color-gray-100"
          border="1px solid"
          borderColor="color-gray-300"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          zIndex={1}
          onClick={handleCollapseClick}
          aria-label={
            isTargetPanelCollapsed
              ? `Expand panel ${panelToCollapse}`
              : `Collapse panel ${panelToCollapse}`
          }
          role="button"
          tabIndex={0}
          pointerEvents="auto"
          _hover={{ backgroundColor: 'color-gray-200' }}
          {...views?.collapseIcon}
        >
          {}
          <View
            width="8px"
            height="8px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {isTargetPanelCollapsed ? (
              <Horizontal>
                <View
                  width="6px"
                  height="2px"
                  backgroundColor="color-gray-600"
                />
                <View
                  width="2px"
                  height="6px"
                  backgroundColor="color-gray-600"
                  position="absolute"
                />
              </Horizontal>
            ) : (
              <View width="6px" height="2px" backgroundColor="color-gray-600" />
            )}
          </View>
        </View>
      )}
    </View>
  );
};
export const ResizableView: React.FC<
  ResizableProps & {
    containerRef: React.RefObject<HTMLDivElement>;
  }
> = ({
  children,
  orientation = 'horizontal',
  size = 'md',
  variant = 'default',
  defaultSizes,
  minSize,
  maxSize,
  collapsible = false,
  containerRef,
  autoSaveId,
  views,
  ...props
}) => {
  const Container = orientation === 'horizontal' ? Horizontal : Vertical;
  return (
    <Container
      ref={containerRef}
      width="100%"
      height="100%"
      position="relative"
      overflow="hidden"
      {...ResizableOrientations[orientation]}
      {...views?.container}
      {...props}
    >
      {children}
    </Container>
  );
};
