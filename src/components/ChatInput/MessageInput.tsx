import React, { forwardRef } from 'react';
import { Button, Element, Horizontal, View, useTheme } from 'app-studio';
import { ChatUploader } from './ChatUploader';
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
    // Custom styles for the main container view.
    container?: any;
    // Custom styles for the textarea element.
    textarea?: any;
    // Custom styles for the horizontal button group.
    buttonGroup?: any;
    // Custom styles for the submit button.
    submitButton?: any;
    // Custom styles for the submit button's icon.
    submitIcon?: any;
    // Custom styles for the model selection dropdown.
    modelSelector?: any;
  };
}
// The MessageInput component provides a chat input field with features like file uploads, model selection, and dynamic resizing, forwarded with a ref to the textarea element.
export const MessageInput = forwardRef<HTMLTextAreaElement, MessageInputProps>(
  (
    {
      value,
      onChange,
      onSubmit,
      placeholder = 'Describe what you need help with...',
      loading = false,
      disabled = false,
      isAgentRunning = false,
      onStopAgent,
      isDraggingOver = false,
      uploadedFiles,
      fileInputRef,
      isUploading,
      sandboxId,
      setPendingFiles,
      setUploadedFiles,
      setIsUploading,
      hideAttachments = true,
      selectedModel,
      onModelChange,
      modelOptions,
      subscriptionStatus,
      canAccessModel,
      views = {},
    },
    ref
  ) => {
    // Retrieves the 'getColor' function from the application's theme context for consistent styling.
    const { getColor } = useTheme();
    // Handles the automatic resizing of the textarea to fit its content, up to a maximum height of 200px.
    const handleTextareaResize = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const textarea = e.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    };
    // Combines the external 'onChange' prop with the internal 'handleTextareaResize' for a unified change event.
    const handleCombinedChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      onChange(e);
      handleTextareaResize(e);
    };
    // Handles keyboard events in the textarea, specifically preventing new lines on 'Enter' and triggering form submission when 'Enter' is pressed without 'Shift'.
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSubmit(e as unknown as React.FormEvent);
      }
    };
    return (
      <View
        width="100%"
        position="relative"
        backgroundColor={isDraggingOver ? 'color-blue-50' : undefined}
        transition="background-color 0.2s ease"
        {...views?.container}
      >
        <Element
          as="textarea"
          ref={ref}
          value={value}
          onChange={handleCombinedChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled && !isAgentRunning}
          width="100%"
          minHeight="40px"
          maxHeight="200px"
          padding="8px 12px"
          fontSize="14px"
          lineHeight="15px"
          color="color-gray-900"
          backgroundColor="transparent"
          border="none"
          outline="none"
          resize="none"
          overflow="auto"
          {...views?.textarea}
        />
        <Horizontal
          justifyContent="space-between"
          alignItems="center"
          padding="4px 8px"
          {...views?.buttonGroup}
        >
          <Horizontal gap={8} alignItems="center">
            <ChatUploader
              ref={fileInputRef}
              loading={loading}
              disabled={disabled}
              isAgentRunning={isAgentRunning}
              isUploading={isUploading}
              sandboxId={sandboxId}
              setPendingFiles={setPendingFiles}
              setUploadedFiles={setUploadedFiles}
              setIsUploading={setIsUploading}
              hideAttachments={hideAttachments}
            />
            {}
            <View
              as="select"
              value={selectedModel}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onModelChange(e.target.value)
              }
              height="36px"
              padding="0 12px"
              borderRadius="8px"
              backgroundColor="transparent"
              color="color-gray-500"
              border="none"
              outline="none"
              cursor="pointer"
              transition="background-color 0.2s ease, color 0.2s ease"
              _hover={{
                backgroundColor: '#F8FAFC',
              }}
              {...views?.modelSelector}
            >
              {modelOptions.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </View>
          </Horizontal>
          <Button
            type="submit"
            onClick={onSubmit}
            height="36px"
            minWidth="36px"
            padding="0 12px"
            borderRadius="8px"
            backgroundColor={isAgentRunning ? 'theme-error' : 'theme-primary'}
            color="color-white"
            disabled={
              (!value.trim() && uploadedFiles.length === 0) ||
              loading ||
              (disabled && !isAgentRunning)
            }
            _hover={{
              backgroundColor: isAgentRunning ? 'color-red-600' : '#1D4ED8',
            }}
            {...views?.submitButton}
          >
            {isAgentRunning ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...views?.submitIcon}
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
            ) : loading ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animation: 'spin 1s linear infinite' }}
                {...views?.submitIcon}
              >
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...views?.submitIcon}
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </Button>
        </Horizontal>
      </View>
    );
  }
);
MessageInput.displayName = 'MessageInput';
