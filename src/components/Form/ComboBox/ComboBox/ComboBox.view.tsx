import React, { useEffect, useRef, useState } from 'react';
import { Portal } from '../../../Portal/Portal';
import { View, Horizontal, Vertical, useElementPosition } from 'app-studio';
import { ComboBoxItem, ComboBoxViewProps } from './ComboBox.props';
import { Text } from 'app-studio';
import TextField from '../../../Form/TextField/TextField/TextField.view';
import {
  SearchIcon,
  TickIcon,
  ChevronIcon,
  CloseIcon,
} from '../../../Icon/Icon';
import { FieldContent } from '../../../Input/FieldContent/FieldContent';
import {
  dropdownStyles,
  dropdownAnimation,
  searchContainerStyles,
  optionStyles,
  emptyStateStyles,
  chevronAnimation,
  chipStyles,
} from './ComboBox.style';

// Defines the functional component 'ComboBoxView' with destructured props.
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
  // Collects all further props not destructured explicitly.
  ...props
}) => {
  const { ref: triggerRef, relation } = useElementPosition({
    trackChanges: true,
    trackOnScroll: true,
    trackOnResize: true,
    throttleMs: 10,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);

  // Get optimal positioning style based on available space
  // Get optimal positioning style based on available space
  const getDropdownStyle = () => {
    const animationStyle = isAnimating
      ? dropdownAnimation.enter
      : dropdownAnimation.initial;

    if (!triggerRef.current) return {};

    const rect = triggerRef.current.getBoundingClientRect();
    const baseStyle: React.CSSProperties = {
      position: 'fixed',
      left: rect.left,
      width: rect.width,
      zIndex: 10000,
      ...animationStyle,
    };

    // Use relation to determine vertical placement if available, otherwise default to bottom
    const isTop = relation?.space?.vertical === 'top';

    if (isTop) {
      return {
        ...baseStyle,
        bottom: window.innerHeight - rect.top + 6, // 6px gap
      };
    } else {
      return {
        ...baseStyle,
        top: rect.bottom + 6, // 6px gap
      };
    }
  };

  // Trigger animation when dropdown opens
  useEffect(() => {
    if (isDropdownVisible) {
      // Small delay to allow initial render before animation
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    }
    setIsAnimating(false);
    return undefined;
  }, [isDropdownVisible]);

  // Sets up an effect to handle clicking outside the dropdown to close it.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const path = event.composedPath();
      const isOutside = !path.some(
        (element: any) => element?.id === 'combobox-dropdown'
      );
      if (
        isOutside &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []); // triggerRef is stable

  // Defines 'handleSearch' to filter items based on the user's query.
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
  // Defines 'handleSelect' to handle item selection and close the dropdown.
  const handleSelect = (item: ComboBoxItem) => {
    if (isMulti) {
      // In multi-select mode, toggle item in the selectedItems array
      const isAlreadySelected = selectedItems.some(
        (selected) => selected.value === item.value
      );
      let newSelectedItems: ComboBoxItem[];
      if (isAlreadySelected) {
        newSelectedItems = selectedItems.filter(
          (selected) => selected.value !== item.value
        );
      } else {
        newSelectedItems = [...selectedItems, item];
      }
      setSelectedItems(newSelectedItems);
      onSelect?.(newSelectedItems);
      // Don't close dropdown in multi-select mode
    } else {
      setSelectedItem(item);
      onSelect?.(item);
      setIsDropdownVisible(false);
    }
  };

  // Removes an item from multi-select
  const handleRemoveItem = (
    event: React.MouseEvent,
    itemToRemove: ComboBoxItem
  ) => {
    event.stopPropagation();
    const newSelectedItems = selectedItems.filter(
      (item) => item.value !== itemToRemove.value
    );
    setSelectedItems(newSelectedItems);
    onSelect?.(newSelectedItems);
  };

  // Check if an item is selected (for multi-select highlighting)
  const isItemSelected = (item: ComboBoxItem) => {
    if (isMulti) {
      return selectedItems.some((selected) => selected.value === item.value);
    }
    return item.value === selectedItem.value;
  };
  // Starts the JSX returned by the component representing the combobox.
  return (
    <Horizontal
      role="combobox"
      flexWrap="nowrap"
      gap={15}
      alignItems="center"
      width="100%"
      {...props}
    >
      {label && (
        <Text views={views?.label} htmlFor={props.id}>
          {label}
        </Text>
      )}
      <View position="relative" width="100%">
        <div
          ref={triggerRef as React.RefObject<HTMLDivElement>}
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
          style={{ width: '100%' }}
        >
          <FieldContent
            isHovered={isHovered}
            isFocused={isDropdownVisible}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
                // Multi-select: show chips or placeholder
                selectedItems.length > 0 ? (
                  <Horizontal gap={6} flexWrap="wrap" alignItems="center">
                    {selectedItems.map((item) => (
                      <Horizontal
                        key={item.value}
                        {...chipStyles}
                        _hover={{ backgroundColor: 'color-gray-200' }}
                      >
                        {item.icon && <View flexShrink={0}>{item.icon}</View>}
                        <Text size="sm" color="color-gray-700" weight="medium">
                          {item.label}
                        </Text>
                        <CloseIcon
                          widthHeight={12}
                          color="color-gray-500"
                          cursor="pointer"
                          onClick={(e: React.MouseEvent) =>
                            handleRemoveItem(e, item)
                          }
                        />
                      </Horizontal>
                    ))}
                  </Horizontal>
                ) : (
                  <Text
                    weight="medium"
                    flexGrow={1}
                    color="color-gray-500"
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    {...views?.label}
                  >
                    {placeholder}
                  </Text>
                )
              ) : (
                // Single select: show selected item
                <>
                  {selectedItem.icon && selectedItem.label !== placeholder && (
                    <View>{selectedItem.icon}</View>
                  )}
                  <Text
                    weight="medium"
                    flexGrow={1}
                    color={
                      selectedItem.label === placeholder
                        ? 'color-gray-500'
                        : 'color-gray-800'
                    }
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    {...views?.label}
                  >
                    {selectedItem.label}
                  </Text>
                </>
              )}
            </Horizontal>
            <Horizontal gap={8} alignItems="center">
              {right}
              <View
                style={
                  isDropdownVisible
                    ? chevronAnimation.open
                    : chevronAnimation.closed
                }
              >
                <ChevronIcon
                  widthHeight={16}
                  orientation="down"
                  color={
                    isDropdownVisible ? 'color-gray-700' : 'color-gray-400'
                  }
                />
              </View>
            </Horizontal>
          </FieldContent>
        </div>
        {isDropdownVisible && (
          <Portal>
            <View
              ref={dropdownRef}
              id="combobox-dropdown"
              role="listbox"
              aria-labelledby={props.id}
              {...dropdownStyles}
              style={getDropdownStyle()}
              {...views?.dropdown}
            >
              {searchEnabled && (
                <View {...searchContainerStyles}>
                  <TextField
                    id={`${props.id}-search`}
                    name={`${props.name}-search`}
                    width="100%"
                    type="search"
                    autoFocus
                    value={searchQuery}
                    onChange={(value) => handleSearch(value)}
                    hint={placeholder || 'Search...'}
                    isClearable={false}
                    left={
                      <SearchIcon widthHeight={14} color="color-gray-400" />
                    }
                    views={{
                      container: {
                        width: '100%',
                        padding: '0',
                        backgroundColor: 'transparent',
                        borderColor: 'color-gray-200',
                        ...views?.text,
                      },
                      field: {
                        fontSize: '13px',
                      },
                    }}
                  />
                </View>
              )}
              {filteredItems.length > 0 && (
                <View margin={0} padding="4px">
                  {filteredItems.map((item, index) => {
                    const isSelected = isItemSelected(item);
                    const isHighlighted = index === highlightedIndex;

                    return (
                      <Horizontal
                        role="option"
                        aria-selected={isSelected}
                        justifyContent="space-between"
                        alignItems="center"
                        key={item.value}
                        {...optionStyles}
                        backgroundColor={
                          isSelected && isHighlighted
                            ? 'rgba(59, 130, 246, 0.12)'
                            : isSelected
                            ? 'rgba(59, 130, 246, 0.08)'
                            : isHighlighted
                            ? 'color-gray-100'
                            : 'transparent'
                        }
                        onMouseEnter={() => setHighlightedIndex(index)}
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
                            weight={isSelected ? 'medium' : 'normal'}
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
                </View>
              )}
              {filteredItems.length === 0 && (
                <Vertical {...emptyStateStyles}>
                  <SearchIcon widthHeight={24} color="color-gray-300" />
                  <Text color="color-gray-500" size="sm" align="center">
                    No results found
                  </Text>
                  <Text color="color-gray-400" size="xs" align="center">
                    Try a different search term
                  </Text>
                </Vertical>
              )}
            </View>
          </Portal>
        )}
      </View>
    </Horizontal>
  );
};
export default ComboBoxView;
