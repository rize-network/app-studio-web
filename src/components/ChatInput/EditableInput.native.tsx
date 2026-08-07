import React, { forwardRef, useCallback, useState } from 'react';
import { View, Text, Vertical, Input } from 'app-studio';

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
  // The current string value displayed in the input.
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
  // Field name forwarded to the underlying `TextInput`. Web renders a hidden mirror `<textarea>` under this name; native has a real text input already, so it is only an identifier here.
  name?: string;
  // DOM/native id forwarded to the underlying `TextInput`.
  id?: string;
  // Web-only: renders a hidden mirror `<textarea>`. Accepted here for API parity and ignored — native already exposes a real text input.
  hiddenInput?: boolean;
  // Web-only: ref to the hidden mirror `<textarea>`. Accepted here for API parity and never populated on native.
  hiddenInputRef?: any;
  // An optional object allowing custom React components to be passed for various internal parts of the `EditableInput`.
  views?: {
    container?: any;
    input?: any;
    // Web-only: styles for the hidden mirror `<textarea>`; ignored on native.
    hiddenInput?: any;
    placeholder?: any;
    suggestionsContainer?: any;
    suggestionItem?: any;
    mentionContainer?: any;
    mentionItem?: any;
  };
}

/**
 * React Native variant of `EditableInput`.
 *
 * React Native has no DOM, so the web version's `contentEditable` div,
 * `window.getSelection`, `document.createRange`, and `getBoundingClientRect`
 * based positioning are not available. This variant uses app-studio's `Input`
 * (a TextInput on native) with `multiline`, wired to the same `value`/`onChange`
 * contract. Mentions and suggestions are rendered as a simple inline list of
 * `View`/`Text` choices that invoke the same selection callbacks.
 */
export const EditableInput = forwardRef<any, EditableInputProps>(
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
      name,
      id,
      // Web-only props, accepted for API parity: native renders a real `TextInput`, so no mirror is needed.
      hiddenInput: _hiddenInput,
      hiddenInputRef: _hiddenInputRef,
      views = {},
    },
    ref
  ) => {
    // State variable to control the visibility of the mention dropdown list.
    const [showMentions, setShowMentions] = useState(false);
    // State variable holding the list of `MentionData` objects filtered by the current mention query.
    const [filteredMentions, setFilteredMentions] = useState<MentionData[]>([]);
    // State variable to store the starting character index of the mention trigger in the input text.
    const [mentionStartPos, setMentionStartPos] = useState(-1);
    // State variable to store the text being typed after the mention trigger (e.g., 'joh' in '@joh').
    const [mentionQuery, setMentionQuery] = useState('');
    // State variable to track whether the input field currently has focus (controls suggestion visibility).
    const [isFocused, setIsFocused] = useState(false);

    // Analyzes the typed text for an active mention trigger and filters `mentionData` accordingly.
    const checkForMentions = useCallback(
      (text: string) => {
        // On native we don't have a caret position; use end of string as cursor.
        const triggerIndex = text.lastIndexOf(mentionTrigger);
        if (triggerIndex !== -1) {
          const afterTrigger = text.substring(triggerIndex + 1);
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
            return;
          }
        }
        setShowMentions(false);
        setMentionQuery('');
        setMentionStartPos(-1);
      },
      [mentionData, mentionTrigger]
    );

    // Handles text changes from the native `Input`, updating the value and checking for mentions.
    const handleChangeText = useCallback(
      (text: string) => {
        onChange(text);
        checkForMentions(text);
      },
      [onChange, checkForMentions]
    );

    // Inserts a selected mention into the input text, replacing the active mention query.
    const handleMentionSelect = useCallback(
      (mention: MentionData) => {
        if (mentionStartPos !== -1) {
          const beforeMention = value.substring(0, mentionStartPos);
          const afterMention = value.substring(
            mentionStartPos + mentionTrigger.length + mentionQuery.length
          );
          const newText =
            beforeMention + mentionTrigger + mention.name + ' ' + afterMention;
          onChange(newText);
        }
        setShowMentions(false);
        setMentionQuery('');
        setMentionStartPos(-1);
        if (onMentionSelect) {
          onMentionSelect(mention);
        }
      },
      [
        value,
        mentionStartPos,
        mentionTrigger,
        mentionQuery,
        onChange,
        onMentionSelect,
      ]
    );

    // Handles the selection of a suggestion, invoking the `onSuggestionSelect` prop if provided.
    const handleSuggestionSelect = useCallback(
      (suggestion: Suggestion) => {
        if (onSuggestionSelect) {
          onSuggestionSelect(suggestion);
        }
      },
      [onSuggestionSelect]
    );

    return (
      <View ref={ref} width="100%" position="relative" {...views?.container}>
        <View
          width="100%"
          minHeight={minHeight}
          maxHeight={maxHeight}
          position="relative"
        >
          <Input
            multiline
            id={id}
            name={name}
            value={value}
            onChangeText={handleChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            editable={!disabled}
            autoFocus={autoFocus}
            width="100%"
            minHeight="24px"
            padding="8px"
            fontSize="14px"
            color="color-gray-900"
            backgroundColor="transparent"
            {...views?.input}
          />
        </View>

        {/* Mentions list */}
        {showMentions && filteredMentions.length > 0 && (
          <View
            width="100%"
            backgroundColor="color-white"
            border="2px solid"
            borderColor="color-blue-300"
            borderRadius="8px"
            maxHeight="200px"
            marginTop={4}
            {...views?.mentionContainer}
          >
            <Vertical gap={0}>
              {filteredMentions.map((mention) => (
                <View
                  key={mention.id}
                  width="100%"
                  padding="12px 16px"
                  backgroundColor="transparent"
                  onPress={() => handleMentionSelect(mention)}
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
            </Vertical>
          </View>
        )}

        {/* Suggestions list */}
        {showSuggestions &&
          suggestions.length > 0 &&
          !showMentions &&
          isFocused &&
          !value && (
            <View
              width="100%"
              backgroundColor="color-white"
              border="2px solid"
              borderColor="color-green-300"
              borderRadius="8px"
              maxHeight="200px"
              marginTop={4}
              {...views?.suggestionsContainer}
            >
              <Vertical gap={0}>
                {suggestions.map((suggestion) => (
                  <View
                    key={suggestion.id}
                    width="100%"
                    padding="12px 16px"
                    backgroundColor="transparent"
                    onPress={() => handleSuggestionSelect(suggestion)}
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
              </Vertical>
            </View>
          )}
      </View>
    );
  }
);
EditableInput.displayName = 'EditableInput';
