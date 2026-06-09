import React from 'react';
import { View, Text, Vertical, Horizontal } from 'app-studio';
import { ToastProps, ToastContainerProps } from './Toast.props';
import { Themes, ToastPositions } from './Toast.style';
import { useToastStore } from './Toast.store';
import { ToastPosition } from './Toast.type';

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
  const Theme = theme ?? Themes;
  if (render) {
    return <>{render({ id: id || '', onClose })}</>;
  }
  return (
    <Horizontal
      gap={12}
      width="100%"
      maxWidth={380}
      borderWidth={1}
      borderStyle="solid"
      borderRadius={12}
      padding={12}
      alignItems="flex-start"
      position="relative"
      backgroundColor={Theme[variant].container.backgroundColor}
      borderColor={Theme[variant].container.border}
      opacity={isVisible ? 1 : 0}
      style={
        {
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.12,
          shadowRadius: 8,
        } as any
      }
      {...views?.container}
    >
      {showIcon && customIcon && (
        <View marginTop={2} {...views?.icon}>
          {customIcon}
        </View>
      )}
      <Vertical gap={4} flex={1}>
        <Text
          fontSize={14}
          lineHeight={20}
          fontWeight="600"
          color={Theme[variant].content.color}
          {...views?.title}
        >
          {title}
        </Text>
        {description && (
          <Text
            fontSize={12}
            lineHeight={18}
            color={Theme[variant].content.color}
            fontWeight="400"
            {...views?.description}
          >
            {description}
          </Text>
        )}
        {action && actionText && (
          <Text
            fontSize={14}
            fontWeight="600"
            marginTop={6}
            color={Theme[variant].content.color}
            onPress={() => action()}
            onClick={() => action()}
            {...views?.actionButton}
          >
            {actionText}
          </Text>
        )}
      </Vertical>
      {isClosable && (
        <View
          padding={4}
          marginLeft={8}
          borderRadius={9999}
          onPress={onClose}
          onClick={onClose}
          {...views?.closeButton}
        >
          <Text color={Theme[variant].content.color}>×</Text>
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
      position="absolute"
      zIndex={9999}
      flexDirection={position.includes('bottom') ? 'column-reverse' : 'column'}
      gap={gap}
      maxWidth="100%"
      {...({ pointerEvents: 'box-none' } as any)}
      {...ToastPositions[position as ToastPosition]}
      style={containerStyle as any}
    >
      {visibleToasts.map((toast: any) => (
        <View key={toast.id} pointerEvents="auto">
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
