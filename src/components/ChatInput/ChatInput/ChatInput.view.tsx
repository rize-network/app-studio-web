'use client';

import React from 'react';
import { Horizontal, Text, View, useTheme } from 'app-studio';
import { ChatInputViewProps } from './ChatInput.props';
import {
  DefaultChatInputStyles,
  Shapes,
  Sizes,
  Variants,
} from './ChatInput.style';
import { AttachmentGroup } from '../AttachmentGroup';
import { EditableInput } from '../EditableInput';
import { FileUploadHandler } from '../FileUploadHandler';
import { PromptExamples } from '../PromptExamples';
import { ReferenceImageButton } from '../ReferenceImageButton';
import { ReferenceImageModal } from '../ReferenceImageModal';
import { Loader } from 'src/components/Loader/Loader';
import {
  StopIcon,
  SendIcon,
  LoadingSpinnerIcon,
} from 'src/components/Icon/Icon';

const ChatInputView: React.FC<ChatInputViewProps> = ({
  // Props from parent
  onSubmit,
  placeholder = 'Say what you want and Kimmy will surprise you',
  loading = false,
  disabled = false,
  isAgentRunning = false,
  onStopAgent,
  autoFocus = true,
  sandboxId,
  hideAttachments = false,
  promptExamples = [],
  showReferenceImageButton = false,
  errorMessage,
  size = 'md',
  shape = 'rounded',
  variant = 'default',
  views = {},

  // Props from state
  value,
  handleChange,
  handleSubmit,
  editableRef,
  fileInputRef,
  isUploading,
  isDraggingOver,
  uploadedFiles,
  removeUploadedFile,
  setPendingFiles,
  setUploadedFiles,
  setIsUploading,
  selectedModel,
  handleModelChange,
  modelOptions,
  subscriptionStatus,
  canAccessModel,
  isGuideTipShown,
  hideGuideTip,
  isReferenceImageModalShown,
  toggleReferenceImageModal,
  handlePromptExampleSelect,

  // Other props
  ...props
}) => {
  const {
    /* getColor */
  } = useTheme();

  // Combine styles
  const containerStyles = {
    ...DefaultChatInputStyles.container,
    ...Shapes[shape],
    ...views?.container,
  };

  const contentStyles = {
    ...DefaultChatInputStyles.content,
    ...Sizes[size],
    ...Variants[variant],
    ...views?.content,
  };

  // Determine if the submit button should be enabled
  const hasText = (value?.trim().length ?? 0) > 0 || uploadedFiles.length > 0;

  return (
    <View
      display="flex"
      flexDirection="column"
      // Width and maxWidth will come from containerStyles
      boxSizing="border-box"
      {...containerStyles}
      {...props}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (fileInputRef.current) {
          props.handleDragOver?.(e);
        }
      }}
      onDragLeave={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        props.handleDragLeave?.(e);
      }}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        props.handleDragLeave?.(e);

        if (fileInputRef.current && e.dataTransfer.files.length > 0) {
          const files = Array.from(e.dataTransfer.files) as File[];
          setPendingFiles((prevFiles) => [...prevFiles, ...files]);

          const newUploadedFiles = files.map((file: File) => ({
            name: file.name,
            path: `/workspace/${file.name}`,
            size: file.size,
            type: file.type || 'application/octet-stream',
            localUrl: URL.createObjectURL(file),
          }));

          setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
        }
      }}
    >
      {/* Prompt Examples */}
      {promptExamples.length > 0 && (
        <PromptExamples
          examples={promptExamples}
          onSelect={handlePromptExampleSelect}
          views={{
            container: views?.promptExamples,
            item: views?.promptExampleItem,
          }}
        />
      )}

      {/* Header */}
      <Horizontal
        justifyContent="space-between"
        alignItems="center"
        {...views?.header}
      >
        {showReferenceImageButton && (
          <ReferenceImageButton
            onClick={toggleReferenceImageModal}
            views={{
              button: views?.referenceImageButton,
            }}
          />
        )}
      </Horizontal>

      {/* Reference Image Modal */}
      <View position="relative" width="100%">
        <ReferenceImageModal
          isOpen={isReferenceImageModalShown}
          onClose={toggleReferenceImageModal}
          views={{
            container: views?.referenceImageModal,
          }}
        />

        {/* Input Area */}
        <View
          as="form"
          onSubmit={handleSubmit}
          overflowY="auto"
          display="flex"
          flexDirection="column"
          position="relative"
          // transition="background-color 0.2s ease"
          // Apply base styles first, then override with conditional background color

          {...contentStyles}
          {...containerStyles}
          paddingHorizontal={20}
          backgroundColor={isDraggingOver ? 'color.blue.50' : undefined}
        >
          {/* Attachments */}
          <AttachmentGroup
            files={uploadedFiles}
            sandboxId={sandboxId}
            onRemove={removeUploadedFile}
            views={{
              container: views?.attachments,
              item: views?.attachmentItem,
              name: views?.attachmentName,
              size: views?.attachmentSize,
              removeButton: views?.attachmentRemove,
            }}
          />

          {/* Editable Input */}
          <EditableInput
            ref={editableRef}
            value={value || ''}
            onChange={handleChange}
            onSubmit={handleSubmit}
            placeholder={placeholder}
            disabled={disabled && !isAgentRunning}
            autoFocus={autoFocus}
            views={{
              container: {},
              input: views?.editableInput,
            }}
          />

          {/* Bottom Controls */}
          <Horizontal
            justifyContent="space-between"
            alignItems="center"
            marginTop="8px"
          >
            <Horizontal gap={8} alignItems="center">
              {/* File Upload Button */}
              {!hideAttachments && (
                <FileUploadHandler
                  ref={fileInputRef}
                  loading={loading}
                  disabled={disabled}
                  isAgentRunning={isAgentRunning}
                  isUploading={isUploading}
                  sandboxId={sandboxId}
                  setPendingFiles={setPendingFiles}
                  setUploadedFiles={setUploadedFiles}
                  setIsUploading={setIsUploading}
                  views={{
                    button: views?.fileButton,
                  }}
                />
              )}
            </Horizontal>

            {/* Submit Button */}
            <View
              as="button"
              type="submit"
              height="40px"
              width="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              backgroundColor={
                isAgentRunning
                  ? 'theme.error'
                  : hasText
                  ? 'theme.primary'
                  : 'color.gray.300'
              }
              color="color.white"
              borderRadius="50%"
              border="none"
              cursor={hasText ? 'pointer' : 'not-allowed'}
              disabled={!hasText || loading || (disabled && !isAgentRunning)}
              transition="all 0.2s ease"
              _hover={{
                backgroundColor: isAgentRunning
                  ? 'color.red.600'
                  : hasText
                  ? 'color.blue.600'
                  : 'color.gray.300',
              }}
              {...views?.submitButton}
            >
              {isAgentRunning ? (
                <StopIcon
                  widthHeight={16}
                  color="currentColor"
                  filled={false}
                />
              ) : loading ? (
                <Loader type="quarter" size={16} color="color.white" />
              ) : (
                <SendIcon
                  widthHeight={16}
                  color="currentColor"
                  filled={false}
                />
              )}
            </View>
          </Horizontal>
        </View>
      </View>

      {/* Bottom Tip (Error Message) */}
      {errorMessage && (
        <Text
          fontSize="12px"
          color="theme.error"
          marginTop="4px"
          {...views?.bottomTip}
        >
          {errorMessage}
        </Text>
      )}

      {/* Agent Running Indicator */}
      {isAgentRunning && (
        <Horizontal
          justifyContent="center"
          alignItems="center"
          gap={8}
          padding="8px 0"
          animate={{
            from: { opacity: 0, y: -10 },
            to: { opacity: 1, y: 0 },
            duration: '0.3s',
          }}
          // animationDuration="0.3s"
          {...views?.loadingIndicator}
        >
          <LoadingSpinnerIcon
            widthHeight={12}
            color="currentColor"
            filled={false}
            style={{ animation: 'spin 1s linear infinite' }}
          />
          <Text fontSize="12px" color="color.gray.500">
            Agent is working...
          </Text>
        </Horizontal>
      )}
    </View>
  );
};

export default ChatInputView;
