import React, { useState } from 'react';
import { View, Vertical, Text, Horizontal } from 'app-studio';
import { EditableInput } from '../EditableInput';

export const MentionEditableInputDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [selectedMentions, setSelectedMentions] = useState<any[]>([]);

  const suggestions = [
    {
      id: '1',
      text: 'Tell me a joke',
      description: 'Get a funny joke to brighten your day',
    },
    {
      id: '2',
      text: 'What is the weather today?',
      description: 'Check current weather conditions',
    },
    {
      id: '3',
      text: 'How do I create a React component?',
      description: 'Learn React component development',
    },
    {
      id: '4',
      text: 'Write a poem about coding',
      description: 'Generate creative content about programming',
    },
  ];

  const mentionData = [
    {
      id: '1',
      name: 'john_doe',
      description: 'Frontend Developer',
    },
    {
      id: '2',
      name: 'jane_smith',
      description: 'UI/UX Designer',
    },
    {
      id: '3',
      name: 'mike_wilson',
      description: 'Backend Developer',
    },
    {
      id: '4',
      name: 'sarah_jones',
      description: 'Product Manager',
    },
    {
      id: '5',
      name: 'alex_brown',
      description: 'DevOps Engineer',
    },
    {
      id: '6',
      name: 'lisa_davis',
      description: 'QA Engineer',
    },
  ];

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setSubmittedMessage(inputValue);
      setInputValue('');
      setSelectedMentions([]);
    }
  };

  const handleSuggestionSelect = (suggestion: any) => {
    setInputValue(suggestion.text);
  };

  const handleMentionSelect = (mention: any) => {
    setSelectedMentions((prev) => [...prev, mention]);
  };

  return (
    <Vertical gap={20} padding="20px" maxWidth="600px">
      <Text fontSize="18px" fontWeight="bold">
        Enhanced Editable Input with @ Mentions Demo
      </Text>

      <Text fontSize="14px" color="color.gray.600">
        Features: • Visible placeholder text • Auto-growing height • Line breaks
        with Enter key • @ mention auto-completion • Auto-completion suggestions
        • Submit only via button (not Enter key)
      </Text>

      <View
        padding="12px"
        backgroundColor="color.blue.50"
        border="1px solid"
        borderColor="color.blue.200"
        borderRadius="6px"
      >
        <Text fontSize="14px" fontWeight="medium" color="color.blue.800">
          Try typing "@" to see mention suggestions!
        </Text>
        <Text fontSize="12px" color="color.blue.700" marginTop="4px">
          Available users: @john_doe, @jane_smith, @mike_wilson, @sarah_jones,
          @alex_brown, @lisa_davis
        </Text>
      </View>

      <View
        border="1px solid"
        borderColor="color.gray.300"
        borderRadius="8px"
        padding="16px"
        backgroundColor="color.white"
        overflow="visible"
        position="relative"
      >
        <Vertical gap={12}>
          <EditableInput
            value={inputValue}
            onChange={setInputValue}
            placeholder="Type your message here... Use @ to mention someone, Enter for new lines"
            suggestions={suggestions}
            showSuggestions={!inputValue && suggestions.length > 0}
            onSuggestionSelect={handleSuggestionSelect}
            mentionData={mentionData}
            mentionTrigger="@"
            onMentionSelect={handleMentionSelect}
            maxHeight="150px"
            minHeight="60px"
            views={{
              container: {
                border: '1px solid',
                borderColor: 'color.gray.300',
                borderRadius: '8px',
                backgroundColor: 'color.white',
                padding: '8px',
              },
            }}
          />

          <Horizontal justifyContent="space-between" alignItems="center">
            {selectedMentions.length > 0 && (
              <View>
                <Text fontSize="12px" color="color.gray.600" marginBottom="4px">
                  Mentioned:
                </Text>
                <Horizontal gap={4} flexWrap="wrap">
                  {selectedMentions.map((mention, index) => (
                    <View
                      key={`${mention.id}-${index}`}
                      padding="2px 6px"
                      backgroundColor="color.blue.100"
                      borderRadius="4px"
                      border="1px solid"
                      borderColor="color.blue.200"
                    >
                      <Text fontSize="12px" color="color.blue.800">
                        @{mention.name}
                      </Text>
                    </View>
                  ))}
                </Horizontal>
              </View>
            )}

            <View
              as="button"
              onClick={handleSubmit}
              padding="8px 16px"
              backgroundColor={
                inputValue.trim() ? 'color.blue.500' : 'color.gray.300'
              }
              color="color.white"
              border="none"
              borderRadius="6px"
              cursor={inputValue.trim() ? 'pointer' : 'not-allowed'}
              disabled={!inputValue.trim()}
              _hover={{
                backgroundColor: inputValue.trim()
                  ? 'color.blue.600'
                  : 'color.gray.300',
              }}
            >
              Send Message
            </View>
          </Horizontal>
        </Vertical>
      </View>

      {submittedMessage && (
        <View
          padding="12px"
          backgroundColor="color.green.50"
          border="1px solid"
          borderColor="color.green.200"
          borderRadius="6px"
        >
          <Text fontSize="14px" fontWeight="medium" color="color.green.800">
            Submitted Message:
          </Text>
          <Text
            fontSize="14px"
            color="color.green.700"
            marginTop="4px"
            whiteSpace="pre-wrap"
          >
            {submittedMessage}
          </Text>
        </View>
      )}
    </Vertical>
  );
};
