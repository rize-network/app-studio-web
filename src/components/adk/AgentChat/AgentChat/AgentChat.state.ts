import { useState, useEffect, useCallback, useRef } from 'react';
import {
  AgentChatProps,
  AgentMessage,
  AgentSession,
  AgentRunRequest,
  MessageAttachment,
  MessagePart,
} from './AgentChat.props';
import { generateId } from '../../../../utils/generateId';

/**
 * Custom hook for managing AgentChat state and interactions
 */
export const useAgentChat = (props: AgentChatProps) => {
  const {
    appName,
    userId,
    sessionId: initialSessionId,
    apiBaseUrl = '',
    wsBaseUrl = '',
    enableStreaming = true,
    enableFileUpload = true,
    maxFileSize = 10 * 1024 * 1024, // 10MB
    maxFiles = 5,
    allowedFileTypes = [
      'image/*',
      'video/*',
      'audio/*',
      'application/pdf',
      'text/*',
    ],
    initialMessages = [],
    initialSession,
    onSessionCreate,
    onSessionUpdate,
    onMessageSent,
    onMessageReceived,
    onError,
    onFileUpload,
    onTypingStart,
    onTypingStop,
  } = props;

  // Core state
  const [messages, setMessages] = useState<AgentMessage[]>(initialMessages);
  const [currentSession, setCurrentSession] = useState<AgentSession | null>(
    initialSession || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<MessageAttachment[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Refs
  const wsRef = useRef<WebSocket | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate or use provided session ID
  const sessionId = currentSession?.id || initialSessionId || generateId();

  /**
   * Create a new session
   */
  const createSession = useCallback(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, appName }),
      });

      if (!response.ok) throw new Error('Failed to create session');

      const session: AgentSession = await response.json();
      setCurrentSession(session);
      onSessionCreate?.(session);
      return session;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error.message);
      onError?.(error);
      throw error;
    }
  }, [apiBaseUrl, userId, appName, onSessionCreate, onError]);

  /**
   * Send a message to the agent
   */
  const sendMessage = useCallback(
    async (text: string, attachments: MessageAttachment[] = []) => {
      if (!text.trim() && attachments.length === 0) return;

      try {
        setIsLoading(true);
        setError(null);
        setIsTyping(true);
        onTypingStart?.();

        // Ensure we have a session
        let session = currentSession;
        if (!session) {
          session = await createSession();
        }

        // Create user message
        const userMessage: AgentMessage = {
          id: generateId(),
          role: 'user',
          text,
          timestamp: Date.now(),
          attachments: attachments.length > 0 ? attachments : undefined,
        };

        // Add user message to chat
        setMessages((prev) => [...prev, userMessage]);
        onMessageSent?.(userMessage);

        // Prepare message parts
        const parts: MessagePart[] = [{ text }];

        // Add file attachments
        for (const attachment of attachments) {
          const fileData = await readFileAsBase64(attachment.file);
          // Ensure mimeType is compatible with MessagePart's inlineData
          const mimeType =
            typeof attachment.file.type === 'string'
              ? attachment.file.type
              : 'application/octet-stream'; // Fallback if type is not a string
          parts.push({
            inlineData: {
              displayName: attachment.file.name,
              data: fileData,
              mimeType: mimeType,
            },
          });
        }

        // Create agent run request
        const request: AgentRunRequest = {
          appName,
          userId,
          sessionId: session.id,
          newMessage: {
            role: 'user',
            parts,
          },
          streaming: enableStreaming,
        };

        // Send request
        if (enableStreaming) {
          await sendStreamingRequest(request);
        } else {
          await sendRegularRequest(request);
        }

        // Clear input and files
        setInputValue('');
        setSelectedFiles([]);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error.message);
        onError?.(error);
      } finally {
        setIsLoading(false);
        setIsTyping(false);
        onTypingStop?.();
      }
    },
    [
      currentSession,
      createSession,
      appName,
      userId,
      enableStreaming,
      onMessageSent,
      onError,
      onTypingStart,
      onTypingStop,
    ]
  );

  /**
   * Send streaming request using Server-Sent Events
   */
  const sendStreamingRequest = useCallback(
    async (request: AgentRunRequest) => {
      return new Promise<void>((resolve, reject) => {
        const eventSource = new EventSource(`${apiBaseUrl}/run_sse`);
        eventSourceRef.current = eventSource;

        // Send the request
        fetch(`${apiBaseUrl}/run_sse`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request),
        }).catch(reject);

        let streamingMessage: AgentMessage | null = null;

        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.error) {
              reject(new Error(data.error));
              return;
            }

            if (data.content?.parts) {
              for (const part of data.content.parts) {
                // Handle streaming text responses
                if (part.text) {
                  if (!streamingMessage) {
                    streamingMessage = {
                      id: generateId(),
                      role: 'bot',
                      text: part.text,
                      timestamp: Date.now(),
                      eventId: data.id,
                      thought: part.thought,
                    };
                    setMessages((prev) => [...prev, streamingMessage!]);
                  } else {
                    streamingMessage.text =
                      (streamingMessage.text || '') + part.text;
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === streamingMessage!.id
                          ? { ...streamingMessage! }
                          : msg
                      )
                    );
                  }
                }

                // Handle function calls
                if (part.functionCall) {
                  const functionCallMessage: AgentMessage = {
                    id: generateId(),
                    role: 'bot',
                    timestamp: Date.now(),
                    eventId: data.id,
                    functionCall: part.functionCall,
                  };
                  setMessages((prev) => [...prev, functionCallMessage]);
                  onMessageReceived?.(functionCallMessage);
                }

                // Handle function responses
                if (part.functionResponse) {
                  const functionResponseMessage: AgentMessage = {
                    id: generateId(),
                    role: 'bot',
                    timestamp: Date.now(),
                    eventId: data.id,
                    functionResponse: part.functionResponse,
                  };
                  setMessages((prev) => [...prev, functionResponseMessage]);
                  onMessageReceived?.(functionResponseMessage);
                }

                // Handle executable code blocks
                if (part.executableCode) {
                  const codeMessage: AgentMessage = {
                    id: generateId(),
                    role: 'bot',
                    timestamp: Date.now(),
                    eventId: data.id,
                    executableCode: part.executableCode,
                  };
                  setMessages((prev) => [...prev, codeMessage]);
                  onMessageReceived?.(codeMessage);
                }

                // Handle code execution results
                if (part.codeExecutionResult) {
                  const resultMessage: AgentMessage = {
                    id: generateId(),
                    role: 'bot',
                    timestamp: Date.now(),
                    eventId: data.id,
                    codeExecutionResult: part.codeExecutionResult,
                  };
                  setMessages((prev) => [...prev, resultMessage]);
                  onMessageReceived?.(resultMessage);
                }
              }
            }
          } catch (err) {
            console.error('Error parsing SSE data:', err);
          }
        };

        eventSource.onerror = () => {
          eventSource.close();
          resolve();
        };

        eventSource.addEventListener('close', () => {
          eventSource.close();
          resolve();
        });
      });
    },
    [apiBaseUrl, onMessageReceived]
  );

  /**
   * Send regular (non-streaming) request
   */
  const sendRegularRequest = useCallback(
    async (request: AgentRunRequest) => {
      const response = await fetch(`${apiBaseUrl}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();

      if (data.content?.parts) {
        for (const part of data.content.parts) {
          const botMessage: AgentMessage = {
            id: generateId(),
            role: 'bot',
            text: part.text,
            timestamp: Date.now(),
            eventId: data.id,
            thought: part.thought,
            functionCall: part.functionCall,
            functionResponse: part.functionResponse,
            executableCode: part.executableCode,
            codeExecutionResult: part.codeExecutionResult,
          };

          setMessages((prev) => [...prev, botMessage]);
          onMessageReceived?.(botMessage);
        }
      }
    },
    [apiBaseUrl, onMessageReceived]
  );

  /**
   * Handle file selection
   */
  const handleFileSelect = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const validFiles: MessageAttachment[] = [];

      for (const file of fileArray) {
        // Check file size
        if (file.size > maxFileSize) {
          setError(
            `File ${file.name} is too large. Maximum size is ${
              maxFileSize / 1024 / 1024
            }MB`
          );
          continue;
        }

        // Check file type
        const isAllowed = allowedFileTypes.some((type) => {
          if (type.endsWith('/*')) {
            return file.type.startsWith(type.slice(0, -1));
          }
          return file.type === type;
        });

        if (!isAllowed) {
          setError(`File type ${file.type} is not allowed`);
          continue;
        }

        // Check total file count
        if (selectedFiles.length + validFiles.length >= maxFiles) {
          setError(`Maximum ${maxFiles} files allowed`);
          break;
        }

        const attachment: MessageAttachment = {
          file,
          url: URL.createObjectURL(file),
          type: file.type, // Use the shared helper function
        };

        validFiles.push(attachment);
      }

      if (validFiles.length > 0) {
        setSelectedFiles((prev) => [...prev, ...validFiles]);
        // onFileUpload expects File[], so map UploadedFile back to File if necessary
        onFileUpload?.(validFiles.map((f) => f.file));
      }
    },
    [
      maxFileSize,
      allowedFileTypes,
      maxFiles,
      selectedFiles.length,
      onFileUpload,
    ]
  );

  /**
   * Remove selected file
   */
  const removeFile = useCallback((index: number) => {
    setSelectedFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].url);
      newFiles.splice(index, 1);
      return newFiles;
    });
  }, []);

  /**
   * Utility function to read file as base64
   * Handles both File and UploadedFile types.
   */
  const readFileAsBase64 = async (file: File): Promise<string> => {
    if (file instanceof File) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          const base64Data = result.split(',')[1];
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } else if (file) {
      const localUrl = URL.createObjectURL(file);
      // If it's an UploadedFile with a localUrl, fetch it
      const response = await fetch(localUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          const base64Data = result.split(',')[1];
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }
    throw new Error(
      'Cannot read file: neither File nor UploadedFile with localUrl'
    );
  };

  /**
   * Initialize session on mount
   */
  useEffect(() => {
    if (!currentSession && !initialSessionId) {
      createSession();
    }
  }, [currentSession, initialSessionId, createSession]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      // Cleanup file URLs
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [selectedFiles]);

  return {
    // State
    messages,
    currentSession,
    isLoading,
    isTyping,
    error,
    inputValue,
    selectedFiles,
    isConnected,
    sessionId,

    // Actions
    sendMessage,
    setInputValue,
    handleFileSelect,
    removeFile,
    createSession,

    // Refs
    messagesEndRef,

    // Additional state setters for view component
    setError,
    setSelectedFiles,
  };
};
