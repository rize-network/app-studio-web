import { ViewProps } from 'app-studio';
import {
  Variant,
  Shape,
  Size,
  EmojiPickerStyles,
  EmojiCategory,
  Emoji,
} from './EmojiPicker.type';
// Defines the interface for the EmojiPicker component's properties, extending basic ViewProps while omitting its 'onChange' to provide a specific emoji-related handler.
export interface EmojiPickerProps extends Omit<ViewProps, 'onChange'> {
  // Optional unique identifier for the component.
  id?: string;
  // Optional name attribute for form compatibility.
  name?: string;
  // Optional text label displayed with the picker.
  label?: string;
  // Optional placeholder text for the search input field.
  placeholder?: string;
  // Optional helper text displayed below the picker for guidance.
  helperText?: string;
  // The current selected emoji as a string.
  value?: string;
  // The initial selected emoji when the component mounts.
  defaultValue?: string;
  // Callback function triggered when an emoji is selected, returning the emoji as a string.
  onChange?: (emoji: string) => void;
  // Callback function triggered when an emoji is selected, providing the full Emoji object.
  onEmojiSelect?: (emoji: Emoji) => void;
  // Custom styles to be applied to various parts of the EmojiPicker.
  views?: EmojiPickerStyles;
  // Defines the size of the EmojiPicker component.
  size?: Size;
  // Defines the shape variant of the EmojiPicker component.
  shape?: Shape;
  // Defines the visual variant of the EmojiPicker component.
  variant?: Variant;
  // Indicates if the component is in an error state, typically for validation feedback.
  error?: boolean;
  // If true, the EmojiPicker will be disabled and non-interactive.
  isDisabled?: boolean;
  // If true, the EmojiPicker will be read-only, preventing user input but remaining interactable for display.
  isReadOnly?: boolean;
  // Determines whether the emoji search input field should be displayed.
  showSearch?: boolean;
  // Determines whether emoji categories should be displayed for navigation.
  showCategories?: boolean;
  // Determines whether the section for recently used emojis should be displayed.
  showRecentEmojis?: boolean;
  // Sets the maximum number of recent emojis to display.
  maxRecentEmojis?: number;
  // An array of EmojiCategory values to specify which categories are enabled and visible.
  enabledCategories?: EmojiCategory[];
  // An array of custom Emoji objects to be included in the picker.
  customEmojis?: Emoji[];
  // Controls the open/closed state of the emoji picker dropdown.
  isOpen?: boolean;
  // Callback function triggered when the emoji picker dropdown opens.
  onOpen?: () => void;
  // Callback function triggered when the emoji picker dropdown closes.
  onClose?: () => void;
  // If true, the picker will automatically close after an emoji is selected.
  closeOnSelect?: boolean;
  // ARIA attribute for accessibility, providing a descriptive label for the component.
  'aria-label'?: string;
  // ARIA attribute for accessibility, linking the component to an element that describes it.
  'aria-describedby'?: string;
}
// Extends the base EmojiPickerProps with additional properties required for the internal view component, handling its state and interactions.
export interface EmojiPickerViewProps extends EmojiPickerProps {
  // Indicates if the picker is currently open (required for the view component).
  isOpen: boolean;
  // The currently selected emoji string within the view.
  selectedEmoji: string;
  // An array of recently used emojis to display.
  recentEmojis: Emoji[];
  // The current query string used for filtering emojis.
  searchQuery: string;
  // The currently active emoji category.
  activeCategory: EmojiCategory;
  // An array of emojis filtered based on the search query and active category.
  filteredEmojis: Emoji[];
  // Function to toggle the open/closed state of the picker.
  handleToggle: () => void;
  // Function to handle the selection of an emoji.
  handleEmojiSelect: (emoji: Emoji) => void;
  // Function to handle changes in the search query input.
  handleSearchChange: (query: string) => void;
  // Function to handle changes in the active emoji category.
  handleCategoryChange: (category: EmojiCategory) => void;
  // Function to close the emoji picker dropdown.
  handleClose: () => void;
  // Ref object for the DOM element that triggers the emoji picker.
  triggerRef: React.RefObject<HTMLDivElement>;
  // Ref object for the DOM element representing the emoji picker dropdown content.
  dropdownRef: React.RefObject<HTMLDivElement>;
}
