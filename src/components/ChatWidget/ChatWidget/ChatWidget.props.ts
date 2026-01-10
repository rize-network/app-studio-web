import type { ViewProps } from 'app-studio';
import type {
  Variant,
  Size,
  Message,
  ChatWidgetStyles,
} from './ChatWidget.type';

/** Props for the ChatWidget component */
export interface ChatWidgetProps extends Omit<ViewProps, 'size'> {
  /** Array of messages to display */
  messages?: Message[];

  /** Current input value (for controlled component) */
  inputValue?: string;

  /** Callback when input value changes */
  onInputChange?: (value: string) => void;

  /** Callback when a message is submitted */
  onSubmit?: (message: string) => void;

  /** Placeholder text for the input field */
  inputPlaceholder?: string;

  /** Disable the input field */
  disableInput?: boolean;

  /** Visual variant of the component */
  variant?: Variant;

  /** Size of the component */
  size?: Size;

  /** Show timestamps on messages */
  showTimestamps?: boolean;

  /** Enable attachment button (visual only) */
  enableAttachments?: boolean;

  /** Enable context picker button */
  enableContextPicker?: boolean;

  /** Selected context elements to display in input area */
  selectedContextElements?: Array<{ id: string; name: string }>;

  /** Callback when context picker is requested */
  onContextPickerClick?: () => void;

  /** Callback when a context element is removed from input */
  onRemoveContextElement?: (id: string) => void;

  /** Loading state */
  isLoading?: boolean;

  /** Loading text to display */
  loadingText?: string;

  /** Custom styles for different parts of the component */
  styles?: ChatWidgetStyles;

  /** Maximum height for the messages container */
  maxHeight?: string | number;
}

/** Props for the ChatWidget view component (includes state) */
export interface ChatWidgetViewProps extends ChatWidgetProps {
  /** Internal input value from state */
  internalInputValue: string;

  /** Handler for input changes */
  handleInputChange: (value: string) => void;

  /** Handler for message submission */
  handleSubmit: (e?: React.FormEvent) => void;

  /** Ref for the input element */
  inputRef: React.RefObject<HTMLTextAreaElement>;

  /** Ref for the messages container */
  messagesRef: React.RefObject<HTMLDivElement>;
}
