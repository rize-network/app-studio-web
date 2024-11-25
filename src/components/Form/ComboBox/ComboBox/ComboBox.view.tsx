import React, { useEffect } from 'react';
import { View, Horizontal } from '../../../Layout';
import { ComboBoxItem, ComboBoxViewProps } from './ComboBox.props';
import { Text } from '../../../Text/Text';
import TextField from '../../../Form/TextField/TextField/TextField.view';
import { SearchIcon, TickIcon } from 'src/components/Icon/Icon';

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
  styles,
  isDropdownVisible,
  setIsDropdownVisible,
  // Collects all further props not destructured explicitly.
  ...props
}) => {
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
        <Text styles={styles?.label} htmlFor={props.id}>
          {label}
        </Text>
      )}
      <View position="relative">
        <Horizontal
          cursor="pointer"
          backgroundColor="white"
          boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          padding="12px"
          display="flex"
          alignItems="center"
          borderRadius="4px"
          justifyContent="space-between"
          minWidth={300}
          flexWrap="nowrap"
          {...styles?.container}
        >
          <Horizontal
            gap={15}
            alignItems="center"
            position="relative"
            width="100%"
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            {...styles?.labelContainer}
          >
            {left}
            <Text weight="medium" flexGrow={1} {...styles?.label}>
              {selectedItem.label}
            </Text>
          </Horizontal>
          {right}
          {isDropdownVisible && (
            <View
              id="combobox-dropdown"
              position="absolute"
              backgroundColor="white"
              boxShadow="rgba(0, 0 ,0 ,0.16) 0px 1px 4px"
              width="100%"
              overflowY="auto"
              zIndex={10000}
              bottom={-8}
              left={0}
              transform="translateY(100%)"
              marginTop="4px"
              borderRadius="4px"
              {...styles?.dropdown}
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
                  leftChild={<SearchIcon size={12} />}
                  styles={{
                    box: {
                      width: '100%',
                      padding: '6px 12px',
                      borderBottom:
                        filteredItems.length > 0
                          ? '1px solid #ccc'
                          : '1px solid transparent',
                      ...styles?.text,
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
                      {...styles?.item}
                    >
                      <Text>{item.label}</Text>
                      <>
                        {item.icon && item.icon}
                        {item.value === selectedItem.value &&
                          showTick &&
                          !item.icon && <TickIcon size={20} />}
                      </>
                    </Horizontal>
                  ))}
                </View>
              )}
            </View>
          )}
        </Horizontal>
      </View>
    </Horizontal>
  );
};
export default ComboBoxView;
