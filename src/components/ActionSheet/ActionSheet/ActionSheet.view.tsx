import React from 'react';
import { Horizontal, Text, Vertical, View } from 'app-studio';
import { Portal } from '../../Portal/Portal';
import { TickIcon } from '../../Icon/Icon';
import { ActionSheetViewProps } from './ActionSheet.props';
import { ActionSheetItem } from './ActionSheet.type';
import {
  ActionSheetItemSizes,
  ActionSheetTextSizes,
} from './ActionSheet.style';

const getItemKey = (item: ActionSheetItem, index: number) =>
  item.id ?? item.value ?? `action-sheet-item-${index}`;

const getItemValue = (item: ActionSheetItem) => item.value ?? item.id;

const isItemDisabled = (item: ActionSheetItem) =>
  item.disabled || item.isDisabled || item.divider;

const isItemSelected = (
  item: ActionSheetItem,
  selectedValue: string | string[]
) => {
  if (typeof item.selected === 'boolean') return item.selected;
  const itemValue = getItemValue(item);
  if (!itemValue) return false;
  if (Array.isArray(selectedValue)) return selectedValue.includes(itemValue);
  return selectedValue === itemValue;
};

const ActionSheetView: React.FC<ActionSheetViewProps> = ({
  isSheetOpen,
  closeSheet,
  selectedValue,
  setSelectedValue,
  isClosePrevented = false,
  dismissOnBackdropPress = true,
  title,
  description,
  header,
  children,
  items = [],
  isMulti = false,
  closeOnSelect,
  onSelect,
  onChange,
  showCancel = false,
  cancelLabel = 'Cancel',
  onCancel,
  showHandle = true,
  size = 'md',
  maxHeight = '88vh',
  views,
  animationType: _animationType,
  ...props
}) => {
  if (!isSheetOpen) return null;

  const handleClose = () => {
    if (!isClosePrevented) closeSheet();
  };

  const handleBackdropClick = () => {
    if (dismissOnBackdropPress) handleClose();
  };

  const handleCancel = () => {
    onCancel?.();
    handleClose();
  };

  const handleItemPress = (item: ActionSheetItem) => {
    if (isItemDisabled(item)) return;

    const itemValue = getItemValue(item);
    let nextValue = selectedValue;

    if (itemValue) {
      if (isMulti) {
        const currentValue = Array.isArray(selectedValue)
          ? selectedValue
          : selectedValue
          ? [selectedValue]
          : [];
        nextValue = currentValue.includes(itemValue)
          ? currentValue.filter((value) => value !== itemValue)
          : [...currentValue, itemValue];
      } else {
        nextValue = itemValue;
      }

      setSelectedValue(nextValue);
      onSelect?.(itemValue, item);
      onChange?.(nextValue, item);
    }

    item.onPress?.(item);

    const shouldClose = item.closeOnSelect ?? closeOnSelect ?? !isMulti;
    if (shouldClose) handleClose();
  };

  return (
    <Portal>
      <View
        position="fixed"
        top={0}
        right={0}
        bottom={0}
        left={0}
        zIndex={9999}
        backgroundColor="color-blackAlpha-500"
        display="flex"
        justifyContent="flex-end"
        onClick={handleBackdropClick}
        {...views?.overlay}
      >
        <Vertical
          width="100%"
          maxWidth={520}
          maxHeight={maxHeight}
          marginHorizontal="auto"
          backgroundColor="color-white"
          borderTopLeftRadius={24}
          borderTopRightRadius={24}
          paddingTop={8}
          paddingBottom={12}
          overflow="hidden"
          boxShadow="0 -18px 48px rgba(15, 23, 42, 0.18)"
          onClick={(event: React.MouseEvent) => event.stopPropagation()}
          {...views?.container}
          {...views?.sheet}
          {...props}
        >
          {showHandle && (
            <View
              width={36}
              height={4}
              borderRadius={999}
              backgroundColor="color-gray-300"
              alignSelf="center"
              marginTop={4}
              marginBottom={8}
              {...views?.handle}
            />
          )}

          {(title || description) && (
            <Vertical
              paddingHorizontal={20}
              paddingTop={6}
              paddingBottom={12}
              gap={4}
              {...views?.header}
            >
              {title && (
                <Text
                  fontSize={18}
                  lineHeight={24}
                  fontWeight="600"
                  color="color-gray-900"
                  {...views?.title}
                >
                  {title}
                </Text>
              )}
              {description && (
                <Text
                  fontSize={13}
                  lineHeight={18}
                  color="color-gray-500"
                  {...views?.description}
                >
                  {description}
                </Text>
              )}
            </Vertical>
          )}

          {header}

          <Vertical overflowY="auto" paddingBottom={4} {...views?.content}>
            {items.map((item, index) => {
              if (item.divider) {
                return (
                  <View
                    key={getItemKey(item, index)}
                    height={1}
                    backgroundColor="color-gray-200"
                    marginVertical={6}
                    {...views?.divider}
                  />
                );
              }

              const selected = isItemSelected(item, selectedValue);
              const disabled = isItemDisabled(item);
              const textColor = disabled
                ? 'color-gray-400'
                : item.destructive
                ? 'color-red-600'
                : selected
                ? 'theme-primary'
                : 'color-gray-900';

              return (
                <Horizontal
                  key={getItemKey(item, index)}
                  alignItems="center"
                  gap={12}
                  opacity={disabled ? 0.5 : 1}
                  cursor={disabled ? 'not-allowed' : 'pointer'}
                  onClick={() => handleItemPress(item)}
                  {...ActionSheetItemSizes[size]}
                  {...views?.item}
                >
                  {item.icon && (
                    <View flexShrink={0} {...views?.itemIcon}>
                      {item.icon}
                    </View>
                  )}
                  <Vertical flex={1} gap={2}>
                    {typeof item.label === 'string' ? (
                      <Text
                        fontSize={ActionSheetTextSizes[size].label}
                        lineHeight={ActionSheetTextSizes[size].label + 6}
                        fontWeight={selected ? '600' : '400'}
                        color={textColor}
                        {...views?.itemLabel}
                      >
                        {item.label}
                      </Text>
                    ) : (
                      item.label
                    )}
                    {item.description && (
                      <Text
                        fontSize={ActionSheetTextSizes[size].description}
                        lineHeight={ActionSheetTextSizes[size].description + 5}
                        color="color-gray-500"
                        {...views?.itemDescription}
                      >
                        {item.description}
                      </Text>
                    )}
                  </Vertical>
                  {selected && (
                    <TickIcon
                      widthHeight={18}
                      color="theme-primary"
                      {...views?.itemIndicator}
                    />
                  )}
                </Horizontal>
              );
            })}
            {children}
          </Vertical>

          {showCancel && (
            <View
              marginTop={8}
              paddingHorizontal={12}
              paddingTop={8}
              borderTopWidth={1}
              borderTopColor="color-gray-200"
            >
              <Horizontal
                minHeight={52}
                alignItems="center"
                justifyContent="center"
                borderRadius={14}
                backgroundColor="color-gray-100"
                cursor="pointer"
                onClick={handleCancel}
                {...views?.cancelButton}
              >
                <Text
                  fontSize={ActionSheetTextSizes[size].label}
                  lineHeight={ActionSheetTextSizes[size].label + 6}
                  fontWeight="600"
                  color="color-gray-900"
                  {...views?.cancelLabel}
                >
                  {cancelLabel}
                </Text>
              </Horizontal>
            </View>
          )}
        </Vertical>
      </View>
    </Portal>
  );
};

export default ActionSheetView;
