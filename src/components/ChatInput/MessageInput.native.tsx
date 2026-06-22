import React, { forwardRef } from 'react';
import { Button, Horizontal, Vertical, View, Text, Input } from 'app-studio';
import { ModelOption } from './ChatInput/ChatInput.type';
// Defines the properties required for the MessageInput component.
interface MessageInputProps {
  // The current value of the input text area.
  value: string;
  // Callback function triggered when the text area value changes.
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  // Callback function triggered when the form is submitted.
  onSubmit: (e: React.FormEvent) => void;
  // Optional placeholder text for the input text area.
  placeholder?: string;
  // Indicates if a loading state is active, typically disabling the submit button.
  loading?: boolean;
  // Indicates if the input and related controls should be disabled.
  disabled?: boolean;
  // Indicates if an agent process is currently running.
  isAgentRunning?: boolean;
  // Callback function to stop an active agent process.
  onStopAgent?: () => void;
  // Indicates if a file is currently being dragged over the input area.
  isDraggingOver?: boolean;
  // An array of files that have been successfully uploaded.
  uploadedFiles: File[];
  // A ref object for accessing the underlying file input DOM element.
  fileInputRef: React.RefObject<HTMLInputElement>;
  // Indicates if files are currently in the process of being uploaded.
  isUploading: boolean;
  // Optional ID for the sandbox environment related to file uploads.
  sandboxId?: string;
  // Setter function for managing files pending upload.
  setPendingFiles: React.Dispatch<React.SetStateAction<File[]>>;
  // Setter function for managing successfully uploaded files.
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  // Setter function for managing the file upload status.
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  // Determines whether the attachment input (ChatUploader) should be hidden.
  hideAttachments?: boolean;
  // The currently selected model for the chat.
  selectedModel: string;
  // Callback function triggered when the selected model changes.
  onModelChange: (model: string) => void;
  // An array of available model options for selection.
  modelOptions: ModelOption[];
  // Optional status of the user's subscription.
  subscriptionStatus?: string;
  // Function to check if the user has access to a specific model.
  canAccessModel: (model: string) => boolean;
  // Optional object to override default styling properties for various sub-components.
  views?: {
    container?: any;
    textarea?: any;
    buttonGroup?: any;
    submitButton?: any;
    submitIcon?: any;
    modelSelector?: any;
  };
}

/**
 * React Native variant of `MessageInput`.
 *
 * React Native has no DOM: the web version's `<textarea>`, `<select>`/`<option>`,
 * and the file `<input>` (via `ChatUploader`) are all browser-only and would
 * crash. This variant uses app-studio's `Input` (a TextInput on native) with
 * `multiline`, replaces the model `<select>` with a row of `View`/`Text`
 * choices, and omits the web-only file-attachment chrome. The same
 * `value`/`onChange`/`onSubmit`/`onModelChange` callbacks are preserved.
 */
export const MessageInput = forwardRef<any, MessageInputProps>(
  (
    {
      value,
      onChange,
      onSubmit,
      placeholder = 'Describe what you need help with...',
      loading = false,
      disabled = false,
      isAgentRunning = false,
      uploadedFiles,
      selectedModel,
      onModelChange,
      modelOptions,
      canAccessModel,
      views = {},
    },
    ref
  ) => {
    // Bridges the native `onChangeText` (a raw string) to the web-style `onChange`
    // signature by synthesizing a minimal change-event-like object.
    const handleChangeText = (text: string) => {
      onChange({
        target: { value: text },
        currentTarget: { value: text },
      } as unknown as React.ChangeEvent<HTMLTextAreaElement>);
    };

    // Triggers submission while reusing the same `onSubmit` callback the web uses.
    const handleSubmit = () => {
      onSubmit({} as React.FormEvent);
    };

    const submitDisabled =
      (!value.trim() && uploadedFiles.length === 0) ||
      loading ||
      (disabled && !isAgentRunning);

    return (
      <View width="100%" position="relative" {...views?.container}>
        <Input
          ref={ref}
          multiline
          value={value}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmit}
          placeholder={placeholder}
          editable={!(disabled && !isAgentRunning)}
          width="100%"
          minHeight="40px"
          maxHeight="200px"
          padding="8px 12px"
          fontSize="14px"
          lineHeight="15px"
          color="color-gray-900"
          backgroundColor="transparent"
          {...views?.textarea}
        />
        <Horizontal
          justifyContent="space-between"
          alignItems="center"
          padding="4px 8px"
          {...views?.buttonGroup}
        >
          {/* Model selection rendered as tappable choices (no DOM <select>). */}
          <Horizontal gap={8} alignItems="center" flexWrap="wrap">
            {modelOptions.map((model) => {
              const accessible = canAccessModel(model.id);
              const isSelected = model.id === selectedModel;
              return (
                <View
                  key={model.id}
                  height="36px"
                  padding="0 12px"
                  borderRadius="8px"
                  justifyContent="center"
                  backgroundColor={isSelected ? 'color-blue-50' : 'transparent'}
                  opacity={accessible ? 1 : 0.5}
                  onPress={
                    accessible ? () => onModelChange(model.id) : undefined
                  }
                  {...views?.modelSelector}
                >
                  <Vertical justifyContent="center" height="100%">
                    <Text
                      fontSize="14px"
                      color={isSelected ? 'color-blue-600' : 'color-gray-500'}
                    >
                      {model.name}
                    </Text>
                  </Vertical>
                </View>
              );
            })}
          </Horizontal>
          <Button
            onClick={handleSubmit}
            height="36px"
            minWidth="36px"
            padding="0 12px"
            borderRadius="8px"
            backgroundColor={isAgentRunning ? 'theme-error' : 'theme-primary'}
            color="color-white"
            disabled={submitDisabled}
            {...views?.submitButton}
          >
            <Text color="color-white" fontSize="14px">
              {isAgentRunning ? 'Stop' : loading ? '...' : 'Send'}
            </Text>
          </Button>
        </Horizontal>
      </View>
    );
  }
);
MessageInput.displayName = 'MessageInput';
