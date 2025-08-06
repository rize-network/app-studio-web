import React, { useState } from 'react';

import { ChatInputProps } from '../ChatInput/ChatInput/ChatInput.props';
import { useChatInputState } from '../ChatInput/ChatInput/ChatInput.state';
import ChatInputView from '../ChatInput/ChatInput/ChatInput.view';
import { useFormikInput } from './Formik.Hook';

interface FormikChatInputProps
  extends Omit<
    ChatInputProps,
    'value' | 'onChange' | 'onSubmit' | 'getPendingFiles' | 'clearPendingFiles'
  > {
  name: string;
  onSubmit?: (message: string, options?: any) => void;
}

const ChatInputComponent: React.FC<FormikChatInputProps> = (props) => {
  const { name, onSubmit, ...chatInputProps } = props;

  // State for managing pending files
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  // Get Formik integration props
  const formProps = useFormikInput({ name, type: 'text' });

  // Handle the onChange from Formik to work with ChatInput's expected onChange signature
  const handleChange = (value: string) => {
    if (formProps.onChangeText) {
      formProps.onChangeText(value);
    }
  };

  // Handle submit - integrate with Formik if no custom onSubmit provided
  const handleSubmit = (message: string, options?: any) => {
    if (onSubmit) {
      onSubmit(message, options);
    } else {
      // Default behavior: just update the form field value
      handleChange(message);
    }
  };

  // Required functions for ChatInput
  const getPendingFiles = () => pendingFiles;
  const clearPendingFiles = () => setPendingFiles([]);

  // Get ChatInput state with our custom props
  const chatInputState = useChatInputState({
    ...chatInputProps,
    value: formProps.value || '',
    onChange: handleChange,
    onSubmit: handleSubmit,
    getPendingFiles,
    clearPendingFiles,
  });

  return (
    <ChatInputView
      {...chatInputProps}
      {...chatInputState}
      value={formProps.value || ''}
      onChange={handleChange}
      onSubmit={handleSubmit}
      error={formProps.error}
      getPendingFiles={getPendingFiles}
      clearPendingFiles={clearPendingFiles}
    />
  );
};

/**
 * ChatInput is a component used to create a chat input field with file upload support,
 * auto-completion, mentions, and other advanced features, integrated with Formik.
 */
export const FormikChatInput = ChatInputComponent;
