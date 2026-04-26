import React from 'react';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { InfoIcon, PlayIcon, DustBinIcon, CloseIcon } from '../../Icon/Icon';
import { ToastProps, ToastContainerProps } from './Toast.props';
import { Themes, ToastPositions } from './Toast.style';
import { useToastStore } from './Toast.store';
import { ToastPosition } from './Toast.type';
// Defines the ToastView functional component, responsible for rendering an individual toast notification based on the provided properties.
export const ToastView: React.FC<ToastProps> = ({
  variant,
  title,
  description,
  onClose,
  isClosable = true,
  action,
  actionText,
  showIcon = true,
  theme,
  views,
  render,
  icon: customIcon,
  id,
  isVisible = true,
  themeMode: elementMode,
}) => {
  // Initializes the `Theme` variable, prioritizing a custom `theme` if provided, otherwise defaulting to the `Themes` object for styling.
  const Theme = theme ?? Themes;
  // A helper function that determines and returns the appropriate icon component based on the `variant` of the toast or a `customIcon`.
  const getIcon = () => {
    if (customIcon !== undefined) {
      return customIcon;
    }
    const iconColor = variant
      ? Themes[variant]?.icon?.color
      : Themes.info.icon.color;
    switch (variant) {
      case 'info':
        return <InfoIcon widthHeight={20} color={iconColor} />;
      case 'success':
        return <PlayIcon widthHeight={20} color={iconColor} />;
      case 'warning':
        return (
          <InfoIcon widthHeight={20} color={iconColor} orientation="down" />
        );
      case 'error':
        return <DustBinIcon widthHeight={20} color={iconColor} />;
      default:
        return <InfoIcon widthHeight={20} color={Themes.info.icon.color} />;
    }
  };
  if (render) {
    return <>{render({ id: id || '', onClose })}</>;
  }
  // Sets the ARIA `role` attribute to 'alert' for error toasts, indicating an important and time-sensitive message, or 'status' for others.
  const ariaRole = variant === 'error' ? 'alert' : 'status';
  // Determines the ARIA `aria-live` attribute, setting it to 'assertive' for error or warning toasts to announce changes immediately, or 'polite' for less urgent updates.
  const ariaLive =
    variant === 'error' || variant === 'warning' ? 'assertive' : 'polite';
  return (
    <Horizontal
      role={ariaRole}
      aria-live={ariaLive}
      aria-atomic="true"
      data-state={isVisible ? 'open' : 'closed'}
      gap={12}
      width="100%"
      maxWidth="380px"
      borderWidth="1px"
      borderStyle="solid"
      borderRadius="12px"
      padding="12px 14px"
      alignItems="flex-start"
      position="relative"
      backgroundColor={Theme[variant].container.backgroundColor}
      borderColor={Theme[variant].container.border}
      boxShadow="0 12px 32px rgba(15, 23, 42, 0.12)"
      opacity={isVisible ? 1 : 0}
      transform={isVisible ? 'translateY(0)' : 'translateY(4px)'}
      transition="opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease"
      {...views?.container}
    >
      {showIcon && (
        <View marginTop="2px" {...views?.icon}>
          {getIcon()}
        </View>
      )}
      <Vertical gap={4} flex="1">
        <Text
          size="sm"
          lineHeight="20px"
          fontWeight="600"
          color={Theme[variant].content.color}
          backgroundColor={Theme[variant].container.backgroundColor}
          {...views?.title}
        >
          {title}
        </Text>
        {description && (
          <Text
            size="xs"
            lineHeight="18px"
            color={Theme[variant].content.color}
            fontWeight="400"
            backgroundColor={Theme[variant].container.backgroundColor}
            {...views?.description}
          >
            {description}
          </Text>
        )}
        {action && actionText && (
          <Text
            size="sm"
            fontWeight="600"
            marginTop="6px"
            cursor="pointer"
            color={Theme[variant].content.color}
            backgroundColor={Theme[variant].container.backgroundColor}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              action();
            }}
            _hover={{ textDecoration: 'underline' }}
            transition="opacity 0.2s ease, color 0.2s ease"
            {...views?.actionButton}
          >
            {actionText}
          </Text>
        )}
      </Vertical>
      {isClosable && (
        <View
          as="button"
          aria-label="Close toast"
          backgroundColor="transparent"
          border="none"
          cursor="pointer"
          padding="4px"
          marginLeft="8px"
          marginTop="-2px"
          marginRight="-4px"
          borderRadius="9999px"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onClose();
          }}
          _hover={{ backgroundColor: 'color-blackAlpha-100' }}
          transition="background-color 0.2s ease, opacity 0.2s ease"
          {...views?.closeButton}
        >
          <CloseIcon widthHeight={16} color={Theme[variant].content.color} />
        </View>
      )}
    </Horizontal>
  );
};
export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'top-right',
  gap = 8,
  limit = 5,
  containerStyle,
}) => {
  const { toasts, remove } = useToastStore();
  const toastsByPosition = React.useMemo(() => {
    const grouped: Record<ToastPosition, typeof toasts> = {
      top: [],
      'top-right': [],
      'top-left': [],
      bottom: [],
      'bottom-right': [],
      'bottom-left': [],
    };
    toasts.forEach((toast: any) => {
      const pos = toast.position || position;
      grouped[pos as ToastPosition].push(toast);
    });
    Object.keys(grouped).forEach((pos) => {
      grouped[pos as ToastPosition] = grouped[pos as ToastPosition].slice(
        -limit
      );
    });
    return grouped;
  }, [toasts, position, limit]);
  const visibleToasts = toastsByPosition[position];
  return (
    <View
      position="fixed"
      zIndex={9999}
      display="flex"
      flexDirection={position.includes('bottom') ? 'column-reverse' : 'column'}
      gap={`${gap}px`}
      width="fit-content"
      maxWidth="100%"
      pointerEvents="none"
      {...ToastPositions[position as ToastPosition]}
      style={containerStyle}
    >
      {visibleToasts.map((toast: any) => (
        <View
          key={toast.id}
          pointerEvents="auto"
          animation={
            position.includes('right')
              ? 'slideInRight 0.3s ease-out, fadeIn 0.3s ease-out'
              : position.includes('left')
              ? 'slideInLeft 0.3s ease-out, fadeIn 0.3s ease-out'
              : position.includes('top')
              ? 'slideInDown 0.3s ease-out, fadeIn 0.3s ease-out'
              : 'slideInUp 0.3s ease-out, fadeIn 0.3s ease-out'
          }
        >
          <ToastView
            id={toast.id}
            variant={toast.variant}
            title={toast.title}
            description={toast.description}
            onClose={() => remove(toast.id)}
            isClosable={toast.isClosable}
            action={toast.action}
            actionText={toast.actionText}
            showIcon={toast.showIcon}
            views={toast.views}
            render={toast.render}
            icon={toast.icon}
            isVisible={toast.isVisible}
          />
        </View>
      ))}
    </View>
  );
};
