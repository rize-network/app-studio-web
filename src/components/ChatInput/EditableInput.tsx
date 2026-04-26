import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { View, Text, Vertical, useElementPosition } from 'app-studio';
// Defines the structure for a suggestion object, typically used for autocomplete functionality.
export interface Suggestion {
  // A unique identifier for the suggestion.
  id: string;
  // The main text content of the suggestion.
  text: string;
  // An optional additional description for the suggestion, providing more context.
  description?: string;
}
// Defines the structure for a mentionable user or item, used in features like @-mentions.
interface MentionData {
  // A unique identifier for the mention item.
  id: string;
  // The name of the mentionable item or user.
  name: string;
  // An optional URL for the mentionable item's avatar or icon.
  avatar?: string;
  // An optional additional description for the mention item.
  description?: string;
}
// Defines the properties accepted by the `EditableInput` component, specifying its configurable behavior and data.
interface EditableInputProps {
  // The current string value displayed in the content-editable input.
  value: string;
  // Callback function triggered when the input's content changes, providing the new value.
  onChange: (value: string) => void;
  // Optional placeholder text to display when the input is empty.
  placeholder?: string;
  // Boolean flag to disable user interaction with the input.
  disabled?: boolean;
  // Boolean flag to automatically focus the input field on component mount.
  autoFocus?: boolean;
  // An array of `Suggestion` objects to display for autocomplete.
  suggestions?: Suggestion[];
  // Callback function triggered when a suggestion is selected, passing the chosen suggestion.
  onSuggestionSelect?: (suggestion: Suggestion) => void;
  // Boolean flag to control the visibility of the suggestion dropdown.
  showSuggestions?: boolean;
  // An array of `MentionData` objects available for @-mentions.
  mentionData?: MentionData[];
  // The character (e.g., '@') that initiates the mention selection process.
  mentionTrigger?: string;
  // Callback function triggered when a mention is selected, passing the chosen mention.
  onMentionSelect?: (mention: MentionData) => void;
  // Sets the maximum height for the editable input area, allowing it to grow up to this limit.
  maxHeight?: string;
  // Sets the minimum height for the editable input area.
  minHeight?: string;
  // An optional object allowing custom React components to be passed for various internal parts of the `EditableInput`.
  views?: {
    // Custom view component for the main container.
    container?: any;
    // Custom view component for the editable input area itself.
    input?: any;
    // Custom view component for the placeholder text.
    placeholder?: any;
    // Custom view component for the container holding suggestions.
    suggestionsContainer?: any;
    // Custom view component for individual suggestion items.
    suggestionItem?: any;
    // Custom view component for the container holding mentions.
    mentionContainer?: any;
    // Custom view component for individual mention items.
    mentionItem?: any;
  };
}
// Defines the `EditableInput` functional component, which is wrapped with `forwardRef` to allow parent components to get a direct reference to the DOM element.
export const EditableInput = forwardRef<HTMLDivElement, EditableInputProps>(
  (
    {
      // The current string content of the editable input.
      value,
      // A callback function triggered when the input value changes.
      onChange,
      // The placeholder text to display when the input is empty; defaults to 'Type your message...'.
      placeholder = 'Type your message...',
      // Boolean flag indicating if the input is disabled; defaults to `false`.
      disabled = false,
      // Boolean flag to automatically focus the input on mount; defaults to `true`.
      autoFocus = true,
      // An array of `Suggestion` objects for autocomplete; defaults to an empty array.
      suggestions = [],
      // Optional callback executed when a suggestion is selected.
      onSuggestionSelect,
      // Boolean flag to control the visibility of suggestions; defaults to `false`.
      showSuggestions = false,
      // An array of `MentionData` objects for @-mentions; defaults to an empty array.
      mentionData = [],
      // The character that triggers mention suggestions; defaults to '@'.
      mentionTrigger = '@',
      // Optional callback executed when a mention is selected.
      onMentionSelect,
      // The maximum height of the editable area; defaults to '200px'.
      maxHeight = '200px',
      // The minimum height of the editable area; defaults to '40px'.
      minHeight = '40px',
      // Custom view components to override default rendering for internal elements.
      views = {},
    },
    // The forwarded ref, allowing a parent component to access the underlying `HTMLDivElement`.
    ref
  ) => {
    // A mutable ref object to store the last known `value` prop, used to track changes and prevent unnecessary DOM updates when the prop is identical.
    const lastValueRef = useRef(value);
    // State variable to keep track of the currently highlighted suggestion's index for keyboard navigation.
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    // State variable to control the visibility of the placeholder text based on whether the input has content.
    const [showPlaceholder, setShowPlaceholder] = useState(!value);
    // A ref to the main container `View` element, used for calculating the position of dropdowns.
    const containerRef = useRef<HTMLDivElement>(null);
    // State variable to track whether the input field currently has focus.
    const [isFocused, setIsFocused] = useState(false);
    // State variable to control the visibility of the mention dropdown list.
    const [showMentions, setShowMentions] = useState(false);
    // State variable to store the text being typed after the mention trigger (e.g., 'joh' in '@joh').
    const [mentionQuery, setMentionQuery] = useState('');
    // State variable to store the starting character index of the mention trigger in the input text.
    const [mentionStartPos, setMentionStartPos] = useState(-1);
    // State variable to keep track of the currently highlighted mention's index for keyboard navigation.
    const [selectedMentionIndex, setSelectedMentionIndex] = useState(-1);
    // State variable holding the list of `MentionData` objects filtered by the current `mentionQuery`.
    const [filteredMentions, setFilteredMentions] = useState<MentionData[]>([]);
    // A custom hook from 'app-studio' used to track the position and available space around the input container, essential for positioning floating elements like dropdowns.
    const { ref: positionRef, relation } = useElementPosition({
      trackChanges: true,
      trackOnHover: true,
      trackOnScroll: true,
      trackOnResize: true,
    });
    // State variable to store the calculated `x` and `y` coordinates for positioning the mention dropdown.
    const [mentionPosition, setMentionPosition] = useState({ x: 0, y: 0 });
    // State variable to store the calculated `x` and `y` coordinates for positioning the suggestion dropdown.
    const [suggestionPosition, setSuggestionPosition] = useState({
      x: 0,
      y: 0,
    });
    // An effect hook that synchronizes the `textContent` of the content-editable div with the component's `value` prop and updates placeholder visibility.
    useEffect(() => {
      const editableDiv = ref as React.RefObject<HTMLDivElement>;
      if (editableDiv.current && value !== lastValueRef.current) {
        editableDiv.current.textContent = value;
        lastValueRef.current = value;
        setShowPlaceholder(!value);
      }
    }, [value, ref]);
    // An effect hook to automatically focus the content-editable input element if the `autoFocus` prop is true when the component mounts or `autoFocus` changes.
    useEffect(() => {
      if (autoFocus && ref && typeof ref === 'object' && ref.current) {
        ref.current.focus();
      }
    }, [autoFocus, ref]);
    // A utility function to accurately determine the current cursor (caret) position within the content-editable div.
    const getCursorPosition = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return -1;
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(
        ref && typeof ref === 'object' && ref.current
          ? ref.current
          : document.body
      );
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      return preCaretRange.toString().length;
    };
    // A memoized callback function that analyzes the input text for mention triggers and filters `mentionData` accordingly, updating mention-related states.
    const checkForMentions = useCallback(
      (text: string, cursorPos: number) => {
        const beforeCursor = text.substring(0, cursorPos);
        const triggerIndex = beforeCursor.lastIndexOf(mentionTrigger);
        if (triggerIndex !== -1) {
          const afterTrigger = beforeCursor.substring(triggerIndex + 1);
          const hasSpaceAfterTrigger = afterTrigger.includes(' ');
          if (!hasSpaceAfterTrigger) {
            const query = afterTrigger.toLowerCase();
            const filtered = mentionData.filter((mention) =>
              mention.name.toLowerCase().includes(query)
            );
            setMentionQuery(query);
            setMentionStartPos(triggerIndex);
            setFilteredMentions(filtered);
            setShowMentions(filtered.length > 0);
            setSelectedMentionIndex(0);
            const position = calculateDropdownPosition();
            setMentionPosition(position);
            return;
          }
        }
        setShowMentions(false);
        setMentionQuery('');
        setMentionStartPos(-1);
        setSelectedMentionIndex(-1);
      },
      [mentionData, mentionTrigger]
    );
    // An effect hook to assign the component's `containerRef.current` to the `positionRef` from the `useElementPosition` hook, allowing it to track the main input container.
    useEffect(() => {
      if (containerRef.current && positionRef) {
        (positionRef as any).current = containerRef.current;
      }
    }, [containerRef, positionRef]);
    // A memoized callback function to calculate the optimal `x` and `y` position for a dropdown (mentions or suggestions) relative to the input container and viewport.
    const calculateDropdownPosition = useCallback(
      (dropdownHeight: number = 200) => {
        if (!containerRef.current) return { x: 0, y: 0 };
        const containerRect = containerRef.current.getBoundingClientRect();
        if (relation) {
          const useTopPlacement = relation.space.vertical === 'top';
          return {
            x: containerRect.left,
            y: useTopPlacement
              ? containerRect.top - dropdownHeight - 8
              : containerRect.bottom + 8,
          };
        }
        const viewportHeight = window.innerHeight;
        const availableSpace = {
          top: containerRect.top,
          bottom: viewportHeight - containerRect.bottom,
        };
        const useTopPlacement =
          availableSpace.bottom < dropdownHeight + 8 &&
          availableSpace.top > availableSpace.bottom;
        return {
          x: containerRect.left,
          y: useTopPlacement
            ? containerRect.top - dropdownHeight - 8
            : containerRect.bottom + 8,
        };
      },
      [relation]
    );
    // A memoized callback function that sets the `isFocused` state to true and calculates the suggestion dropdown's position when the input gains focus.
    const handleFocus = useCallback(() => {
      setIsFocused(true);
      const position = calculateDropdownPosition();
      setSuggestionPosition(position);
    }, [calculateDropdownPosition]);
    // A memoized callback function that sets `isFocused` to false and resets the `selectedSuggestionIndex` after a short delay when the input loses focus, allowing for click events on dropdowns to register.
    const handleBlur = useCallback(() => {
      setTimeout(() => {
        setIsFocused(false);
        setSelectedSuggestionIndex(-1);
      }, 150);
    }, []);
    // Handles the `onInput` event for the content-editable div, updating the component's value, placeholder, and checking for mentions.
    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
      const newValue = e.currentTarget.textContent || '';
      if (newValue !== lastValueRef.current) {
        onChange(newValue);
        lastValueRef.current = newValue;
        setShowPlaceholder(!newValue);
        const cursorPos = getCursorPosition();
        checkForMentions(newValue, cursorPos);
      }
    };
    // A memoized callback function responsible for inserting a selected mention into the input text, updating the value, and repositioning the cursor.
    const handleMentionSelect = useCallback(
      (mention: MentionData) => {
        if (ref && typeof ref === 'object' && ref.current) {
          const currentText = ref.current.textContent || '';
          const beforeMention = currentText.substring(0, mentionStartPos);
          const afterMention = currentText.substring(
            mentionStartPos + mentionTrigger.length + mentionQuery.length
          );
          const newText =
            beforeMention + mentionTrigger + mention.name + ' ' + afterMention;
          onChange(newText);
          lastValueRef.current = newText;
          ref.current.textContent = newText;
          const newCursorPos =
            beforeMention.length +
            mentionTrigger.length +
            mention.name.length +
            1;
          setTimeout(() => {
            if (ref.current) {
              const range = document.createRange();
              const selection = window.getSelection();
              const textNode = ref.current.firstChild;
              if (textNode && selection) {
                range.setStart(
                  textNode,
                  Math.min(newCursorPos, textNode.textContent?.length || 0)
                );
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
              }
            }
          }, 0);
        }
        setShowMentions(false);
        setMentionQuery('');
        setMentionStartPos(-1);
        setSelectedMentionIndex(-1);
        if (onMentionSelect) {
          onMentionSelect(mention);
        }
      },
      [
        mentionStartPos,
        mentionTrigger,
        mentionQuery,
        onChange,
        onMentionSelect,
        ref,
      ]
    );
    // A memoized callback function that handles the selection of a suggestion, invoking the `onSuggestionSelect` prop if provided and resetting the selected index.
    const handleSuggestionSelect = useCallback(
      (suggestion: Suggestion) => {
        if (onSuggestionSelect) {
          onSuggestionSelect(suggestion);
        }
        setSelectedSuggestionIndex(-1);
      },
      [onSuggestionSelect]
    );
    // Handles keyboard events within the content-editable div, enabling navigation (ArrowUp/Down) and selection (Tab/Enter/Escape) for both mention and suggestion dropdowns.
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (showMentions && filteredMentions.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedMentionIndex((prev) =>
            prev < filteredMentions.length - 1 ? prev + 1 : 0
          );
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedMentionIndex((prev) =>
            prev > 0 ? prev - 1 : filteredMentions.length - 1
          );
          return;
        }
        if (
          (e.key === 'Tab' || e.key === 'Enter') &&
          selectedMentionIndex >= 0
        ) {
          e.preventDefault();
          handleMentionSelect(filteredMentions[selectedMentionIndex]);
          return;
        }
        if (e.key === 'Escape') {
          setShowMentions(false);
          setSelectedMentionIndex(-1);
          return;
        }
      }
      if (showSuggestions && suggestions.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedSuggestionIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedSuggestionIndex((prev) =>
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          return;
        }
        if (e.key === 'Tab' && selectedSuggestionIndex >= 0) {
          e.preventDefault();
          handleSuggestionSelect(suggestions[selectedSuggestionIndex]);
          return;
        }
        if (e.key === 'Escape') {
          setSelectedSuggestionIndex(-1);
          return;
        }
      }
    };
    return (
      <View
        ref={containerRef}
        width="100%"
        position="relative"
        {...views?.container}
      >
        {}
        <View
          width="100%"
          minHeight={minHeight}
          maxHeight={maxHeight}
          overflowY="auto"
          position="relative"
        >
          {}
          {showPlaceholder && (
            <Text
              position="absolute"
              top="8px"
              left="8px"
              color="color-gray-400"
              pointerEvents="none"
              fontSize="14px"
              zIndex={1}
              {...views?.placeholder}
            >
              {placeholder}
            </Text>
          )}
          {}
          <View
            as="div"
            ref={ref}
            contentEditable={!disabled}
            suppressContentEditableWarning={true}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            role="textbox"
            aria-multiline="true"
            aria-placeholder={placeholder}
            width="100%"
            minHeight="24px"
            padding="8px"
            outline="none"
            whiteSpace="pre-wrap"
            wordBreak="break-word"
            fontSize="14px"
            color="color-gray-900"
            backgroundColor="transparent"
            {...views?.input}
          />
        </View>
        {}
        {showMentions && filteredMentions.length > 0 && (
          <View
            position="fixed"
            left={mentionPosition.x}
            top={mentionPosition.y}
            width={containerRef.current?.offsetWidth || 300}
            backgroundColor="color-white"
            border="2px solid"
            borderColor="color-blue-300"
            borderRadius="8px"
            boxShadow="0 8px 24px rgba(0, 0, 0, 0.15)"
            zIndex={9999}
            maxHeight="200px"
            overflowY="auto"
            {...views?.mentionContainer}
          >
            <Vertical gap={0}>
              {filteredMentions.map((mention, index) => (
                <View
                  key={mention.id}
                  as="button"
                  type="button"
                  width="100%"
                  padding="12px 16px"
                  backgroundColor={
                    index === selectedMentionIndex
                      ? 'color-blue-50'
                      : 'transparent'
                  }
                  border="none"
                  cursor="pointer"
                  textAlign="left"
                  transition="background-color 0.2s ease"
                  onClick={() => handleMentionSelect(mention)}
                  onMouseEnter={() => setSelectedMentionIndex(index)}
                  _hover={{
                    backgroundColor: 'color-blue-50',
                  }}
                  {...views?.mentionItem}
                >
                  <Vertical gap={4}>
                    <Text
                      fontSize="14px"
                      color="color-gray-900"
                      fontWeight="medium"
                    >
                      {mentionTrigger}
                      {mention.name}
                    </Text>
                    {mention.description && (
                      <Text fontSize="12px" color="color-gray-600">
                        {mention.description}
                      </Text>
                    )}
                  </Vertical>
                </View>
              ))}
              {}
              {process.env.NODE_ENV === 'development' && (
                <div style={{ fontSize: '8px', opacity: 0.7, padding: '4px' }}>
                  Mentions (Trigger: {mentionTrigger})
                  {relation && (
                    <>
                      <br />
                      Space: {relation.space.vertical}-
                      {relation.space.horizontal}
                    </>
                  )}
                </div>
              )}
            </Vertical>
          </View>
        )}
        {}
        {showSuggestions &&
          suggestions.length > 0 &&
          !showMentions &&
          isFocused &&
          !value && (
            <View
              position="fixed"
              left={suggestionPosition.x}
              top={suggestionPosition.y}
              width={containerRef.current?.offsetWidth || 300}
              backgroundColor="color-white"
              border="2px solid"
              borderColor="color-green-300"
              borderRadius="8px"
              boxShadow="0 8px 24px rgba(0, 0, 0, 0.15)"
              zIndex={9998}
              maxHeight="200px"
              overflowY="auto"
              {...views?.suggestionsContainer}
            >
              <Vertical gap={0}>
                {suggestions.map((suggestion, index) => (
                  <View
                    key={suggestion.id}
                    as="button"
                    type="button"
                    width="100%"
                    padding="12px 16px"
                    backgroundColor={
                      index === selectedSuggestionIndex
                        ? 'color-blue-50'
                        : 'transparent'
                    }
                    border="none"
                    cursor="pointer"
                    textAlign="left"
                    transition="background-color 0.2s ease"
                    onClick={() => handleSuggestionSelect(suggestion)}
                    onMouseEnter={() => setSelectedSuggestionIndex(index)}
                    _hover={{
                      backgroundColor: 'color-blue-50',
                    }}
                    {...views?.suggestionItem}
                  >
                    <Vertical gap={4}>
                      <Text
                        fontSize="14px"
                        color="color-gray-900"
                        fontWeight="medium"
                      >
                        {suggestion.text}
                      </Text>
                      {suggestion.description && (
                        <Text fontSize="12px" color="color-gray-600">
                          {suggestion.description}
                        </Text>
                      )}
                    </Vertical>
                  </View>
                ))}
                {}
                {process.env.NODE_ENV === 'development' && (
                  <div
                    style={{ fontSize: '8px', opacity: 0.7, padding: '4px' }}
                  >
                    Suggestions (Focus-triggered)
                    {relation && (
                      <>
                        <br />
                        Space: {relation.space.vertical}-
                        {relation.space.horizontal}
                      </>
                    )}
                  </div>
                )}
              </Vertical>
            </View>
          )}
      </View>
    );
  }
);
EditableInput.displayName = 'EditableInput';
