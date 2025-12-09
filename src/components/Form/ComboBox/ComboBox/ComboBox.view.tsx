import React, { useEffect, useRef, useState } from 'react';
import { View, Horizontal, useElementPosition } from 'app-studio';
import { ComboBoxItem, ComboBoxViewProps } from './ComboBox.props';
import { Text } from 'app-studio';
import TextField from '../../../Form/TextField/TextField/TextField.view';
import { SearchIcon, TickIcon, ChevronIcon } from '../../../Icon/Icon';
import { FieldContent } from '../../../Input/FieldContent/FieldContent';

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
  highlightedIndex,
  setHighlightedIndex,
  searchQuery,
  setSearchQuery,
  setFilteredItems,
  views,
  isDropdownVisible,
  setIsDropdownVisible,
  // Collects all further props not destructured explicitly.
  ...props
}) => {
  const { ref: triggerRef, relation } = useElementPosition();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Get optimal positioning style based on available space
  const getDropdownStyle = () => {
    if (!relation) {
      // Default positioning when relation is not available
      return {
        position: 'absolute' as const,
        top: '100%',
        marginTop: '8px',
        left: 0,
        right: 0,
        zIndex: 10000,
        maxHeight: '240px',
      };
    }

    const baseStyle = {
      position: 'absolute' as const,
      left: 0,
      right: 0,
      zIndex: 10000,
      maxHeight: '240px',
    };

    // Place dropdown where there's more space vertically
    if (relation.space.vertical === 'top') {
      return {
        ...baseStyle,
        bottom: '100%',
        marginBottom: '8px',
      };
    } else {
      return {
        ...baseStyle,
        top: '100%',
        marginTop: '8px',
      };
    }
  };

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
    setSelectedItem(item);
    onSelect?.(item);
    setIsDropdownVisible(false);
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
              {...views?.labelContainer}
            >
              {left}
              {selectedItem.icon && selectedItem.label !== placeholder && (
                <View>{selectedItem.icon}</View>
              )}
              <Text
                weight="medium"
                flexGrow={1}
                color={
                  selectedItem.label === placeholder
                    ? 'color.gray.500'
                    : 'color.gray.800'
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
            </Horizontal>
            <Horizontal gap={5} alignItems="center">
              {right}
              <ChevronIcon
                widthHeight={16}
                orientation={isDropdownVisible ? 'up' : 'down'}
                color="color.gray.500"
              />
            </Horizontal>
          </FieldContent>
        </div>
        {isDropdownVisible && (
          <View
            ref={dropdownRef}
            id="combobox-dropdown"
            backgroundColor="color.white"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 4px 16px"
            overflowY="auto"
            borderRadius="8px"
            style={getDropdownStyle()}
            {...views?.dropdown}
            border="1px solid #eee"
          >
            {searchEnabled && (
              <View padding="8px">
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
                  left={<SearchIcon widthHeight={16} color="color.gray.400" />}
                  views={{
                    container: {
                      width: '100%',
                      padding: '0',
                      ...views?.text,
                    },
                    field: {
                      fontSize: '14px',
                    },
                  }}
                />
              </View>
            )}
            {filteredItems.length > 0 && (
              <View margin={0} padding={4}>
                {filteredItems.map((item, index) => (
                  <Horizontal
                    justifyContent="space-between"
                    key={item.value}
                    padding="8px 12px"
                    cursor="pointer"
                    borderRadius={4}
                    backgroundColor={
                      index === highlightedIndex
                        ? 'color.gray.100'
                        : 'transparent'
                    }
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={() => handleSelect(item)}
                    transition="background-color 0.2s"
                    {...views?.item}
                  >
                    <Text color="color.gray.800">{item.label}</Text>
                    <>
                      {item.icon && item.icon}
                      {item.value === selectedItem.value &&
                        showTick &&
                        !item.icon && (
                          <TickIcon widthHeight={16} color="theme.primary" />
                        )}
                    </>
                  </Horizontal>
                ))}
              </View>
            )}
            {filteredItems.length === 0 && (
              <View padding="12px">
                <Text color="color.gray.500" align="center">
                  No items found
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </Horizontal>
  );
};
export default ComboBoxView;
