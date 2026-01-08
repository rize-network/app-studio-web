import { ViewProps } from 'app-studio';

export type Variant = 'outline' | 'default' | 'filled';

export type Shape = 'default' | 'square' | 'rounded' | 'pill';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type EmojiPickerStyles = {
  container?: ViewProps;
  trigger?: ViewProps;
  dropdown?: ViewProps;
  searchInput?: ViewProps;
  categoryTabs?: ViewProps;
  categoryTab?: ViewProps;
  emojiGrid?: ViewProps;
  emoji?: ViewProps;
  recentEmojis?: ViewProps;
  label?: ViewProps;
  helperText?: ViewProps;
};

export type EmojiCategory =
  | 'recent'
  | 'smileys'
  | 'people'
  | 'animals'
  | 'food'
  | 'activities'
  | 'travel'
  | 'objects'
  | 'symbols'
  | 'flags';

export type Emoji = {
  emoji: string;
  name: string;
  category: EmojiCategory;
  keywords: string[];
  skinTones?: string[];
};

export type EmojiData = {
  [key in EmojiCategory]?: Emoji[];
};
