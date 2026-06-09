/**
 * DrawerView (React Native) – uses RN's <Modal/> as the overlay container.
 * - Drops: keyboard Escape listener (RN's Modal honours back-button on Android),
 *   `position: fixed`, viewport units, backdropFilter, transitions, willChange.
 * - Public API: DrawerOverlay / DrawerContainer / DrawerHeader / DrawerBody /
 *   DrawerFooter — unchanged.
 */

import React from 'react';
import { Modal as RNModal, Dimensions } from 'react-native';
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
  children,
  ...props
}) => {
  const handleClose = () => {
    if (!isClosePrevented) onClose?.();
  };

  return (
    <RNModal
      visible={!!isOpen}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View
        flex={1}
        backgroundColor="color-blackAlpha-500"
        onPress={handleClose}
        {...props}
      >
        {children}
      </View>
    </RNModal>
  );
};

export const DrawerContainer: React.FC<DrawerContainerProps> = ({
  placement = 'right',
  size = 'md',
  isOpen = true,
  children,
  ...props
}) => {
  const isVertical = placement === 'top' || placement === 'bottom';
  const dims = Dimensions.get('window');

  const dimensionProps = isVertical
    ? {
        height:
          size === 'full' ? dims.height : (DrawerSizes as any)[size] || size,
        width: '100%',
      }
    : {
        width:
          size === 'full' ? dims.width : (DrawerSizes as any)[size] || size,
        height: '100%',
      };

  const radius =
    placement === 'left'
      ? { borderTopRightRadius: 12, borderBottomRightRadius: 12 }
      : placement === 'right'
      ? { borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }
      : placement === 'top'
      ? { borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }
      : { borderTopLeftRadius: 12, borderTopRightRadius: 12 };

  return (
    <Vertical
      position="absolute"
      backgroundColor="color-white"
      {...radius}
      {...DrawerPlacements[placement]}
      {...dimensionProps}
      style={
        {
          elevation: 8,
          shadowColor: '#0F172A',
          shadowOpacity: 0.12,
          shadowOffset: { width: 0, height: 12 },
          shadowRadius: 32,
        } as any
      }
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
    <View onPress={onClose} padding={8}>
      <CloseIcon widthHeight={20} color="color-gray-500" />
    </View>
  );
  return (
    <Horizontal
      paddingHorizontal={24}
      paddingVertical={16}
      borderBottomWidth={1}
      borderBottomColor="color-gray-200"
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
    <Vertical padding={24} flex={1} {...props}>
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
      borderTopWidth={1}
      borderTopColor="color-gray-200"
      alignItems="center"
      justifyContent="flex-end"
      gap={12}
      {...props}
    >
      {children}
    </Horizontal>
  );
};
