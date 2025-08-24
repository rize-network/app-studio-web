'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatInputProps } from './ChatInput.props';
import { ModelOption, PromptExample } from './ChatInput.type';

/**
 * Custom hook for managing ChatInput state
 */
export const useChatInputState = (props: ChatInputProps) => {
  const {
    value: controlledValue,
    onChange: controlledOnChange,
    onSubmit,
    autoFocus = true,
    loading = false,
    disabled = false,
    isAgentRunning = false,
    onStopAgent,
    sandboxId,
  } = props;

  // Determine if the component is controlled
  const isControlled =
    controlledValue !== undefined && controlledOnChange !== undefined;

  // State for uncontrolled input
  const [uncontrolledValue, setUncontrolledValue] = useState('');
  const value = isControlled ? controlledValue : uncontrolledValue;

  // State for file uploads
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Reference images are now tracked within uploadedFiles using isReferenceImage flag

  // State for model selection
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [modelOptions] = useState<ModelOption[]>([
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5' },
    { id: 'gpt-4', name: 'GPT-4' },
    { id: 'gpt-4-thinking', name: 'GPT-4 (Thinking)', isThinking: true },
    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet' },
  ]);

  // Refs for DOM elements
  const editableRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // State for UI features
  const [isGuideTipShown, setIsGuideTipShown] = useState(
    props.showGuideTip || false
  );
  const [isReferenceImageModalShown, setIsReferenceImageModalShown] =
    useState(false);

  // Focus the editable div on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && editableRef.current) {
      editableRef.current.focus();
    }
  }, [autoFocus]);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => {
        // if (file.localUrl) {
        //   URL.revokeObjectURL(file);
        // }
      });
    };
  }, [uploadedFiles]);

  // Handle input change for contenteditable
  const handleChange = (newValue: string) => {
    if (isControlled && controlledOnChange) {
      controlledOnChange(newValue);
    } else {
      setUncontrolledValue(newValue);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      (!(value as string).trim() && uploadedFiles.length === 0) ||
      loading ||
      (disabled && !isAgentRunning)
    ) {
      return;
    }

    if (isAgentRunning && onStopAgent) {
      onStopAgent();
      return;
    }

    let message = value;

    // Add file information to the message if files are uploaded
    if (uploadedFiles.length > 0) {
      const fileInfo = uploadedFiles
        .map((file) => `[Uploaded File: ${URL.createObjectURL(file)}}]`)
        .join('\n');
      message = message ? `${message}\n\n${fileInfo}` : fileInfo;
    }

    // Determine model and thinking mode
    let baseModelName = selectedModel;
    let thinkingEnabled = false;

    if (selectedModel.endsWith('-thinking')) {
      baseModelName = selectedModel.replace(/-thinking$/, '');
      thinkingEnabled = true;
    }

    // Call the onSubmit callback
    onSubmit(message as string, {
      model_name: baseModelName,
      enable_thinking: thinkingEnabled,
    });

    // Clear the input if uncontrolled
    if (!isControlled) {
      setUncontrolledValue('');
    }

    // Clear uploaded files (including reference images)
    setUploadedFiles([]);
  };

  // Handle removing an uploaded file
  const removeUploadedFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));

    if (!sandboxId && pendingFiles.length > index) {
      setPendingFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  // Mock function for subscription status
  const subscriptionStatus = 'active';

  // Mock function to check if user can access a model
  const canAccessModel = (_model: string) => true;

  // Handle guide tip close
  const hideGuideTip = () => {
    setIsGuideTipShown(false);
    if (props.onGuideClose) {
      props.onGuideClose();
    }
  };

  // Handle reference image modal toggle
  const toggleReferenceImageModal = () => {
    setIsReferenceImageModalShown(!isReferenceImageModalShown);
    if (props.onReferenceImageClick) {
      props.onReferenceImageClick();
    }
  };

  // Handle prompt example selection
  const handlePromptExampleSelect = (example: PromptExample) => {
    if (isControlled && controlledOnChange) {
      controlledOnChange(example.text);
    } else {
      setUncontrolledValue(example.text);
    }

    if (props.onPromptExampleSelect) {
      props.onPromptExampleSelect(example);
    }

    // Focus the input after selecting an example
    if (editableRef.current) {
      editableRef.current.focus();
    }
  };

  // Handle reference image upload
  const handleReferenceImageUpload = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      console.error('Only image files are allowed as reference images');
      return;
    }

    // Clear existing reference images first
    const updatedFiles = uploadedFiles.map((file) => ({
      ...file,
    }));

    // Create reference image objects (only take the first one)

    // Add to pending files
    setPendingFiles((prevFiles) => [...prevFiles, imageFiles[0]]);

    // Add the reference image to uploaded files
    setUploadedFiles([...updatedFiles, imageFiles[0]]);
  };

  // Remove reference image
  const removeReferenceImage = () => {
    // Clear reference image flag from all uploaded files
    const updatedFiles = uploadedFiles.map((file) => ({
      ...file,
      isReferenceImage: false,
    }));
    setUploadedFiles(updatedFiles);
  };

  // Set an uploaded file as reference image
  const setFileAsReference = (fileIndex: number) => {
    const file = uploadedFiles[fileIndex];

    if (!file || !file.type.startsWith('image/')) {
      console.error('Only image files can be set as reference images');
      return;
    }

    // Update the files to mark only the selected one as reference image
    const updatedFiles = uploadedFiles.map((f, index) => ({
      ...f,
      isReferenceImage: index === fileIndex,
    }));

    setUploadedFiles(updatedFiles);
  };

  return {
    value,
    handleChange,
    handleSubmit,
    editableRef,
    fileInputRef,
    isUploading,
    isDraggingOver,
    uploadedFiles,
    pendingFiles,
    removeUploadedFile,
    setPendingFiles,
    setUploadedFiles,
    setIsUploading,
    selectedModel,
    handleModelChange: setSelectedModel,
    modelOptions,
    subscriptionStatus,
    canAccessModel,
    handleDragOver,
    handleDragLeave,
    isGuideTipShown,
    hideGuideTip,
    isReferenceImageModalShown,
    toggleReferenceImageModal,
    handlePromptExampleSelect,
    handleReferenceImageUpload,
    removeReferenceImage,
    setFileAsReference,
  };
};
