import { ViewProps } from 'app-studio';
import {
  ChatInputStyles,
  ModelOption,
  PromptExample,
  Shape,
  Size,
  Variant,
} from './ChatInput.type';
import { Suggestion } from '../EditableInput';

/**
 * Props for the ChatInput component
 */
export interface ChatInputProps extends ViewProps {
  /**
   * Get the pending files
   */
  getPendingFiles: () => File[];

  /**
   * Clear the pending files
   */
  clearPendingFiles: () => void;
  /**
   * Callback function when the form is submitted
   */
  onSubmit: (
    message: string,
    options?: { model_name?: string; enable_thinking?: boolean }
  ) => void;

  /**
   * Placeholder text for the input
   */
  placeholder?: string;

  /**
   * Whether the input is in a loading state
   */
  loading?: boolean;

  /**
   * Whether the input is disabled
   */
  disabled?: boolean;

  /**
   * Whether an agent is currently running
   */
  isAgentRunning?: boolean;

  /**
   * Callback function to stop the agent
   */
  onStopAgent?: () => void;

  /**
   * Whether to auto focus the input
   */
  autoFocus?: boolean;

  /**
   * Controlled value for the input
   */
  value?: string;

  /**
   * Callback function when the input value changes
   */
  onChange?: (value: string) => void;

  /**
   * Callback function when the file browser is opened
   */
  onFileBrowse?: () => void;

  /**
   * ID of the sandbox
   */
  sandboxId?: string;

  /**
   * Whether to hide the attachment button
   */
  hideAttachments?: boolean;

  /**
   * Enable audio recording button
   */
  enableAudioRecording?: boolean;

  /**
   * Callback when audio recording starts
   */
  onAudioRecordingStart?: () => void;

  /**
   * Callback when audio recording stops
   */
  onAudioRecordingStop?: (audio: Blob) => void;

  /**
   * Title for the chat input
   */
  title?: string;

  /**
   * Whether to show the guide tip
   */
  showGuideTip?: boolean;

  /**
   * URL for the guide video
   */
  guideVideoUrl?: string;

  /**
   * Callback function when the guide tip is closed
   */
  onGuideClose?: () => void;

  /**
   * List of prompt examples
   */
  promptExamples?: PromptExample[];

  /**
   * List of suggestions for auto-completion
   */
  suggestions?: Suggestion[];

  /**
   * Callback function when a prompt example is selected
   */
  onPromptExampleSelect?: (example: PromptExample) => void;

  /**
   * Data for mention auto-completion
   */
  mentionData?: Array<{
    id: string;
    name: string;
    avatar?: string;
    description?: string;
  }>;

  /**
   * Trigger character for mentions (default: '@')
   */
  mentionTrigger?: string;

  /**
   * Callback function when a mention is selected
   */
  onMentionSelect?: (mention: {
    id: string;
    name: string;
    avatar?: string;
    description?: string;
  }) => void;

  /**
   * Error message to display at the bottom
   */
  errorMessage?: string;

  /**
   * Size of the input
   */
  size?: Size;

  /**
   * Shape of the input
   */
  shape?: Shape;

  /**
   * Variant of the input
   */
  variant?: Variant;

  /**
   * Style customization
   */
  views?: ChatInputStyles;
}

/**
 * Props for the ChatInput view component
 */
export interface ChatInputViewProps extends ChatInputProps {
  /**
   * Current value of the input
   */
  value?: string;

  /**
   * Callback function when the input value changes
   */
  handleChange: (value: string) => void;

  /**
   * Callback function when the form is submitted
   */
  handleSubmit: (e: React.FormEvent) => void;

  /**
   * Reference to the editable div element
   */
  editableRef: React.RefObject<HTMLDivElement>;

  /**
   * Reference to the file input element
   */
  fileInputRef: React.RefObject<HTMLInputElement>;

  /**
   * Whether files are being uploaded
   */
  isUploading: boolean;

  /**
   * Current upload progress (0-100)
   */
  uploadProgress?: number;

  leftButtons?: React.ReactNode;
  rightButtons?: React.ReactNode;

  /**
   * Whether the user is dragging files over the input
   */
  isDraggingOver: boolean;

  /**
   * List of uploaded files
   */
  uploadedFiles: File[];

  /**
   * Callback function to remove an uploaded file
   */
  removeUploadedFile: (index: number) => void;

  /**
   * Callback function to set pending files
   */
  setPendingFiles: React.Dispatch<React.SetStateAction<File[]>>;

  /**
   * Callback function to set uploaded files
   */
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;

  /**
   * Callback function to set whether files are being uploaded
   */
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Start uploading newly added files
   */
  startUpload: (files: File[]) => void;

  /**
   * Currently selected model
   */
  selectedModel: string;

  /**
   * Callback function when the model changes
   */
  handleModelChange: (model: string) => void;

  /**
   * List of available models
   */
  modelOptions: ModelOption[];

  /**
   * Subscription status
   */
  subscriptionStatus?: string;

  /**
   * Whether the user can access the selected model
   */
  canAccessModel: (model: string) => boolean;

  /**
   * Whether the guide tip is shown
   */
  isGuideTipShown: boolean;

  /**
   * Callback function to hide the guide tip
   */
  hideGuideTip: () => void;

  /**
   * Callback function to handle prompt example selection
   */
  handlePromptExampleSelect: (example: PromptExample) => void;

  /**
   * Callback function to handle drag over events
   */
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;

  /**
   * Callback function to handle drag leave events
   */
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;

  /**
   * List of suggestions for auto-completion
   */
  suggestions?: Suggestion[];
}
