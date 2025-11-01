import React from 'react';
import { View } from 'app-studio';
import { Text } from '../../Text/Text';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { InfoIcon, PlayIcon, DustBinIcon, CloseIcon } from '../../Icon/Icon';
import { ToastProps, ToastContainerProps } from './Toast.props';
import { Themes, ToastPositions } from './Toast.style';
import { useToastStore } from './Toast.store';
import { ToastPosition } from './Toast.type';

// Individual Toast component
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
  // We don't need the auto-close timer here anymore as it's handled in the store

  const Theme = theme ?? Themes;

  // Get the appropriate icon based on the variant
  const getIcon = () => {
    // If a custom icon is provided, use it
    if (customIcon !== undefined) {
      return customIcon;
    }

    // Otherwise use the default icon based on variant
    switch (variant) {
      case 'info':
        return <InfoIcon widthHeight={20} color={Theme.info.icon.color} />;
      case 'success':
        return <PlayIcon widthHeight={20} color={Theme.success.icon.color} />;
      case 'warning':
        return (
          <InfoIcon
            widthHeight={20}
            color={Theme.warning.icon.color}
            orientation="down"
          />
        );
      case 'error':
        return <DustBinIcon widthHeight={20} color={Theme.error.icon.color} />;
      default:
        return <InfoIcon widthHeight={20} color={Theme.info.icon.color} />;
    }
  };

  // If a custom render function is provided, use it
  if (render) {
    return <>{render({ id: id || '', onClose })}</>;
  }

  // Determine appropriate ARIA role and live region based on variant
  const ariaRole = variant === 'error' ? 'alert' : 'status';
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
      maxWidth="400px"
      borderWidth="1px"
      borderStyle="solid"
      borderRadius="8px" // 2 × 4px grid
      padding="12px 16px" // 3 × 4px grid and 4 × 4px grid
      alignItems="flex-start"
      position="relative"
      backgroundColor={Theme[variant].container.backgroundColor}
      borderColor={Theme[variant].container.border}
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)" // Subtle shadow
      opacity={isVisible ? 1 : 0}
      transform={isVisible ? 'scale(1)' : 'scale(0.95)'}
      transition="all 0.3s ease"
      {...views?.container}
    >
      {showIcon && (
        <View marginTop="2px" {...views?.icon}>
          {getIcon()}
        </View>
      )}

      <Vertical gap={4} flex="1">
        <Text
          size="md"
          fontWeight="600" // Semi-bold for better readability
          color={Theme[variant].content.color}
          lineHeight="1.4"
          bgColor={Theme[variant].container.backgroundColor}
          {...views?.title}
        >
          {title}
        </Text>

        {description && (
          <Text
            size="sm"
            color={Theme[variant].content.color}
            fontWeight="400" // Regular weight
            lineHeight="1.5"
            bgColor={Theme[variant].container.backgroundColor}
            {...views?.description}
          >
            {description}
          </Text>
        )}

        {action && actionText && (
          <Text
            size="sm"
            fontWeight="600" // Semi-bold for better readability
            marginTop="8px" // 2 × 4px grid
            cursor="pointer"
            color={Theme[variant].content.color}
            bgColor={Theme[variant].container.backgroundColor}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              action();
            }}
            _hover={{ textDecoration: 'underline' }}
            transition="all 0.2s ease"
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
          padding="4px" // 1 × 4px grid
          marginLeft="8px" // 2 × 4px grid
          marginTop="-4px" // 1 × 4px grid
          marginRight="-8px" // 2 × 4px grid
          borderRadius="4px" // 1 × 4px grid
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onClose();
          }}
          _hover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
          transition="all 0.2s ease"
          {...views?.closeButton}
        >
          <CloseIcon widthHeight={16} color={Theme[variant].content.color} />
        </View>
      )}
    </Horizontal>
  );
};

// Toast Container component
export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'top-right',
  gap = 8,
  limit = 5,
  containerStyle,
}) => {
  const { toasts, remove } = useToastStore();

  // Group toasts by position
  const toastsByPosition = React.useMemo(() => {
    const grouped: Record<ToastPosition, typeof toasts> = {
      top: [],
      'top-right': [],
      'top-left': [],
      bottom: [],
      'bottom-right': [],
      'bottom-left': [],
    };

    // Group toasts by their position or the container's default position
    toasts.forEach((toast: any) => {
      const pos = toast.position || position;
      grouped[pos as ToastPosition].push(toast);
    });

    // Apply limits to each position group
    Object.keys(grouped).forEach((pos) => {
      grouped[pos as ToastPosition] = grouped[pos as ToastPosition].slice(
        -limit
      );
    });

    return grouped;
  }, [toasts, position, limit]);

  // Get toasts for the current position
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
