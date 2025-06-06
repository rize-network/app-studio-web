import React, { useEffect, useRef } from 'react';
import { View, Horizontal, useElementPosition } from 'app-studio';
import { ComboBoxItem, ComboBoxViewProps } from './ComboBox.props';
import { Text } from '../../../Text/Text';
import TextField from '../../../Form/TextField/TextField/TextField.view';
import { SearchIcon, TickIcon } from '../../../Icon/Icon';

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
      if (isOutside) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
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
      <View position="relative">
        <Horizontal
          ref={triggerRef}
          cursor="pointer"
          backgroundColor="color.white"
          boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          padding="12px"
          display="flex"
          alignItems="center"
          borderRadius="4px"
          justifyContent="space-between"
          minWidth={300}
          flexWrap="nowrap"
          {...views?.container}
        >
          <Horizontal
            gap={15}
            alignItems="center"
            position="relative"
            width="100%"
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            {...views?.labelContainer}
          >
            {left}
            <Text
              weight="medium"
              flexGrow={1}
              color="color.gray.800"
              {...views?.label}
            >
              {selectedItem.label}
            </Text>
          </Horizontal>
          {right}
        </Horizontal>
        {isDropdownVisible && (
          <View
            ref={dropdownRef}
            id="combobox-dropdown"
            backgroundColor="color.white"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            overflowY="auto"
            borderRadius="4px"
            style={getDropdownStyle()}
            {...views?.dropdown}
          >
            {searchEnabled && (
              <TextField
                id={props.id}
                name={props.name}
                width="100%"
                type="search"
                value={searchQuery}
                onChange={(value) => handleSearch(value)}
                hint={placeholder}
                isClearable={false}
                left={<SearchIcon widthHeight={16} />}
                views={{
                  container: {
                    width: '100%',
                    padding: '6px 12px',
                    borderBottom:
                      filteredItems.length > 0
                        ? '1px solid #ccc'
                        : '1px solid transparent',
                    ...views?.text,
                  },
                }}
              />
            )}
            {filteredItems.length > 0 && (
              <View margin={0} padding={4}>
                {filteredItems.map((item, index) => (
                  <Horizontal
                    justifyContent="space-between"
                    key={item.value}
                    padding="12px"
                    cursor="pointer"
                    borderRadius={4}
                    backgroundColor={
                      index === highlightedIndex
                        ? 'color.gray.100'
                        : 'transparent'
                    }
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={() => handleSelect(item)}
                    {...views?.item}
                  >
                    <Text>{item.label}</Text>
                    <>
                      {item.icon && item.icon}
                      {item.value === selectedItem.value &&
                        showTick &&
                        !item.icon && <TickIcon widthHeight={20} />}
                    </>
                  </Horizontal>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </Horizontal>
  );
};
export default ComboBoxView;
