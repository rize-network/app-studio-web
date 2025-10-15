import React, { useCallback } from 'react';
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
import { Uploader } from '../../Uploader/Uploader';
import { PromptExamples } from '../PromptExamples';
import { Loader } from '../../Loader/Loader';
import {
  StopIcon,
  SendIcon,
  LoadingSpinnerIcon,
  AttachmentIcon,
} from '../../Icon/Icon';
import { AudioRecorder } from '../AudioRecorder';

const ChatInputView: React.FC<ChatInputViewProps> = ({
  // Props from parent
  onSubmit,
  placeholder = 'Say what you want and Kimmy will surprise you',
  loading = false,
  disabled = false,
  isAgentRunning = false,
  enableAudioRecording = false,
  leftButtons,
  rightButtons,
  onStopAgent,
  loadingText = 'Agent is working...',
  autoFocus = true,
  sandboxId,
  hideAttachments = false,
  attachmentText = '',
  promptExamples = [],
  suggestions = [],
  errorMessage,
  size = 'md',
  shape = 'rounded',
  variant = 'default',
  views = {},
  mentionData = [],
  mentionTrigger = '@',
  onMentionSelect,
  onAudioRecordingStart,
  onAudioRecordingStop,

  // Props from state
  value,
  handleChange,
  handleSubmit,
  editableRef,
  fileInputRef,
  isUploading,
  uploadProgress,
  isDraggingOver,
  uploadedFiles,
  removeUploadedFile,
  setPendingFiles,
  setUploadedFiles,
  setIsUploading,
  startUpload,
  selectedModel,
  handleModelChange,
  modelOptions,
  subscriptionStatus,
  canAccessModel,
  isGuideTipShown,
  hideGuideTip,
  handlePromptExampleSelect,
  handleDragOver,
  handleDragLeave,

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

  const handleRecordingComplete = useCallback(
    (file: File) => {
      // Enqueue and upload the recorded file
      startUpload([file]);
      onAudioRecordingStop?.(file);
    },
    [startUpload, onAudioRecordingStop]
  );

  // Handle multiple file uploads for the Uploader component
  const handleMultipleFileUpload = useCallback(
    (files: File[]) => {
      // Filter files that exceed size limit (50MB)
      const filteredFiles = files.filter((file) => {
        if (file.size > 50 * 1024 * 1024) {
          console.error(`File size exceeds 50MB limit: ${file.name}`);
          return false;
        }
        return true;
      });

      if (filteredFiles.length > 0) {
        // Enqueue and start upload for the batch
        startUpload(filteredFiles);
      }
    },
    [startUpload]
  );

  // Combine mention data with uploaded files
  const combinedMentionData = [
    ...(mentionData || []),
    ...uploadedFiles.map((file, index) => ({
      id: `file-${index}`,
      name: file.name,
    })),
  ];

  return (
    <View
      display="flex"
      flexDirection="column"
      // Width and maxWidth will come from containerStyles
      boxSizing="border-box"
      {...containerStyles}
      {...props}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleDragLeave(e);

        if (e.dataTransfer.files.length > 0) {
          const files = Array.from(e.dataTransfer.files) as File[];
          handleMultipleFileUpload(files);
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
          <Text color="color.gray.500">{loadingText}</Text>
        </Horizontal>
      )}

      <View position="relative" width="100%" overflow="visible">
        {/* Input Area */}
        <View
          as="form"
          onSubmit={handleSubmit}
          overflow="visible"
          display="flex"
          flexDirection="column"
          position="relative"
          // transition="background-color 0.2s ease"
          // Apply base styles first, then override with conditional background color

          {...contentStyles}
          {...containerStyles}
          paddingHorizontal={16}
          paddingVertical={10}
          backgroundColor={isDraggingOver ? 'color.blue.50' : undefined}
        >
          {/* Attachments */}
          <AttachmentGroup
            files={uploadedFiles}
            sandboxId={sandboxId}
            onRemove={removeUploadedFile}
            showPreviews={true}
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
            placeholder={placeholder}
            disabled={disabled && !isAgentRunning}
            autoFocus={autoFocus}
            suggestions={suggestions || []}
            showSuggestions={suggestions && suggestions.length > 0 && !value}
            onSuggestionSelect={(suggestion) => {
              handleChange(suggestion.text);
            }}
            mentionData={combinedMentionData}
            mentionTrigger={mentionTrigger}
            onMentionSelect={onMentionSelect}
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
                <Uploader
                  accept="*/*"
                  icon={<AttachmentIcon widthHeight={16} />}
                  maxSize={50 * 1024 * 1024} // 50MB limit
                  multiple={true}
                  onMultipleFileSelect={handleMultipleFileUpload}
                  isLoading={isUploading}
                  progress={uploadProgress || 0}
                  text={attachmentText}
                  fileType="file"
                  renderError={({ errorMessage }) => null}
                  views={{
                    container: {
                      height: '36px',
                      //margin: '0 12px',
                      // borderRadius: '8px',
                      // backgroundColor: 'transparent',
                      // border: '1px solid',
                      // borderColor: 'color.gray.300',
                      cursor: 'pointer',
                      _hover: {
                        backgroundColor: 'color.gray.100',
                      },
                      ...views?.fileButton,
                    },
                  }}
                  containerProps={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    borderRadius: shape === 'rounded' ? '50%' : 4,
                    padding: 10,
                  }}
                  textProps={{
                    fontSize: '14px',
                    color: 'color.gray.600',
                  }}
                  validateFile={(file: File) => {
                    if (file.size > 50 * 1024 * 1024) {
                      return 'File size exceeds 50MB limit';
                    }
                    return null;
                  }}
                />
              )}
              {leftButtons}
            </Horizontal>

            {/* Submit Button */}
            <Horizontal gap={8} alignItems="center">
              {enableAudioRecording && (
                <AudioRecorder
                  onRecordingStart={onAudioRecordingStart}
                  onRecordingComplete={handleRecordingComplete}
                  views={{ button: views?.recordButton }}
                />
              )}
              <View
                as="button"
                type="button"
                onClick={handleSubmit}
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
                borderRadius={shape === 'rounded' ? '50%' : 4}
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

              {rightButtons}
            </Horizontal>
          </Horizontal>
        </View>
      </View>

      {/* Bottom Tip (Error Message) */}
      {errorMessage && (
        <Text color="theme.error" marginTop="4px" {...views?.bottomTip}>
          {errorMessage}
        </Text>
      )}

      {/* Agent Running Indicator */}
    </View>
  );
};

export default ChatInputView;
