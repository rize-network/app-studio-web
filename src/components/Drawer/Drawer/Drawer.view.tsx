import React from 'react';
import { View, Horizontal, Vertical } from 'app-studio';
import { CloseIcon } from '../../Icon/Icon';
import {
  DrawerOverlayProps,
  DrawerContainerProps,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
} from './Drawer.props';
import { DrawerPlacements, DrawerSizes } from './Drawer.style';

export const DrawerOverlay: React.FC<DrawerOverlayProps> = ({
  isOpen,
  onClose,
  isClosePrevented,
  blur,
  children,
  ...props
}) => {
  const handleClick = () => {
    if (!isClosePrevented) onClose();
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !isClosePrevented) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isClosePrevented, onClose]);

  return (
    <View
      data-testid="drawer-overlay"
      role="dialog"
      aria-modal="true"
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={1000}
      visibility={isOpen ? 'visible' : 'hidden'}
      onClick={handleClick}
      opacity={isOpen ? 1 : 0}
      transition="opacity 0.2s ease, visibility 0.2s ease, background-color 0.2s ease"
      backgroundColor={isOpen ? 'color-blackAlpha-500' : 'transparent'}
      backdropFilter={blur ? `blur(${blur}px)` : undefined}
      pointerEvents={isOpen ? 'auto' : 'none'}
      {...props}
    >
      {children}
    </View>
  );
};

export const DrawerContainer: React.FC<DrawerContainerProps> = ({
  placement = 'right',
  size = 'md',
  isOpen = false,
  children,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const isVertical = placement === 'top' || placement === 'bottom';
  const dimensionProps = isVertical
    ? {
        height: size === 'full' ? '100vh' : DrawerSizes[size] || size,
        maxHeight: '100vh',
      }
    : {
        width: size === 'full' ? '100vw' : DrawerSizes[size] || size,
        maxWidth: '100vw',
      };

  const borderRadius =
    placement === 'left'
      ? '0 12px 12px 0'
      : placement === 'right'
      ? '12px 0 0 12px'
      : placement === 'top'
      ? '0 0 12px 12px'
      : '12px 12px 0 0';

  const transform = isOpen
    ? 'translate3d(0, 0, 0)'
    : placement === 'left'
    ? 'translate3d(-100%, 0, 0)'
    : placement === 'right'
    ? 'translate3d(100%, 0, 0)'
    : placement === 'top'
    ? 'translate3d(0, -100%, 0)'
    : 'translate3d(0, 100%, 0)';

  return (
    <Vertical
      position="absolute"
      backgroundColor="color-white"
      borderRadius={borderRadius}
      {...DrawerPlacements[placement]}
      {...dimensionProps}
      onClick={handleClick}
      transform={transform}
      willChange="transform"
      transition="transform 0.24s ease, box-shadow 0.2s ease"
      boxShadow="0 12px 32px rgba(15, 23, 42, 0.12)"
      {...props}
    >
      {children}
    </Vertical>
  );
};

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  children,
  onClose,
  buttonPosition = 'right',
  ...props
}) => {
  const closeButton = onClose && (
    <View onClick={onClose} cursor="pointer" padding={8}>
      <CloseIcon widthHeight={20} color="color-gray-500" />
    </View>
  );

  return (
    <Horizontal
      paddingHorizontal={24}
      paddingVertical={16}
      borderBottomWidth="1px"
      borderBottomColor="rgba(226, 232, 240, 0.9)"
      alignItems="center"
      justifyContent={buttonPosition === 'none' ? 'center' : 'space-between'}
      {...props}
    >
      {buttonPosition === 'left' && closeButton}
      {children}
      {buttonPosition === 'right' && closeButton}
    </Horizontal>
  );
};

export const DrawerBody: React.FC<DrawerBodyProps> = ({
  children,
  ...props
}) => {
  return (
    <Vertical padding={24} flex={1} overflowY="auto" {...props}>
      {children}
    </Vertical>
  );
};

export const DrawerFooter: React.FC<DrawerFooterProps> = ({
  children,
  ...props
}) => {
  return (
    <Horizontal
      paddingHorizontal={24}
      paddingVertical={16}
      borderTopWidth="1px"
      borderTopColor="rgba(226, 232, 240, 0.9)"
      alignItems="center"
      justifyContent="flex-end"
      gap={12}
      {...props}
    >
      {children}
    </Horizontal>
  );
};
