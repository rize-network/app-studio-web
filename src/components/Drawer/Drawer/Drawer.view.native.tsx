/**
 * DrawerView (React Native) – uses RN's <Modal/> as the overlay container.
 * - Drops: keyboard Escape listener (RN's Modal honours back-button on Android),
 *   `position: fixed`, viewport units, backdropFilter, transitions, willChange.
 * - Public API: DrawerOverlay / DrawerContainer / DrawerHeader / DrawerBody /
 *   DrawerFooter — unchanged.
 */

import React, { useEffect, useRef } from 'react';
import { Modal as RNModal, Dimensions, Animated, Easing } from 'react-native';
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

  // DrawerSizes are fixed pixel strings ('480px'…'768px') that are wider than a
  // phone for side drawers, and 'full' is '100%'. Resolve to a number and cap
  // to the screen so the panel never overflows off-screen.
  const resolveExtent = (axis: number, fallbackRatio: number): number => {
    if (size === 'full') return axis;
    const raw = (DrawerSizes as any)[size] ?? size;
    const n =
      typeof raw === 'number' ? raw : parseFloat(String(raw).replace('px', ''));
    if (!n || isNaN(n)) return Math.round(axis * fallbackRatio);
    return Math.min(n, Math.round(axis * 0.92));
  };

  const dimensionProps = isVertical
    ? { height: resolveExtent(dims.height, 0.5), width: dims.width }
    : { width: resolveExtent(dims.width, 0.85), height: dims.height };

  const radius =
    placement === 'left'
      ? { borderTopRightRadius: 12, borderBottomRightRadius: 12 }
      : placement === 'right'
      ? { borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }
      : placement === 'top'
      ? { borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }
      : { borderTopLeftRadius: 12, borderTopRightRadius: 12 };

  // Anchor the panel to its edge (plain RN styles on the Animated.View).
  const edgeStyle =
    placement === 'left'
      ? { top: 0, bottom: 0, left: 0 }
      : placement === 'right'
      ? { top: 0, bottom: 0, right: 0 }
      : placement === 'top'
      ? { top: 0, left: 0, right: 0 }
      : { bottom: 0, left: 0, right: 0 };

  // Slide-in by default using RN's built-in Animated (native-driver transform),
  // independent of react-native-reanimated. 1 = off-screen, 0 = in place.
  const offset = isVertical ? dims.height : dims.width;
  const sign = placement === 'left' || placement === 'top' ? -1 : 1;
  const slide = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.timing(slide, {
      toValue: isOpen ? 0 : 1,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [isOpen, slide]);
  const translate = slide.interpolate({
    inputRange: [0, 1],
    outputRange: [0, sign * offset],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        ...edgeStyle,
        ...(dimensionProps as any),
        transform: isVertical
          ? [{ translateY: translate }]
          : [{ translateX: translate }],
      }}
    >
      <Vertical
        flex={1}
        backgroundColor="color-white"
        overflow="hidden"
        {...radius}
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
    </Animated.View>
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
