import React, { createContext, useContext, useEffect } from 'react';
import { View } from '../../Layout/View/View';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Vertical } from '../../Layout/Vertical/Vertical';
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

// Create context for the Resizable component
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
  startResize: () => {},
  onResize: () => {},
  endResize: () => {},
});

// Hook to use the Resizable context
export const useResizableContext = () => useContext(ResizableContext);

// Provider component for the Resizable context
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

// Resizable Panel component
export const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  id,
  defaultSize,
  minSize,
  maxSize,
  collapsible,
  views,
  ...props
}) => {
  const { orientation, registerPanel, unregisterPanel, getPanelSize } =
    useResizableContext();

  // Convert percentage to pixels if needed
  const initialSize =
    typeof defaultSize === 'string' && defaultSize.endsWith('%')
      ? 0 // Will be calculated in the state hook
      : typeof defaultSize === 'number'
      ? defaultSize
      : 0;

  // Register panel on mount
  useEffect(() => {
    registerPanel(id, initialSize, minSize, maxSize);
    return () => unregisterPanel(id);
  }, [id, initialSize, minSize, maxSize, registerPanel, unregisterPanel]);

  // Get current panel size
  const size = getPanelSize(id);

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

// Resizable Handle component
export const ResizableHandle: React.FC<ResizableHandleProps> = ({
  id,
  position = 'both',
  disabled = false,
  withVisualIndicator = true,
  views,
  ...props
}) => {
  const { orientation, size, variant, startResize } = useResizableContext();

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
      const clientPosition = 0; // Starting position for keyboard navigation
      startResize(id, clientPosition);
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
    </View>
  );
};

// Main Resizable View component
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
