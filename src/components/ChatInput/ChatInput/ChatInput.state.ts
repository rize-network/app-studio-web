import { useState, useRef, useEffect, useCallback } from 'react';
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
    onUploadProgress,
    onUploadSuccess,
    onUploadError,
    onFileUpload,
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
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadQueue, setUploadQueue] = useState<File[]>([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);
  const currentUploadRef = useRef<File | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

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

    // Clear uploaded files
    setUploadedFiles([]);
    // Also clear pending files that were staged for sending
    setPendingFiles([]);
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

  // Start uploading a batch of files (enqueue and process)
  const startUpload = useCallback(
    (files: File[]) => {
      if (!files || files.length === 0) return;

      // Add files to local states immediately for UI
      setPendingFiles((prevFiles) => [...prevFiles, ...files]);
      setUploadedFiles((prev) => [...prev, ...files]);

      // Enqueue and kick the processor
      setUploadQueue((prev) => [...prev, ...files]);
      setIsUploading(true);
    },
    [setPendingFiles, setUploadedFiles]
  );

  // Process upload queue sequentially
  const processUploadQueue = useCallback(() => {
    if (uploadQueue.length > 0 && !isProcessingQueue && onFileUpload) {
      setIsProcessingQueue(true);
      const nextFile = uploadQueue[0];
      currentUploadRef.current = nextFile;
      setUploadProgress(0);

      // Execute user-provided upload function
      try {
        onFileUpload(nextFile);
      } catch (err) {
        // Handle synchronous errors
        setUploadQueue((prev) => prev.slice(1));
        setIsProcessingQueue(false);
        currentUploadRef.current = null;
        setUploadProgress(0);
        setIsUploading((prev) => uploadQueue.length - 1 > 0 || false);
        onUploadError?.(err);
      }
    } else if (uploadQueue.length === 0 && isUploading) {
      // Nothing left to upload
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [
    uploadQueue,
    isProcessingQueue,
    onFileUpload,
    isUploading,
    onUploadError,
  ]);

  // Effect: process whenever queue changes
  useEffect(() => {
    processUploadQueue();
  }, [uploadQueue, isProcessingQueue, processUploadQueue]);

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

  return {
    value,
    handleChange,
    handleSubmit,
    editableRef,
    fileInputRef,
    isUploading,
    uploadProgress,
    isDraggingOver,
    uploadedFiles,
    pendingFiles,
    removeUploadedFile,
    setPendingFiles,
    setUploadedFiles,
    setIsUploading,
    startUpload,
    selectedModel,
    handleModelChange: setSelectedModel,
    modelOptions,
    subscriptionStatus,
    canAccessModel,
    handleDragOver,
    handleDragLeave,
    isGuideTipShown,
    hideGuideTip,
    handlePromptExampleSelect,
  };
};
