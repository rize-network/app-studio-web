import React, { createContext, useContext, useEffect } from 'react';
import { View, Horizontal, Vertical } from 'app-studio';
import {
  ResizableProps,
  ResizablePanelProps,
  ResizableHandleProps,
} from './Resizable.props';
import {
  ResizableOrientations,
  HandleVariants,
  HandleIconStyles,
} from './Resizable.style';
import { ResizableContextType } from './Resizable.type';

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

export const useResizableContext = () => useContext(ResizableContext);

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
        width={orientation === 'horizontal' ? 10 : '100%'}
        height={orientation === 'vertical' ? 10 : '100%'}
        backgroundColor="color-gray-200"
        onPress={() => togglePanelCollapse(id)}
        onClick={() => togglePanelCollapse(id)}
        {...views?.collapsedPanel}
        {...props}
      />
    );
  }
  return (
    <View
      flex={size > 0 ? 0 : 1}
      width={orientation === 'horizontal' ? size : '100%'}
      height={orientation === 'vertical' ? size : '100%'}
      overflow="hidden"
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
  const handleTouchStart = (e: any) => {
    if (disabled) return;
    const touch = e.nativeEvent?.touches?.[0];
    if (!touch) return;
    const clientPosition =
      orientation === 'horizontal' ? touch.pageX : touch.pageY;
    startResize(id, clientPosition);
  };
  return (
    <View
      alignItems="center"
      justifyContent="center"
      position="relative"
      {...HandleVariants[variant]}
      onTouchStart={handleTouchStart}
      opacity={disabled ? 0.5 : 1}
      {...views?.handle}
      {...props}
    >
      {withVisualIndicator && (
        <View
          alignItems="center"
          justifyContent="center"
          width={orientation === 'horizontal' ? '100%' : 'auto'}
          height={orientation === 'vertical' ? '100%' : 'auto'}
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
          width={16}
          height={16}
          borderRadius={9999}
          backgroundColor="color-gray-100"
          borderWidth={1}
          borderColor="color-gray-300"
          alignItems="center"
          justifyContent="center"
          onPress={() => togglePanelCollapse(panelToCollapse)}
          onClick={() => togglePanelCollapse(panelToCollapse)}
          {...views?.collapseIcon}
        />
      )}
    </View>
  );
};

export const ResizableView: React.FC<
  ResizableProps & {
    containerRef: React.RefObject<any>;
  }
> = ({
  children,
  orientation = 'horizontal',
  size = 'md',
  variant = 'default',
  containerRef,
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
