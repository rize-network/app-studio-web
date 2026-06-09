/**
 * ModalView (React Native) – uses RN's built-in <Modal/> for proper portal
 * + dismissal behaviour. Drops web-only concepts: position:fixed, viewport
 * units (vw/vh), backdropFilter, cursor.
 *
 * Same public API as the web variant: ModalOverlay / ModalContainer /
 * ModalHeader / ModalBody / ModalFooter.
 */

import React, { useCallback } from 'react';
import { Modal as RNModal } from 'react-native';
import { View, Horizontal, ViewProps, Vertical, Center } from 'app-studio';
import { CloseIcon } from '../../Icon/Icon';
import { hideModal } from './Modal.store';
import {
  BodyProps,
  ContainerProps,
  FooterProps,
  HeaderProps,
} from '../Modal/Modal.props';
import {
  ContainerShapes,
  OverlayAlignments,
  HeaderIconSizes,
  ModalTypography,
} from '../Modal/Modal.style';
import { Position } from './Modal.type';

export interface OverlayProps {
  views?: {
    container?: ViewProps;
    view?: ViewProps;
  };
  blur?: number;
  isOpen?: boolean;
  isClosePrevented?: boolean;
  onClose?: () => void;
  position?: Position;
  children?: React.ReactNode;
}

export const ModalOverlay: React.FC<OverlayProps & any> = React.memo(
  ({
    children,
    isOpen = false,
    isClosePrevented = false,
    onClose = () => {},
    position = 'center',
    views,
    ...props
  }) => {
    const handlePress = useCallback(() => {
      if (!isClosePrevented) onClose();
    }, [isClosePrevented, onClose]);

    return (
      <RNModal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={handlePress}
      >
        <Center
          flex={1}
          backgroundColor="color-blackAlpha-500"
          onPress={handlePress}
          {...OverlayAlignments[position]}
          {...views?.container}
        >
          <View
            flex={1}
            width="100%"
            justifyContent="center"
            alignItems="center"
            {...props}
            {...views?.view}
          >
            {children}
          </View>
        </Center>
      </RNModal>
    );
  }
);

const nativeShadow = {
  elevation: 5,
  shadowColor: 'rgba(0, 0, 0, 0.15)',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 16,
};

export const ModalContainer: React.FC<ContainerProps> = React.memo(
  ({
    children,
    shadow,
    isFullScreen = false,
    shape = 'rounded',
    views,
    position: _position,
    ...props
  }) => {
    // stopPropagation isn't needed on RN — touch events don't bubble up like web
    return (
      <Vertical
        backgroundColor="color-white"
        width={isFullScreen ? '100%' : '90%'}
        maxWidth={600}
        {...(shadow ? shadow : nativeShadow)}
        {...ContainerShapes[shape]}
        {...props}
        {...views?.container}
      >
        {children}
      </Vertical>
    );
  }
);

export const ModalHeader: React.FC<HeaderProps> = React.memo(
  ({
    children,
    buttonColor = 'theme-primary',
    iconSize = 'md',
    buttonPosition = 'right',
    views,
    onClose: onCloseProp,
    ...props
  }) => {
    const onClose = onCloseProp ? onCloseProp : hideModal;
    const buttonIcon = (
      <View onPress={onClose}>
        <CloseIcon
          widthHeight={HeaderIconSizes[iconSize]}
          color={buttonColor}
        />
      </View>
    );
    return (
      <Horizontal
        justifyContent={buttonPosition === 'none' ? 'center' : 'space-between'}
        alignItems="center"
        paddingVertical={16}
        paddingHorizontal={24}
        borderBottomWidth={1}
        borderBottomColor="color-gray-200"
        {...props}
        {...views?.header}
      >
        {buttonPosition === 'left' && buttonIcon}
        {children}
        {buttonPosition === 'right' && buttonIcon}
      </Horizontal>
    );
  }
);

export const ModalBody: React.FC<BodyProps> = React.memo(
  ({ children, views, ...props }) => {
    return (
      <View
        paddingVertical={16}
        paddingHorizontal={24}
        fontSize={ModalTypography.body.fontSize}
        fontWeight={ModalTypography.body.fontWeight}
        color={ModalTypography.body.color}
        {...props}
        {...views?.view}
      >
        {children}
      </View>
    );
  }
);

export const ModalFooter: React.FC<FooterProps> = React.memo(
  ({ children, views, ...props }) => {
    return (
      <Horizontal
        marginTop="auto"
        alignItems="center"
        justifyContent="flex-end"
        paddingVertical={16}
        paddingHorizontal={24}
        borderTopWidth={1}
        borderTopColor="color-gray-200"
        gap={12}
        {...props}
        {...views?.container}
      >
        {children}
      </Horizontal>
    );
  }
);
