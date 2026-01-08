import React, { useState, useRef } from 'react';
import { View, Vertical, Text, useTheme } from 'app-studio';
import ChatInputView from '../ChatInput/ChatInput.view';

export const AudioWaveformChatInputDemo = () => {
  const { themeMode } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = () => {
    if (inputValue.trim() || uploadedFiles.length > 0) {
      setSubmittedMessage(inputValue || 'Message with audio attachment');
      setInputValue('');
      setUploadedFiles([]);
    }
  };

  const startUpload = (files: File[]) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    setUploadedFiles((prev) => [...prev, ...files]);
    setTimeout(() => setIsUploading(false), 300);
  };

  return (
    <Vertical
      gap={20}
      padding="20px"
      maxWidth="600px"
      backgroundColor="transparent"
    >
      <Text fontSize="18px" fontWeight="bold" color="theme.primary">
        Chat Input with Audio Waveform Demo
      </Text>

      <Text
        fontSize="14px"
        color={themeMode === 'light' ? 'color.gray.600' : 'color.gray.400'}
      >
        Features: • Audio recording with live waveform visualization • Text
        input • File attachments
      </Text>

      <View
        borderWidth="1px"
        borderStyle="solid"
        borderColor={
          themeMode === 'light' ? 'color.gray.300' : 'color.gray.700'
        }
        borderRadius="8px"
        padding="16px"
        backgroundColor={
          themeMode === 'light' ? 'color.white' : 'color.gray.800'
        }
      >
        <Vertical gap={12}>
          <ChatInputView
            value={inputValue}
            handleChange={setInputValue}
            handleSubmit={handleSubmit}
            placeholder="Type your message or record audio..."
            enableAudioRecording={true}
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            removeUploadedFile={(index: number) => {
              setUploadedFiles((prevFiles) =>
                prevFiles.filter((_, i) => i !== index)
              );
            }}
            setPendingFiles={() => {}}
            setIsUploading={setIsUploading}
            startUpload={startUpload}
            getPendingFiles={() => []}
            clearPendingFiles={() => {}}
            onSubmit={handleSubmit}
            editableRef={useRef<HTMLDivElement>(null)}
            fileInputRef={useRef<HTMLInputElement>(null)}
            isUploading={isUploading}
            isDraggingOver={false}
            selectedModel={''}
            handleModelChange={() => {}}
            modelOptions={[]}
            canAccessModel={() => true}
            isGuideTipShown={false}
            hideGuideTip={() => {}}
            handlePromptExampleSelect={() => {}}
            handleDragOver={() => {}}
            handleDragLeave={() => {}}
            views={{
              editableInput: {
                minHeight: '60px',
                maxHeight: '150px',
              },
            }}
          />
        </Vertical>
      </View>

      {submittedMessage && (
        <View
          padding="12px"
          backgroundColor={
            themeMode === 'light' ? 'color.green.50' : 'color.green.900'
          }
          borderWidth="1px"
          borderStyle="solid"
          borderColor={
            themeMode === 'light' ? 'color.green.200' : 'color.green.700'
          }
          borderRadius="6px"
        >
          <Text
            fontSize="14px"
            fontWeight="medium"
            color={
              themeMode === 'light' ? 'color.green.800' : 'color.green.100'
            }
          >
            Submitted Message:
          </Text>
          <Text
            fontSize="14px"
            color={
              themeMode === 'light' ? 'color.green.700' : 'color.green.200'
            }
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
