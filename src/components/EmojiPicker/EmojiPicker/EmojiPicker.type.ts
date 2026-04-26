import { ViewProps } from 'app-studio';
// Defines the visual style variants available for the EmojiPicker component, such as outline, default, or filled.
export type Variant = 'outline' | 'default' | 'filled';
// Specifies the different geometric shapes that can be applied to the EmojiPicker's elements, including default, square, rounded, or pill.
export type Shape = 'default' | 'square' | 'rounded' | 'pill';
// Describes the various predefined sizes for the EmojiPicker component, ranging from extra small to extra large.
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Defines the types for styling individual parts of the EmojiPicker component.
export type EmojiPickerStyles = {
  // Optional styles for the main container of the EmojiPicker.
  container?: ViewProps;
  // Optional styles for the element that triggers the EmojiPicker dropdown.
  trigger?: ViewProps;
  // Optional styles for the dropdown panel containing the emojis.
  dropdown?: ViewProps;
  // Optional styles for the search input field within the picker.
  searchInput?: ViewProps;
  // Optional styles for the container of the emoji category tabs.
  categoryTabs?: ViewProps;
  // Optional styles for an individual emoji category tab.
  categoryTab?: ViewProps;
  // Optional styles for the grid layout displaying emojis.
  emojiGrid?: ViewProps;
  // Optional styles for an individual emoji character.
  emoji?: ViewProps;
  // Optional styles for the section displaying recently used emojis.
  recentEmojis?: ViewProps;
  // Optional styles for the label associated with the EmojiPicker.
  label?: ViewProps;
  // Optional styles for the helper text providing additional information.
  helperText?: ViewProps;
};
// Enumerates the predefined categories for organizing emojis within the picker.
export type EmojiCategory =
  // Represents the category for recently used emojis.
  | 'recent'
  // Represents the category for smileys and emotions emojis.
  | 'smileys'
  // Represents the category for people and body parts emojis.
  | 'people'
  // Represents the category for animals and nature emojis.
  | 'animals'
  // Represents the category for food and drink emojis.
  | 'food'
  // Represents the category for activity and event emojis.
  | 'activities'
  // Represents the category for travel and places emojis.
  | 'travel'
  // Represents the category for objects emojis.
  | 'objects'
  // Represents the category for symbols emojis.
  | 'symbols'
  // Represents the category for flag emojis.
  | 'flags';
// Defines the structure for an individual emoji object, including its details and metadata.
export type Emoji = {
  // The actual emoji character string.
  emoji: string;
  // The descriptive name of the emoji.
  name: string;
  // The category to which the emoji belongs.
  category: EmojiCategory;
  // An array of keywords associated with the emoji for search functionality.
  keywords: string[];
  // Optional array of strings representing different skin tone variations for the emoji.
  skinTones?: string[];
};
// Defines the structure for a collection of emojis organized by category.
export type EmojiData = {
  // A record where each key is an 'EmojiCategory' and the value is an optional array of 'Emoji' objects belonging to that category.
  [key in EmojiCategory]?: Emoji[];
};
