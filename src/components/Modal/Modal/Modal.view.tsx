import React, { useEffect } from 'react';
import { useTheme } from 'app-studio';
import { Center, Vertical } from 'src/components';
import { Horizontal } from 'src/components';
import { Button } from 'src/components';
import { View } from 'src/components/Layout/View/View';
import { CloseSvg } from 'src/components/Svg';
import { useModalStore } from 'src/store/useModalStore';

import { BodyProps, ContainerProps, FooterProps, HeaderProps, OverlayProps } from '../Modal/Modal.props';
import { ContainerShapes, OverlayAlignments } from '../Modal/Modal.style';
import { HeaderIconSizes } from '../Modal/Modal.style';

export const ModalOverlay: React.FC<OverlayProps> = ({
  children,
  blur,
  isOpen = false,
  isClosePrevented = false,
  onClose = () => {},
  position = 'center',
  ...props
}) => {
  const setOpen = useModalStore((state: any) => state.setOpen);
  const setOnClose = useModalStore((state: any) => state.setOnClose);

  useEffect(() => {
    setOnClose(onClose);
    if (isOpen) setOpen();
  });

  if (!isOpen) return null;

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
      onPress={handleClick}
      visibility={isOpen ? 'visible' : 'hidden'}
    >
      <View
        cursor="pointer"
        position="absolute"
        top={0}
        left={0}
        zIndex={1000}
        width="100vw"
        height="100vh"
        display="flex"
        backgroundColor="blackAlpha.500"
        backdropFilter={blur ? `blur(${blur}px)` : undefined}
        onPress={handleClick}
        {...OverlayAlignments[position]}
        {...props}
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

  const handleClick = (event: any) => event.stopPropagation();
  return (
    <Vertical
      cursor="default"
      overflow="hidden"
      backgroundColor="white"
      width={isFullScreen ? '100%' : 600}
      height={isFullScreen ? '100%' : 'fit-content'}
      onPress={handleClick}
      {...(shadow ? shadow : defaultShadow)}
      {...ContainerShapes[shape]}
      {...props}
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
  ...props
}) => {
  const onClose = useModalStore((state: any) => state.onClose);

  const buttonIcon = (
    <Button
      onPress={onClose}
      colorScheme="transparent"
      icon={<CloseSvg size={HeaderIconSizes[iconSize]} color={buttonColor} />}
      padding={0}
      margin={0}
      filter="none"
      isAuto
    />
  );

  return (
    <Horizontal
      justifyContent={buttonPosition === 'none' ? 'center' : 'space-between'}
      alignItems="center"
      paddingVertical={15}
      paddingHorizontal={20}
      {...props}
    >
      {buttonPosition === 'left' && buttonIcon}
      {children}
      {buttonPosition === 'right' && buttonIcon}
    </Horizontal>
  );
};

export const ModalBody: React.FC<BodyProps> = ({ children, ...props }) => {
  const defaultBorder = {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: 'rgba(250, 250, 250, 1)',
    borderStyle: 'solid',
  };
  return (
    <View overflowY="auto" paddingVertical={15} paddingHorizontal={20} {...defaultBorder} {...props}>
      {children}
    </View>
  );
};

export const ModalFooter: React.FC<FooterProps> = ({ children, ...props }) => {
  return (
    <Horizontal
      marginTop="auto"
      alignItems="center"
      justifyContent="flex-end"
      paddingVertical={15}
      paddingHorizontal={20}
      {...props}
    >
      {children}
    </Horizontal>
  );
};
