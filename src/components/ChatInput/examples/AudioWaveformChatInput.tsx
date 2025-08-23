import React, { useState, useRef } from 'react';
import { View, Vertical, Text } from 'app-studio';
import ChatInputView from '../ChatInput/ChatInput.view';
import { UploadedFile } from '../ChatInput/ChatInput.type';

export const AudioWaveformChatInputDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const handleSubmit = () => {
    if (inputValue.trim() || uploadedFiles.length > 0) {
      setSubmittedMessage(inputValue || 'Message with audio attachment');
      setInputValue('');
      setUploadedFiles([]);
    }
  };

  const handleAudioRecordingStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      mediaStreamSourceRef.current =
        audioContextRef.current.createMediaStreamSource(stream);
      const newAnalyserNode = audioContextRef.current.createAnalyser();
      mediaStreamSourceRef.current.connect(newAnalyserNode);
      setAnalyserNode(newAnalyserNode);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting audio recording:', error);
    }
  };

  const handleAudioRecordingStop = () => {
    if (mediaStreamSourceRef.current) {
      mediaStreamSourceRef.current.disconnect();
      mediaStreamSourceRef.current.mediaStream
        .getTracks()
        .forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setAnalyserNode(null);
    setIsRecording(false);
  };

  return (
    <Vertical gap={20} padding="20px" maxWidth="600px">
      <Text fontSize="18px" fontWeight="bold">
        Chat Input with Audio Waveform Demo
      </Text>

      <Text fontSize="14px" color="color.gray.600">
        Features: • Audio recording with live waveform visualization • Text
        input • File attachments
      </Text>

      <View
        border="1px solid"
        borderColor="color.gray.300"
        borderRadius="8px"
        padding="16px"
        backgroundColor="color.white"
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
            setPendingFiles={() => {}} // Mock function
            setIsUploading={() => {}} // Mock function
            onAudioRecordingStart={handleAudioRecordingStart}
            onAudioRecordingStop={handleAudioRecordingStop}
            getPendingFiles={() => []}
            clearPendingFiles={() => {}}
            onSubmit={handleSubmit}
            editableRef={useRef<HTMLDivElement>(null)}
            fileInputRef={useRef<HTMLInputElement>(null)}
            isUploading={false}
            isDraggingOver={false}
            selectedModel={''}
            handleModelChange={() => {}}
            modelOptions={[]}
            canAccessModel={() => true}
            isGuideTipShown={false}
            hideGuideTip={() => {}}
            isReferenceImageModalShown={false}
            toggleReferenceImageModal={() => {}}
            handlePromptExampleSelect={() => {}}
            handleDragOver={() => {}}
            handleDragLeave={() => {}}
            handleReferenceImageUpload={() => {}}
            removeReferenceImage={() => {}}
            setFileAsReference={() => {}}
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
