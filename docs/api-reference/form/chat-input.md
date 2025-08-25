# ChatInput

The ChatInput component is a customizable chat input field with support for file uploads and prompt examples.

## Import

```jsx
import { ChatInput } from '@app-studio/web';
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| onSubmit | (message: string, options?: { model_name?: string; enable_thinking?: boolean }) => void | required | Callback function when the form is submitted |
| placeholder | string | 'Say what you want and Kimmy will surprise you' | Placeholder text for the input |
| loading | boolean | false | Whether the input is in a loading state |
| disabled | boolean | false | Whether the input is disabled |
| isAgentRunning | boolean | false | Whether an agent is currently running |
| onStopAgent | () => void | undefined | Callback function to stop the agent |
| autoFocus | boolean | true | Whether to auto focus the input |
| value | string | undefined | Controlled value for the input |
| onChange | (value: string) => void | undefined | Callback function when the input value changes |
| onFileBrowse | () => void | undefined | Callback function when the file browser is opened |
| sandboxId | string | undefined | ID of the sandbox |
| hideAttachments | boolean | false | Whether to hide the attachment button |
| title | string | undefined | Title for the chat input |
| showGuideTip | boolean | false | Whether to show the guide tip |
| guideVideoUrl | string | undefined | URL for the guide video |
| onGuideClose | () => void | undefined | Callback function when the guide tip is closed |
| promptExamples | PromptExample[] | [] | List of prompt examples |
| onPromptExampleSelect | (example: PromptExample) => void | undefined | Callback function when a prompt example is selected |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Size of the chat input |
| shape | 'default' \| 'sharp' \| 'rounded' \| 'pillShaped' | 'rounded' | Shape of the chat input |
| variant | 'default' \| 'outline' \| 'none' | 'default' | Visual variant of the chat input |
| views | object | {} | Custom styling for different parts of the component |

## Interfaces

### PromptExample

```tsx
interface PromptExample {
  id: string;
  text: string;
}
```

### UploadedFile

```tsx
interface UploadedFile {
  name: string;
  path: string;
  size: number;
  type: string;
  localUrl?: string;
}
```

### ChatInputHandles

```tsx
interface ChatInputHandles {
  getPendingFiles: () => File[];
  clearPendingFiles: () => void;
}
```

## Examples

### Basic Usage

```jsx
import React, { useState } from 'react';
import { ChatInput } from '@app-studio/web';
import { View } from 'app-studio';

export const BasicChatInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (message) => {
    console.log('Message submitted:', message);
    setInputValue('');
  };

  return (
    <View width="100%">
      <ChatInput
        onSubmit={handleSubmit}
        value={inputValue}
        onChange={setInputValue}
        placeholder="Type your message here..."
      />
    </View>
  );
};
```

### With Prompt Examples

```jsx
import React, { useState } from 'react';
import { ChatInput } from '@app-studio/web';
import { View } from 'app-studio';

export const ChatInputWithPromptExamples = () => {
  const [inputValue, setInputValue] = useState('');

  // Example prompt suggestions
  const promptExamples = [
    { id: '1', text: 'Tell me a joke' },
    { id: '2', text: 'What is the weather today?' },
    { id: '3', text: 'How do I create a React component?' },
  ];

  const handleSubmit = (message) => {
    console.log('Message submitted:', message);
    setInputValue('');
  };

  return (
    <View width="100%">
      <ChatInput
        onSubmit={handleSubmit}
        value={inputValue}
        onChange={setInputValue}
        promptExamples={promptExamples}
      />
    </View>
  );
};
```

### With File Uploads

```jsx
import React, { useRef } from 'react';
import { ChatInput, ChatInputHandles } from '@app-studio/web';
import { View } from 'app-studio';

export const ChatInputWithFileUploads = () => {
  const chatInputRef = useRef<ChatInputHandles>(null);

  const handleSubmit = (message) => {
    // Get any pending files
    const pendingFiles = chatInputRef.current?.getPendingFiles() || [];
    console.log('Message submitted:', message);
    console.log('Pending files:', pendingFiles);
    
    // Clear pending files after submission
    chatInputRef.current?.clearPendingFiles();
  };

  return (
    <View width="100%">
      <ChatInput
        ref={chatInputRef}
        onSubmit={handleSubmit}
        hideAttachments={false}
      />
    </View>
  );
};
```

## Customization

The ChatInput component can be customized using the `views` prop:

```jsx
<ChatInput
  // ...other props
  views={{
    container: { /* styles for the main container */ },
    content: { /* styles for the content wrapper */ },
    editableInput: { /* styles for the editable input */ },
    header: { /* styles for the header */ },
    title: { /* styles for the title */ },
    guideTip: { /* styles for the guide tip */ },
    promptExamples: { /* styles for the prompt examples container */ },
    promptExampleItem: { /* styles for each prompt example item */ },
    attachments: { /* styles for the attachments container */ },
    attachmentItem: { /* styles for each attachment item */ },
    submitButton: { /* styles for the submit button */ },
    fileButton: { /* styles for the file button */ },
  }}
/>
```

## Accessibility

The ChatInput component implements the following accessibility features:

- Keyboard navigation for submitting messages (Enter key)
- ARIA attributes for interactive elements
- Focus management for the input field
- Proper contrast for text and buttons

## Best Practices

- Provide clear placeholder text to guide users
- Handle file uploads appropriately on the server side
- Implement proper error handling for message submission
- Use the `loading` state to indicate when a message is being processed
- Provide feedback to users when messages are sent successfully
