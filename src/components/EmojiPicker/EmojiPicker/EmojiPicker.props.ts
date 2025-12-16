import { ViewProps } from 'app-studio';
import {
  Variant,
  Shape,
  Size,
  EmojiPickerStyles,
  EmojiCategory,
  Emoji,
} from './EmojiPicker.type';

export interface EmojiPickerProps extends Omit<ViewProps, 'onChange'> {
  // Basic props
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;

  // Value and change handling
  value?: string;
  defaultValue?: string;
  onChange?: (emoji: string) => void;
  onEmojiSelect?: (emoji: Emoji) => void;

  // Styling
  views?: EmojiPickerStyles;
  size?: Size;
  shape?: Shape;
  variant?: Variant;

  // State
  error?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;

  // Emoji options
  showSearch?: boolean;
  showCategories?: boolean;
  showRecentEmojis?: boolean;
  maxRecentEmojis?: number;
  enabledCategories?: EmojiCategory[];
  customEmojis?: Emoji[];

  // Dropdown behavior
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  closeOnSelect?: boolean;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export interface EmojiPickerViewProps extends EmojiPickerProps {
  // State from useEmojiPickerState
  isOpen: boolean;
  selectedEmoji: string;
  recentEmojis: Emoji[];
  searchQuery: string;
  activeCategory: EmojiCategory;
  filteredEmojis: Emoji[];

  // Handlers from useEmojiPickerState
  handleToggle: () => void;
  handleEmojiSelect: (emoji: Emoji) => void;
  handleSearchChange: (query: string) => void;
  handleCategoryChange: (category: EmojiCategory) => void;
  handleClose: () => void;

  // Refs
  triggerRef: React.RefObject<HTMLDivElement>;
  dropdownRef: React.RefObject<HTMLDivElement>;
}
