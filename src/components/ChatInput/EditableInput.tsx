'use client';

import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { View, Text, Vertical } from 'app-studio';

interface Suggestion {
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

    // Mention-specific state
    const [showMentions, setShowMentions] = useState(false);
    const [mentionQuery, setMentionQuery] = useState('');
    const [mentionStartPos, setMentionStartPos] = useState(-1);
    const [selectedMentionIndex, setSelectedMentionIndex] = useState(-1);
    const [filteredMentions, setFilteredMentions] = useState<MentionData[]>([]);

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
            position="absolute"
            top="calc(100% + 4px)"
            left="0"
            right="0"
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
            </Vertical>
          </View>
        )}

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && !showMentions && (
          <View
            position="absolute"
            top="calc(100% + 4px)"
            left="0"
            right="0"
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
            </Vertical>
          </View>
        )}
      </View>
    );
  }
);

EditableInput.displayName = 'EditableInput';
