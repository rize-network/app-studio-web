import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardEvent,
  Modal as RNModal,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import { Horizontal, Text, Vertical, View } from 'app-studio';
import { TickIcon } from '../../Icon/Icon';
import { ActionSheetViewProps } from './ActionSheet.props';
import { ActionSheetItem } from './ActionSheet.type';
import {
  actionSheetShadow,
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

const resolveMaxHeight = (
  maxHeight: number | string | undefined,
  windowHeight: number
) => {
  if (typeof maxHeight === 'number') return maxHeight;
  if (typeof maxHeight === 'string') {
    const trimmed = maxHeight.trim();
    if (trimmed.endsWith('%')) {
      const ratio = parseFloat(trimmed) / 100;
      if (!Number.isNaN(ratio)) return Math.round(windowHeight * ratio);
    }
    const parsed = parseFloat(trimmed.replace('px', ''));
    if (!Number.isNaN(parsed)) return parsed;
  }
  return Math.round(windowHeight * 0.88);
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
  maxHeight,
  animationType = 'slide',
  views,
  ...props
}) => {
  const { height: windowHeight } = useWindowDimensions();
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  React.useEffect(() => {
    if (!isSheetOpen) {
      setKeyboardHeight(0);
      return;
    }

    const handleKeyboardShow = (event: KeyboardEvent) => {
      const screenY = event.endCoordinates?.screenY;
      const eventHeight = event.endCoordinates?.height ?? 0;
      const nextHeight =
        typeof screenY === 'number' && screenY > 0 && screenY < windowHeight
          ? windowHeight - screenY
          : eventHeight;

      setKeyboardHeight(Math.max(0, nextHeight));
    };

    const handleKeyboardHide = () => setKeyboardHeight(0);

    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      handleKeyboardShow
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      handleKeyboardHide
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [isSheetOpen, windowHeight]);

  const baseMaxHeight = resolveMaxHeight(maxHeight, windowHeight);
  const keyboardGap = keyboardHeight > 0 ? 12 : 0;
  const visibleMaxHeight =
    keyboardHeight > 0
      ? Math.max(220, windowHeight - keyboardHeight - keyboardGap)
      : windowHeight;
  const resolvedMaxHeight = Math.min(baseMaxHeight, visibleMaxHeight);

  const handleClose = () => {
    if (!isClosePrevented) closeSheet();
  };

  const handleBackdropPress = () => {
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
    <RNModal
      visible={isSheetOpen}
      transparent
      animationType={animationType}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View
          flex={1}
          backgroundColor="color-blackAlpha-500"
          {...views?.overlay}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
            style={{ flex: 1, justifyContent: 'flex-end' }}
          >
            <TouchableWithoutFeedback>
              <Vertical
                width="100%"
                maxHeight={resolvedMaxHeight as any}
                backgroundColor="color-white"
                borderTopLeftRadius={24}
                borderTopRightRadius={24}
                paddingTop={8}
                paddingBottom={Platform.OS === 'ios' ? 18 : 12}
                overflow="hidden"
                style={actionSheetShadow as any}
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

                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 4 }}
                >
                  <Vertical {...views?.content}>
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
                          onPress={() => handleItemPress(item)}
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
                                lineHeight={
                                  ActionSheetTextSizes[size].label + 6
                                }
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
                                fontSize={
                                  ActionSheetTextSizes[size].description
                                }
                                lineHeight={
                                  ActionSheetTextSizes[size].description + 5
                                }
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
                </ScrollView>

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
                      onPress={handleCancel}
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
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default ActionSheetView;
