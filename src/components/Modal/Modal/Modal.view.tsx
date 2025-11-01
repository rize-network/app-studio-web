/**
 * Modal View Component
 *
 * Renders a modal dialog with various styles and states
 * according to the design guidelines.
 */

import React from 'react';
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

export const ModalOverlay: React.FC<OverlayProps & any> = ({
  children,
  blur,
  isOpen = false,
  isClosePrevented = false,
  onClose = () => {},
  position = 'center',
  views,
  ...props
}) => {
  const handleClick = () => {
    if (!isClosePrevented) onClose();
  };

  return (
    <Center
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={1000}
      onClick={handleClick}
      visibility={isOpen ? 'visible' : 'hidden'}
      transition="all 0.3s ease"
      {...views?.container}
    >
      <View
        position="absolute"
        top={0}
        left={0}
        zIndex={1000}
        width="100vw"
        height="100vh"
        display="flex"
        backgroundColor="color.blackAlpha.500"
        backdropFilter={blur ? `blur(${blur}px)` : undefined}
        transition="all 0.3s ease"
        onClick={handleClick}
        {...OverlayAlignments[position]}
        {...props}
        {...views?.view}
      >
        {children}
      </View>
    </Center>
  );
};

export const ModalContainer: React.FC<ContainerProps> = ({
  children,
  shadow,
  isFullScreen = false,
  shape = 'rounded',
  views,
  isOpen,
  ...props
}) => {
  const defaultShadow =
    typeof document !== undefined
      ? {
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)', // Subtle shadow following design system
        }
      : {
          elevation: 5,
          shadowColor: 'rgba(0, 0, 0, 0.15)',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 16,
        };

  const handleClick = (event: any) => {
    if (event && event.stopPropagation) event.stopPropagation();
  };
  return (
    <Vertical
      cursor="default"
      backgroundColor="color.white"
      width={isFullScreen ? '100%' : 600}
      height={isFullScreen ? '100%' : 'fit-content'}
      onClick={handleClick}
      transition="all 0.3s ease"
      {...(shadow ? shadow : defaultShadow)}
      {...ContainerShapes[shape]}
      media={{
        mobile: {
          width: '90%',
          maxWidth: '100%',
          margin: '16px',
        },
      }}
      {...props}
      {...views?.container}
    >
      {children}
    </Vertical>
  );
};

export const ModalHeader: React.FC<HeaderProps> = ({
  children,
  buttonColor = 'theme.primary',
  iconSize = 'md',
  buttonPosition = 'right',
  views,
  ...props
}) => {
  const onClose = props.onClose ? props.onClose : hideModal;

  const buttonIcon = (
    <View onClick={onClose}>
      <CloseIcon widthHeight={HeaderIconSizes[iconSize]} color={buttonColor} />
    </View>
  );

  return (
    <Horizontal
      justifyContent={buttonPosition === 'none' ? 'center' : 'space-between'}
      alignItems="center"
      paddingVertical={16} // 4×4px grid
      paddingHorizontal={24} // 6×4px grid
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor="color.gray.200"
      media={{
        mobile: {
          paddingVertical: 12, // Smaller padding on mobile
          paddingHorizontal: 16,
        },
      }}
      {...props}
      {...views?.header}
    >
      {buttonPosition === 'left' && buttonIcon}
      {children}
      {buttonPosition === 'right' && buttonIcon}
    </Horizontal>
  );
};

export const ModalBody: React.FC<BodyProps> = ({
  children,
  views,
  ...props
}) => {
  return (
    <View
      paddingVertical={16} // 4×4px grid
      paddingHorizontal={24} // 6×4px grid
      fontSize={ModalTypography.body.fontSize}
      fontWeight={ModalTypography.body.fontWeight}
      lineHeight={ModalTypography.body.lineHeight}
      color={ModalTypography.body.color}
      media={{
        mobile: {
          paddingVertical: 12, // Smaller padding on mobile
          paddingHorizontal: 16,
          fontSize: '14px',
        },
      }}
      {...props}
      {...views?.view}
    >
      {children}
    </View>
  );
};

export const ModalFooter: React.FC<FooterProps> = ({
  children,
  views,
  ...props
}) => {
  return (
    <Horizontal
      marginTop="auto"
      alignItems="center"
      justifyContent="flex-end"
      paddingVertical={16} // 4×4px grid
      paddingHorizontal={24} // 6×4px grid
      borderTopWidth="1px"
      borderTopStyle="solid"
      borderTopColor="color.gray.200"
      gap={12} // 3×4px grid
      media={{
        mobile: {
          paddingVertical: 12, // Smaller padding on mobile
          paddingHorizontal: 16,
          gap: 8,
        },
      }}
      {...props}
      {...views?.container}
    >
      {children}
    </Horizontal>
  );
};
