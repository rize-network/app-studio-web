// This file defines the main ChatInput functional component. It uses `forwardRef` to enable ref forwarding, integrates a custom state management hook (`useChatInputState`) for its logic, and delegates the actual rendering to a separate `ChatInputView` component, thereby separating concerns.
import React, { forwardRef, useImperativeHandle } from 'react';
import { ChatInputHandle, ChatInputProps } from './ChatInput/ChatInput.props';
import { useChatInputState } from './ChatInput/ChatInput.state';
import ChatInputView from './ChatInput/ChatInput.view';
export const ChatInput = forwardRef<ChatInputHandle, ChatInputProps>(
  (rawProps, ref) => {
    // `isWorkerRunning` and `onStopWorker` are documented as aliases of
    // `isAgentRunning` / `onStopAgent`, but nothing ever resolved them: passing
    // either worker-named prop did nothing at all. Collapse them here, once, so
    // the state hook and the view both see a single canonical pair.
    const props: ChatInputProps = {
      ...rawProps,
      isAgentRunning: rawProps.isAgentRunning ?? rawProps.isWorkerRunning,
      onStopAgent: rawProps.onStopAgent ?? rawProps.onStopWorker,
      // `isDisabled` is the camelCase alias of `disabled`; resolve it here so
      // the state hook and the view both see a single canonical prop.
      disabled: rawProps.disabled ?? rawProps.isDisabled,
    };
    const state = useChatInputState(props);
    // The visible field is a `contentEditable` div and therefore has no `value` property. The ref
    // exposes an imperative handle instead, so callers can read and write the text without
    // reimplementing DOM writes — see also the hidden mirror `<textarea>` returned by `getInputElement`.
    useImperativeHandle(ref, () => ({
      getValue: () =>
        state.hiddenInputRef.current?.value ??
        state.editableRef.current?.textContent ??
        state.value ??
        '',
      setValue: state.setValue,
      clear: () => state.setValue(''),
      focus: () => state.editableRef.current?.focus(),
      blur: () => state.editableRef.current?.blur(),
      getElement: () => state.editableRef.current,
      getInputElement: () => state.hiddenInputRef.current,
    }));
    return <ChatInputView {...props} {...state} />;
  }
);
ChatInput.displayName = 'ChatInput';
