import { ViewProps } from 'app-studio';

/**
 * Core ADK Agent Types
 */
export interface AgentRunRequest {
  appName: string;
  userId: string;
  sessionId: string;
  newMessage: {
    role: string;
    parts: MessagePart[];
  };
  functionCallEventId?: string;
  streaming?: boolean;
}

export interface MessagePart {
  text?: string;
  inlineData?: {
    displayName: string;
    data: string | ArrayBuffer;
    mimeType: string;
  };
  functionCall?: {
    id: string;
    name: string;
    args: any;
  };
  functionResponse?: {
    id: string;
    name: string;
    response: any;
  };
  executableCode?: {
    language: string;
    code: string;
  };
  codeExecutionResult?: {
    outcome: string;
    output?: string;
  };
  thought?: boolean;
}

export interface AgentMessage {
  id: string;
  role: 'user' | 'bot';
  text?: string;
  parts?: MessagePart[];
  timestamp: number;
  isLoading?: boolean;
  thought?: boolean;
  eventId?: string;
  attachments?: MessageAttachment[];
  inlineData?: {
    displayName?: string;
    data: string;
    mimeType: string;
    mediaType?: 'image' | 'video' | 'audio' | 'document';
  };
  functionCall?: any;
  functionResponse?: any;
  executableCode?: any;
  codeExecutionResult?: any;
  renderedContent?: string;
  evalStatus?: string;
  failedMetric?: string;
  evalScore?: number;
  evalThreshold?: number;
}

export interface MessageAttachment {
  file: File;
  url: string;
  type: 'image' | 'video' | 'audio' | 'document';
}

export interface AgentSession {
  id: string;
  userId: string;
  appName: string;
  state: any;
  events: any[];
  createdAt: number;
  updatedAt: number;
}

export interface AgentEvent {
  id: string;
  sessionId: string;
  type: string;
  data: any;
  timestamp: number;
  title?: string;
}

/**
 * Component View Customization
 */
export interface AgentChatViews {
  container?: ViewProps;
  header?: ViewProps;
  messageList?: ViewProps;
  message?: ViewProps;
  userMessage?: ViewProps;
  botMessage?: ViewProps;
  inputArea?: ViewProps;
  inputField?: ViewProps;
  sendButton?: ViewProps;
  attachmentArea?: ViewProps;
  loadingIndicator?: ViewProps;
  errorMessage?: ViewProps;
  typingIndicator?: ViewProps;
}

/**
 * Event Handlers
 */
export interface AgentChatEventHandlers {
  onSessionCreate?: (session: AgentSession) => void;
  onSessionUpdate?: (session: AgentSession) => void;
  onMessageSent?: (message: AgentMessage) => void;
  onMessageReceived?: (message: AgentMessage) => void;
  onError?: (error: Error) => void;
  onFileUpload?: (files: File[]) => void;
  onTypingStart?: () => void;
  onTypingStop?: () => void;
  onAudioRecordingStart?: () => void;
  onAudioRecordingStop?: (audioData: Blob) => void;
  onVideoRecordingStart?: () => void;
  onVideoRecordingStop?: (videoData: Blob) => void;
}

/**
 * Main AgentChat Props Interface
 */
export interface AgentChatProps extends ViewProps, AgentChatEventHandlers {
  // Required props
  appName: string;
  userId: string;

  // Optional configuration
  sessionId?: string;
  apiBaseUrl?: string;
  wsBaseUrl?: string;

  // Feature toggles
  enableFileUpload?: boolean;
  enableAudioRecording?: boolean;
  enableVideoRecording?: boolean;
  enableStreaming?: boolean;
  enableThoughts?: boolean;

  // Limits and constraints
  maxFileSize?: number;
  maxFiles?: number;
  allowedFileTypes?: string[];
  maxMessageLength?: number;

  // UI customization
  placeholder?: string;
  showTimestamps?: boolean;
  showAvatars?: boolean;
  showTypingIndicator?: boolean;
  autoScroll?: boolean;

  // Styling
  views?: AgentChatViews;

  // Initial state
  initialMessages?: AgentMessage[];
  initialSession?: AgentSession;

  // Advanced features
  enableFunctionCalls?: boolean;
  enableCodeExecution?: boolean;
  enableEvaluation?: boolean;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
}
