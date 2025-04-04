import React from 'react';
import { View, Horizontal, ViewProps, Vertical } from 'app-studio';
import { Button } from '../../Button/Button';
import { CloseIcon } from '../../Icon/Icon';
import { hideModal } from './Modal.store';

import {
  BodyProps,
  ContainerProps,
  FooterProps,
  HeaderProps,
} from '../Modal/Modal.props';
import { ContainerShapes, OverlayAlignments } from '../Modal/Modal.style';
import { HeaderIconSizes } from '../Modal/Modal.style';
import { Position } from './Modal.type';
import { Center } from 'src/components/Layout';

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
  ...props
}) => {
  const defaultShadow =
    typeof document !== undefined
      ? {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
        }
      : {
          elevation: 5,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 8,
        };

  const handleClick = (event: any) => {
    if (event && event.stopPropagation) event.stopPropagation();
  };
  return (
    <Vertical
      cursor="default"
      backgroundColor="white"
      width={isFullScreen ? '100%' : 600}
      height={isFullScreen ? '100%' : 'fit-content'}
      onClick={handleClick}
      {...(shadow ? shadow : defaultShadow)}
      {...ContainerShapes[shape]}
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
    <Button
      onClick={onClose}
      icon={
        <CloseIcon
          widthHeight={HeaderIconSizes[iconSize]}
          color={buttonColor}
        />
      }
      padding={0}
      margin={0}
      filter="none"
      width={0}
    />
  );

  return (
    <Horizontal
      justifyContent={buttonPosition === 'none' ? 'center' : 'space-between'}
      alignItems="center"
      paddingVertical={15}
      paddingHorizontal={20}
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
  const defaultBorder = {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: 'rgba(250, 250, 250, 1)',
    borderStyle: 'solid',
  };
  return (
    <View
      paddingVertical={15}
      paddingHorizontal={20}
      {...defaultBorder}
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
      paddingVertical={15}
      paddingHorizontal={20}
      {...props}
      {...views?.container}
    >
      {children}
    </Horizontal>
  );
};
