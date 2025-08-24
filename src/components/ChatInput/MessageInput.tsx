'use client';

import React, { forwardRef } from 'react';
import { Button, Element, Horizontal, View, useTheme } from 'app-studio';
import { ChatUploader } from './ChatUploader';
import { ModelOption } from './ChatInput/ChatInput.type';

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  isAgentRunning?: boolean;
  onStopAgent?: () => void;
  isDraggingOver?: boolean;
  uploadedFiles: File[];

  fileInputRef: React.RefObject<HTMLInputElement>;
  isUploading: boolean;
  sandboxId?: string;
  setPendingFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  hideAttachments?: boolean;

  selectedModel: string;
  onModelChange: (model: string) => void;
  modelOptions: ModelOption[];
  subscriptionStatus?: string;
  canAccessModel: (model: string) => boolean;

  views?: {
    container?: any;
    textarea?: any;
    buttonGroup?: any;
    submitButton?: any;
    submitIcon?: any;
    modelSelector?: any;
  };
}

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
    const { getColor } = useTheme();

    // Handle textarea resize
    const handleTextareaResize = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const textarea = e.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    };

    // Handle combined change event
    const handleCombinedChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      onChange(e);
      handleTextareaResize(e);
    };

    // Handle key down event
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
        backgroundColor={isDraggingOver ? 'color.blue.50' : undefined}
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
          lineHeight="1.5"
          color="color.gray.900"
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

            {/* Model selector */}
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
              color="color.gray.500"
              border="none"
              outline="none"
              cursor="pointer"
              transition="all 0.2s ease"
              _hover={{
                backgroundColor: 'color.gray.100',
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
            backgroundColor={isAgentRunning ? 'theme.error' : 'theme.primary'}
            color="color.white"
            disabled={
              (!value.trim() && uploadedFiles.length === 0) ||
              loading ||
              (disabled && !isAgentRunning)
            }
            _hover={{
              backgroundColor: isAgentRunning
                ? 'color.red.600'
                : 'color.blue.600',
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
