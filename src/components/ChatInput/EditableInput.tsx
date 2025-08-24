import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { View, Text, Vertical, useElementPosition } from 'app-studio';

export interface Suggestion {
  id: string;
  text: string;
  description?: string;
}

interface MentionData {
  id: string;
  name: string;
  avatar?: string;
  description?: string;
}

interface EditableInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  suggestions?: Suggestion[];
  onSuggestionSelect?: (suggestion: Suggestion) => void;
  showSuggestions?: boolean;
  mentionData?: MentionData[];
  mentionTrigger?: string;
  onMentionSelect?: (mention: MentionData) => void;
  maxHeight?: string;
  minHeight?: string;
  views?: {
    container?: any;
    input?: any;
    placeholder?: any;
    suggestionsContainer?: any;
    suggestionItem?: any;
    mentionContainer?: any;
    mentionItem?: any;
  };
}

export const EditableInput = forwardRef<HTMLDivElement, EditableInputProps>(
  (
    {
      value,
      onChange,
      placeholder = 'Type your message...',
      disabled = false,
      autoFocus = true,
      suggestions = [],
      onSuggestionSelect,
      showSuggestions = false,
      mentionData = [],
      mentionTrigger = '@',
      onMentionSelect,
      maxHeight = '200px',
      minHeight = '40px',
      views = {},
    },
    ref
  ) => {
    const lastValueRef = useRef(value);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const [showPlaceholder, setShowPlaceholder] = useState(!value);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    // Mention-specific state
    const [showMentions, setShowMentions] = useState(false);
    const [mentionQuery, setMentionQuery] = useState('');
    const [mentionStartPos, setMentionStartPos] = useState(-1);
    const [selectedMentionIndex, setSelectedMentionIndex] = useState(-1);
    const [filteredMentions, setFilteredMentions] = useState<MentionData[]>([]);

    // Use useElementPosition for intelligent dropdown positioning
    const { ref: positionRef, relation } = useElementPosition({
      trackChanges: true,
      trackOnHover: true,
      trackOnScroll: true,
      trackOnResize: true,
    });

    // Positioning state for dropdowns
    const [mentionPosition, setMentionPosition] = useState({ x: 0, y: 0 });
    const [suggestionPosition, setSuggestionPosition] = useState({
      x: 0,
      y: 0,
    });

    // Update the content of the editable div when the value prop changes
    useEffect(() => {
      const editableDiv = ref as React.RefObject<HTMLDivElement>;
      if (editableDiv.current && value !== lastValueRef.current) {
        editableDiv.current.textContent = value;
        lastValueRef.current = value;
        setShowPlaceholder(!value);
      }
    }, [value, ref]);

    // Auto-focus effect
    useEffect(() => {
      if (autoFocus && ref && typeof ref === 'object' && ref.current) {
        ref.current.focus();
      }
    }, [autoFocus, ref]);

    // Get cursor position
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

    // Check for mention trigger and filter mentions
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

            // Calculate position for mentions dropdown
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

    // Sync the position ref with the container ref for positioning calculations
    useEffect(() => {
      if (containerRef.current && positionRef) {
        (positionRef as any).current = containerRef.current;
      }
    }, [containerRef, positionRef]);

    // Calculate optimal position for dropdowns using useElementPosition
    const calculateDropdownPosition = useCallback(
      (dropdownHeight: number = 200) => {
        if (!containerRef.current) return { x: 0, y: 0 };

        const containerRect = containerRef.current.getBoundingClientRect();

        // Use relation data for intelligent positioning if available
        if (relation) {
          const useTopPlacement = relation.space.vertical === 'top';
          return {
            x: containerRect.left,
            y: useTopPlacement
              ? containerRect.top - dropdownHeight - 8
              : containerRect.bottom + 8,
          };
        }

        // Fallback to manual calculation if relation data is not available
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

    // Handle focus events
    const handleFocus = useCallback(() => {
      setIsFocused(true);
      // Calculate position for suggestions when focused
      const position = calculateDropdownPosition();
      setSuggestionPosition(position);
    }, [calculateDropdownPosition]);

    const handleBlur = useCallback(() => {
      // Delay hiding to allow for dropdown interactions
      setTimeout(() => {
        setIsFocused(false);
        setSelectedSuggestionIndex(-1);
      }, 150);
    }, []);

    // Handle input events
    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
      const newValue = e.currentTarget.textContent || '';
      if (newValue !== lastValueRef.current) {
        onChange(newValue);
        lastValueRef.current = newValue;
        setShowPlaceholder(!newValue);

        // Check for mentions
        const cursorPos = getCursorPosition();
        checkForMentions(newValue, cursorPos);
      }
    };

    // Handle mention selection
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

          // Set cursor position after the mention
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

    // Handle suggestion selection
    const handleSuggestionSelect = useCallback(
      (suggestion: Suggestion) => {
        if (onSuggestionSelect) {
          onSuggestionSelect(suggestion);
        }
        setSelectedSuggestionIndex(-1);
      },
      [onSuggestionSelect]
    );

    // Handle key down events
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      // Handle mention navigation
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

      // Handle suggestion navigation
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

      // Allow Enter for line breaks (remove submission on Enter)
      // Submission should only happen via the send button
    };

    return (
      <View
        ref={containerRef}
        width="100%"
        position="relative"
        {...views?.container}
      >
        {/* Input Container */}
        <View
          width="100%"
          minHeight={minHeight}
          maxHeight={maxHeight}
          overflowY="auto"
          position="relative"
        >
          {/* Placeholder */}
          {showPlaceholder && (
            <Text
              position="absolute"
              top="8px"
              left="8px"
              color="color.gray.400"
              pointerEvents="none"
              fontSize="14px"
              lineHeight="1.5"
              zIndex={1}
              {...views?.placeholder}
            >
              {placeholder}
            </Text>
          )}

          {/* Editable Input */}
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
            lineHeight="1.5"
            color="color.gray.900"
            backgroundColor="transparent"
            {...views?.input}
          />
        </View>

        {/* Mentions Dropdown */}
        {showMentions && filteredMentions.length > 0 && (
          <View
            position="fixed"
            left={mentionPosition.x}
            top={mentionPosition.y}
            width={containerRef.current?.offsetWidth || 300}
            backgroundColor="color.white"
            border="2px solid"
            borderColor="color.blue.300"
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
                      ? 'color.blue.50'
                      : 'transparent'
                  }
                  border="none"
                  cursor="pointer"
                  textAlign="left"
                  transition="background-color 0.2s ease"
                  onClick={() => handleMentionSelect(mention)}
                  onMouseEnter={() => setSelectedMentionIndex(index)}
                  _hover={{
                    backgroundColor: 'color.blue.50',
                  }}
                  {...views?.mentionItem}
                >
                  <Vertical gap={4}>
                    <Text
                      fontSize="14px"
                      color="color.gray.900"
                      fontWeight="medium"
                    >
                      {mentionTrigger}
                      {mention.name}
                    </Text>
                    {mention.description && (
                      <Text fontSize="12px" color="color.gray.600">
                        {mention.description}
                      </Text>
                    )}
                  </Vertical>
                </View>
              ))}
              {/* Debug info - can be removed in production */}
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

        {/* Suggestions Dropdown - Only show on focus and when no value */}
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
              backgroundColor="color.white"
              border="2px solid"
              borderColor="color.green.300"
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
                        ? 'color.blue.50'
                        : 'transparent'
                    }
                    border="none"
                    cursor="pointer"
                    textAlign="left"
                    transition="background-color 0.2s ease"
                    onClick={() => handleSuggestionSelect(suggestion)}
                    onMouseEnter={() => setSelectedSuggestionIndex(index)}
                    _hover={{
                      backgroundColor: 'color.blue.50',
                    }}
                    {...views?.suggestionItem}
                  >
                    <Vertical gap={4}>
                      <Text
                        fontSize="14px"
                        color="color.gray.900"
                        fontWeight="medium"
                      >
                        {suggestion.text}
                      </Text>
                      {suggestion.description && (
                        <Text fontSize="12px" color="color.gray.600">
                          {suggestion.description}
                        </Text>
                      )}
                    </Vertical>
                  </View>
                ))}
                {/* Debug info - can be removed in production */}
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
