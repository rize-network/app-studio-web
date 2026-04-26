import React, { useCallback, useMemo } from 'react';
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
// Defines the properties available for configuring the ModalOverlay component, enabling customization of its appearance and behavior.
export interface OverlayProps {
  // Specifies custom style properties for the modal's internal container and view elements, allowing for granular visual adjustments.
  views?: {
    container?: ViewProps;
    view?: ViewProps;
  };
  // Sets the blur radius for the backdrop effect behind the modal, enhancing visual distinction and focus on the modal content.
  blur?: number;
  // Determines the visibility state of the modal overlay. When true, the modal is shown; when false, it is hidden.
  isOpen?: boolean;
  // A flag indicating whether clicking the overlay outside the modal content should trigger the onClose event, preventing accidental closures.
  isClosePrevented?: boolean;
  // A callback function that executes when the modal is requested to close, typically due to user interaction or internal logic.
  onClose?: () => void;
  // Dictates the alignment of the modal content within the overlay, such as 'center', 'top-left', etc.
  position?: Position;
  // The React nodes that will be rendered as the main content inside the modal overlay.
  children?: React.ReactNode;
}
// The ModalOverlay component serves as the backdrop and container for any modal content, managing its visibility and global positioning. It applies a customizable blur effect and handles close interactions.
export const ModalOverlay: React.FC<OverlayProps & any> = React.memo(
  ({
    children,
    blur,
    isOpen = false,
    isClosePrevented = false,
    onClose = () => {},
    position = 'center',
    views,
    ...props
  }) => {
    // Handles clicks on the modal overlay. If closing is not prevented, it triggers the onClose callback to hide the modal. This ensures the modal closes only when intended.
    const handleClick = useCallback(() => {
      if (!isClosePrevented) onClose();
    }, [isClosePrevented, onClose]);
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
        opacity={isOpen ? 1 : 0}
        transition="opacity 0.2s ease, visibility 0.2s ease"
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
          backgroundColor="color-blackAlpha-500"
          backdropFilter={blur ? `blur(${blur}px)` : undefined}
          transition="background-color 0.2s ease, backdrop-filter 0.2s ease"
          onClick={handleClick}
          {...OverlayAlignments[position]}
          {...props}
          {...views?.view}
        >
          {children}
        </View>
      </Center>
    );
  }
);
const webShadow = {
  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
};
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
    isOpen = true,
    ...props
  }) => {
    const defaultShadow =
      typeof document !== undefined ? webShadow : nativeShadow;
    const handleClick = useCallback((event: any) => {
      if (event && event.stopPropagation) event.stopPropagation();
    }, []);
    return (
      <Vertical
        cursor="default"
        backgroundColor="color-white"
        width={isFullScreen ? '100%' : 600}
        height={isFullScreen ? '100%' : 'fit-content'}
        onClick={handleClick}
        transition="opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease"
        opacity={isOpen ? 1 : 0}
        transform={isOpen ? 'translateY(0)' : 'translateY(8px)'}
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
  }
);
export const ModalHeader: React.FC<HeaderProps> = React.memo(
  ({
    children,
    buttonColor = 'theme-primary',
    iconSize = 'md',
    buttonPosition = 'right',
    views,
    ...props
  }) => {
    const onClose = props.onClose ? props.onClose : hideModal;
    const buttonIcon = (
      <View onClick={onClose}>
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
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="color-gray-200"
        media={{
          mobile: {
            paddingVertical: 12,
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
        media={{
          mobile: {
            paddingVertical: 12,
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
        borderTopWidth="1px"
        borderTopStyle="solid"
        borderTopColor="color-gray-200"
        gap={12}
        media={{
          mobile: {
            paddingVertical: 12,
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
  }
);
