import React, { useEffect } from 'react';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
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
  duration = 5000,
}) => {
  // Auto-close the toast after a certain duration
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose, duration]);

  const Theme = theme ?? Themes;

  // Get the appropriate icon based on the variant
  const getIcon = () => {
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

  return (
    <Horizontal
      role="alert"
      gap={12}
      width="100%"
      maxWidth="400px"
      borderWidth="1px"
      borderStyle="solid"
      borderRadius="6px"
      padding="12px 16px"
      alignItems="flex-start"
      position="relative"
      backgroundColor={Theme[variant].container.backgroundColor}
      borderColor={Theme[variant].container.border}
      boxShadow="0 2px 8px rgba(0, 0, 0, 0.15)"
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
          weight="semiBold"
          color={Theme[variant].content.color}
          {...views?.title}
        >
          {title}
        </Text>

        {description && (
          <Text
            size="sm"
            color={Theme[variant].content.color}
            {...views?.description}
          >
            {description}
          </Text>
        )}

        {action && actionText && (
          <Text
            size="sm"
            weight="semiBold"
            marginTop="4px"
            cursor="pointer"
            color={Theme[variant].content.color}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              action();
            }}
            _hover={{ textDecoration: 'underline' }}
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
          marginTop="-4px"
          marginRight="-8px"
          borderRadius="4px"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onClose();
          }}
          _hover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
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

  // Limit the number of toasts shown
  const visibleToasts = toasts.slice(-limit);

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
      {visibleToasts.map((toast) => (
        <View
          key={toast.id}
          pointerEvents="auto"
          animation={
            position.includes('right')
              ? 'slideInRight 0.3s, fadeIn 0.3s'
              : position.includes('left')
              ? 'slideInLeft 0.3s, fadeIn 0.3s'
              : position.includes('top')
              ? 'slideInDown 0.3s, fadeIn 0.3s'
              : 'slideInUp 0.3s, fadeIn 0.3s'
          }
        >
          <ToastView
            variant={toast.variant}
            title={toast.title}
            description={toast.description}
            onClose={() => remove(toast.id)}
            isClosable={toast.isClosable}
            action={toast.action}
            actionText={toast.actionText}
            showIcon={toast.showIcon}
            views={toast.views}
          />
        </View>
      ))}
    </View>
  );
};
