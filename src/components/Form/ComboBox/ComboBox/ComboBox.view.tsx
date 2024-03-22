import React, { useEffect } from 'react';
import { View, Horizontal } from '../../../Layout';
import { ComboBoxItem, ComboBoxViewProps } from './ComboBox.props';
import { Text } from '../../..';
import TextField from '../../../Form/TextField/TextField/TextField.view';
import TickSvg from '../../../Svg/Tick';
import SearchLoopSvg from '../../../Svg/Search';
// ComboBoxView is a functional component with destructured props for managing the behavior and appearance of the combo box.
const ComboBoxView: React.FC<ComboBoxViewProps> = ({
  placeholder,
  items,
  showTick = true,
  onSelect,
  searchEnabled = true,
  // useEffect hook used to add event listener to entire document to handle clicks outside the dropdown, to close it if it is open.
  left,
  // The handleClickOutside function checks if the click event path includes the element with id 'combobox-dropdown', and hides the dropdown if clicked outside.
  right,
  label,
  filteredItems,
  setSelectedItem,
  selectedItem,
  // Cleanup function to remove event listener from the document when the component will unmount.
  highlightedIndex,
  setHighlightedIndex,
  searchQuery,
  // handleSearch function updates the search query state and filters items based on the query, with case insensitive matching.
  setSearchQuery,
  setFilteredItems,
  styles,
  isDropdownVisible,
  setIsDropdownVisible,
  ...props
  // Resets the highlighted index to 0 after the items are filtered to ensure correct display and selection.
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // The handleSelect function updates the selected item state, invokes the onSelect callback if provided, and hides the dropdown.
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
      // Conditionally rendering a label for the ComboBox if the label prop is provided.
      setFilteredItems(filtered);
    }
    // Main container for the ComboBox with specified styles and behaviors.
    setHighlightedIndex(0);
  };
  const handleSelect = (item: ComboBoxItem) => {
    setSelectedItem(item);
    onSelect?.(item);
    setIsDropdownVisible(false);
    // Inner container that responds to clicks to toggle the visibility of the dropdown.
  };
  return (
    <Horizontal
      role="combobox"
      wrap="nowrap"
      gap={15}
      // Display of the currently selected item's label within the combobox.
      alignItems="center"
      width="100%"
      {...props}
    >
      // Conditionally rendered right-aligned component passed through props,
      typically used for actions or indicators.
      {label && (
        // Toggle the dropdown visibility based on its current state, only shown if isDropdownVisible is true.
        <Text styles={styles?.label} htmlFor={props.id}>
          {label}
        </Text>
      )}
      <View position="relative">
        <Horizontal
          cursor="pointer"
          backgroundColor="white"
          // Search input field for filtering items within the dropdown, visible only if searchEnabled is true.
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
            // Mapping over filteredItems to display them as selectable options in a list within the dropdown.
            position="relative"
            width="100%"
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            // Each item in the dropdown can be highlighted on mouse enter, and selected on click.
            {...styles?.labelContainer}
          >
            {left}
            <Text weight="medium" flexGrow={1} {...styles?.label}>
              {selectedItem.label}
            </Text>
            // Optionally display a tick icon next to the currently selected
            item if showTick is true and the item doesn't have its own icon.
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
