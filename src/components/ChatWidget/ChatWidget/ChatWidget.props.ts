import type { ViewProps } from 'app-studio';
import type {
  Variant,
  Size,
  Message,
  ChatWidgetStyles,
} from './ChatWidget.type';
// Defines the public properties available for the ChatWidget component, extending from ViewProps and omitting its 'size' property.
export interface ChatWidgetProps extends Omit<ViewProps, 'size'> {
  // An optional array of message objects to be displayed within the chat widget.
  messages?: Message[];
  // An optional controlled value for the chat input field.
  inputValue?: string;
  // Callback function triggered when the value of the chat input field changes.
  onInputChange?: (value: string) => void;
  // Callback function triggered when a message is submitted via the chat input.
  onSubmit?: (message: string) => void;
  // Optional placeholder text to display in the chat input field when it's empty.
  inputPlaceholder?: string;
  // A boolean flag to disable the chat input field, preventing user interaction.
  disableInput?: boolean;
  // Specifies the visual variant or style of the chat widget.
  variant?: Variant;
  // Specifies the size of the chat widget (e.g., small, medium, large).
  size?: Size;
  // A boolean flag to determine whether timestamps should be displayed with each message.
  showTimestamps?: boolean;
  // A boolean flag to enable or disable the attachment functionality within the chat.
  enableAttachments?: boolean;
  // A boolean flag to enable or disable the context picker functionality.
  enableContextPicker?: boolean;
  // An array of selected context elements, where each element has an ID and a name.
  selectedContextElements?: Array<{ id: string; name: string }>;
  // Callback function triggered when the context picker button is clicked.
  onContextPickerClick?: () => void;
  // Callback function triggered when a context element is to be removed by its ID.
  onRemoveContextElement?: (id: string) => void;
  // A boolean flag indicating if the chat widget is currently in a loading state.
  isLoading?: boolean;
  // Optional text to display when the chat widget is in a loading state.
  loadingText?: string;
  // Optional custom styles to apply to various parts of the chat widget.
  styles?: ChatWidgetStyles;
  // Specifies the maximum height of the chat widget.
  maxHeight?: string | number;
}
// Defines the internal properties for the ChatWidget's view component, extending from ChatWidgetProps with additional internal state and handlers.
export interface ChatWidgetViewProps extends ChatWidgetProps {
  // The internal state variable for the input field's current value.
  internalInputValue: string;
  // Internal handler function to manage changes in the input field's value.
  handleInputChange: (value: string) => void;
  // Internal handler function to manage the submission of a chat message.
  handleSubmit: (e?: React.FormEvent) => void;
  // A React ref object to directly access the HTMLTextAreaElement of the input field.
  inputRef: React.RefObject<HTMLTextAreaElement>;
  // A React ref object to directly access the HTMLDivElement containing the chat messages, often used for scrolling.
  messagesRef: React.RefObject<HTMLDivElement>;
}
