/**
 * ComboBoxView (React Native)
 *
 * The web view positions its dropdown in a `Portal` using
 * `getBoundingClientRect()` / `window.innerHeight` and a raw `<div>` trigger —
 * none of which exist on React Native. This native view keeps the same public
 * surface (search, single/multi select, chips, ticks) but renders the options
 * in the shared ActionSheet used by native select/menu/picker surfaces.
 */

import React from 'react';
import { View, Horizontal, Vertical, Text } from 'app-studio';
import { ComboBoxItem, ComboBoxViewProps } from './ComboBox.props';
import TextField from '../../../Form/TextField/TextField/TextField.view';
import { ActionSheet } from '../../../ActionSheet/ActionSheet';
import {
  SearchIcon,
  TickIcon,
  ChevronIcon,
  CloseIcon,
} from '../../../Icon/Icon';
import { FieldContent } from '../../../Input/FieldContent/FieldContent';

const ComboBoxView: React.FC<ComboBoxViewProps> = ({
  placeholder,
  items,
  showTick = true,
  onSelect,
  searchEnabled = true,
  left,
  right,
  label,
  filteredItems,
  setSelectedItem,
  selectedItem,
  selectedItems,
  setSelectedItems,
  highlightedIndex,
  setHighlightedIndex,
  searchQuery,
  setSearchQuery,
  setFilteredItems,
  views,
  isDropdownVisible,
  setIsDropdownVisible,
  isMulti = false,
  ...props
}) => {
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    }
    setHighlightedIndex(0);
  };

  const handleSelect = (item: ComboBoxItem) => {
    if (isMulti) {
      const isAlreadySelected = selectedItems.some(
        (selected) => selected.value === item.value
      );
      const newSelectedItems = isAlreadySelected
        ? selectedItems.filter((selected) => selected.value !== item.value)
        : [...selectedItems, item];
      setSelectedItems(newSelectedItems);
      onSelect?.(newSelectedItems);
    } else {
      setSelectedItem(item);
      onSelect?.(item);
      setIsDropdownVisible(false);
    }
  };

  const handleRemoveItem = (itemToRemove: ComboBoxItem) => {
    const newSelectedItems = selectedItems.filter(
      (item) => item.value !== itemToRemove.value
    );
    setSelectedItems(newSelectedItems);
    onSelect?.(newSelectedItems);
  };

  const isItemSelected = (item: ComboBoxItem) => {
    if (isMulti) {
      return selectedItems.some((selected) => selected.value === item.value);
    }
    return item.value === selectedItem?.value;
  };

  const selectedLabel = selectedItem?.label ?? placeholder;

  return (
    <Horizontal
      flexWrap="nowrap"
      gap={15}
      alignItems="center"
      width="100%"
      {...props}
    >
      {label && <Text views={views?.label}>{label}</Text>}
      <View
        position="relative"
        width="100%"
        zIndex={isDropdownVisible ? 1000 : 0}
      >
        <View
          onPress={() => setIsDropdownVisible(!isDropdownVisible)}
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
          width="100%"
        >
          <FieldContent
            isFocused={isDropdownVisible}
            cursor="pointer"
            views={{ container: views?.container as any }}
          >
            <Horizontal
              gap={10}
              alignItems="center"
              width="100%"
              flexWrap={isMulti ? 'wrap' : 'nowrap'}
              {...views?.labelContainer}
            >
              {left}
              {isMulti ? (
                selectedItems.length > 0 ? (
                  <Horizontal gap={6} flexWrap="wrap" alignItems="center">
                    {selectedItems.map((item) => (
                      <Horizontal
                        key={item.value}
                        alignItems="center"
                        gap={4}
                        paddingVertical={2}
                        paddingHorizontal={8}
                        borderRadius={999}
                        backgroundColor="color-gray-100"
                      >
                        {item.icon && <View flexShrink={0}>{item.icon}</View>}
                        <Text size="sm" color="color-gray-700">
                          {item.label}
                        </Text>
                        <CloseIcon
                          widthHeight={12}
                          color="color-gray-500"
                          onClick={() => handleRemoveItem(item)}
                        />
                      </Horizontal>
                    ))}
                  </Horizontal>
                ) : (
                  <Text flexGrow={1} color="color-gray-500" {...views?.label}>
                    {placeholder}
                  </Text>
                )
              ) : (
                <>
                  {selectedItem?.icon && selectedLabel !== placeholder && (
                    <View>{selectedItem.icon}</View>
                  )}
                  <Text
                    flexGrow={1}
                    color={
                      selectedLabel === placeholder
                        ? 'color-gray-500'
                        : 'color-gray-800'
                    }
                    {...views?.label}
                  >
                    {selectedLabel}
                  </Text>
                </>
              )}
            </Horizontal>
            <Horizontal gap={8} alignItems="center">
              {right}
              <ChevronIcon
                widthHeight={16}
                orientation={isDropdownVisible ? 'up' : 'down'}
                color={isDropdownVisible ? 'color-gray-700' : 'color-gray-400'}
              />
            </Horizontal>
          </FieldContent>
        </View>

        <ActionSheet
          isOpen={isDropdownVisible}
          onClose={() => setIsDropdownVisible(false)}
          title={typeof label === 'string' ? label : placeholder}
          closeOnSelect={!isMulti}
          views={{ sheet: views?.dropdown }}
        >
          <View paddingHorizontal={12}>
            {searchEnabled && (
              <View
                padding="8px"
                borderBottomWidth={1}
                borderStyle="solid"
                borderColor="color-gray-100"
              >
                <TextField
                  id={`${props.id}-search`}
                  name={`${props.name}-search`}
                  width="100%"
                  value={searchQuery}
                  onChange={(value: string) => handleSearch(value)}
                  hint={placeholder || 'Search...'}
                  isClearable={false}
                  left={<SearchIcon widthHeight={14} color="color-gray-400" />}
                />
              </View>
            )}
            {filteredItems.length > 0 ? (
              <Vertical paddingVertical={4}>
                {filteredItems.map((item) => {
                  const isSelected = isItemSelected(item);
                  return (
                    <Horizontal
                      justifyContent="space-between"
                      alignItems="center"
                      key={item.value}
                      paddingVertical={8}
                      paddingHorizontal={10}
                      borderRadius={6}
                      backgroundColor={
                        isSelected ? 'color-blue-50' : 'transparent'
                      }
                      onPress={() => handleSelect(item)}
                      onClick={() => handleSelect(item)}
                      {...views?.item}
                    >
                      <Horizontal gap={8} alignItems="center">
                        {item.icon && <View flexShrink={0}>{item.icon}</View>}
                        <Text
                          size="sm"
                          color={
                            isSelected ? 'theme-primary' : 'color-gray-800'
                          }
                        >
                          {item.label}
                        </Text>
                      </Horizontal>
                      {isSelected && showTick && (
                        <TickIcon widthHeight={16} color="theme-primary" />
                      )}
                    </Horizontal>
                  );
                })}
              </Vertical>
            ) : (
              <Vertical alignItems="center" gap={4} padding="16px">
                <SearchIcon widthHeight={24} color="color-gray-300" />
                <Text color="color-gray-500" size="sm">
                  No results found
                </Text>
              </Vertical>
            )}
          </View>
        </ActionSheet>
      </View>
    </Horizontal>
  );
};

export default ComboBoxView;
