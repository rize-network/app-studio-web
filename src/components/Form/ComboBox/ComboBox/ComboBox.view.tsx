import React, { useState, useEffect } from 'react';
import { View, Horizontal } from '../../../Layout'; // Assuming View and Text are from the same location
import { ComboBoxItem, ComboBoxViewProps } from './ComboBox.props';
import { Text } from '../../..';
import TextField from 'src/components/Form/TextField/TextField/TextField.view';
import TickSvg from 'src/components/Svg/Tick';
import SearchLoopSvg from 'src/components/Svg/Search';

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
  ...props
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
    setSelectedItem(item);
    onSelect?.(item);
    setIsDropdownVisible(false);
  };

  return (
    <Horizontal
      wrap="nowrap"
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
          justify="space-between"
          minWidth={300}
          wrap="nowrap"
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
                  leftChild={<SearchLoopSvg size={12} />}
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
                      justify="space-between"
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
                          !item.icon && <TickSvg />}
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
