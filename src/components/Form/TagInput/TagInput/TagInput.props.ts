import React from 'react';
import { InputProps, Shadow, ViewProps } from 'app-studio';
import { Elevation } from '../../../../utils/elevation';
import {
  Shape,
  Size,
  TagInputStyles,
  Variant,
  Tag,
  TagSeparator,
} from './TagInput.type';
// Defines the public interface for the TagInput component, extending standard InputProps while omitting certain properties.
export interface TagInputProps
  extends Omit<InputProps, 'size' | 'value' | 'onChange'> {
  // A unique identifier for the input element.
  id?: string;
  // The name attribute for the input element, useful for form submissions.
  name?: string;
  // The text label displayed above or alongside the input field.
  label?: string;
  // Text displayed below the input field to provide additional guidance or information.
  helperText?: string;
  // An error message or a boolean indicating that the input is in an error state.
  error?: string | boolean;
  // Placeholder text displayed inside the input field when it is empty.
  placeholder?: string;
  // An array of strings representing the controlled tags within the input.
  tags?: string[];
  // An array of strings representing the initial uncontrolled tags for the input.
  defaultTags?: string[];
  // Callback function invoked when the array of tags changes, providing the updated tags.
  onTagsChange?: (tags: string[]) => void;
  // Callback function invoked when a new tag is successfully added to the input.
  onTagAdd?: (tag: string) => void;
  // Callback function invoked when a tag is removed, providing the tag content and its index.
  onTagRemove?: (tag: string, index: number) => void;
  // The maximum number of tags allowed in the input field.
  maxTags?: number;
  // The minimum character length required for a tag to be valid.
  minTagLength?: number;
  // The maximum character length allowed for a tag.
  maxTagLength?: number;
  // Boolean indicating whether duplicate tags are allowed to be added.
  allowDuplicates?: boolean;
  // An array of characters or keys that trigger the creation of a new tag.
  separators?: TagSeparator[];
  // Boolean indicating whether the input and tags are disabled.
  isDisabled?: boolean;
  // Boolean indicating whether the input field is read-only.
  isReadOnly?: boolean;
  // Boolean indicating whether the input field should automatically gain focus on mount.
  isAutoFocus?: boolean;
  // Boolean indicating whether individual tags can be removed by the user.
  isRemovable?: boolean;
  // Defines the visual size of the TagInput component.
  size?: Size;
  // Defines the visual shape (e.g., rounded corners) of the TagInput component.
  shape?: Shape;
  // Defines the visual variant or style of the TagInput component.
  variant?: Variant;
  // Defines the shadow style applied to the TagInput component.
  shadow?: Shadow | Elevation | ViewProps;
  // Custom styles applied to different parts of the TagInput component.
  views?: TagInputStyles;
  // A React node to be rendered on the left side of the input field.
  left?: React.ReactNode;
  // A React node to be rendered on the right side of the input field.
  right?: React.ReactNode;
  // Callback function invoked when the input field receives focus.
  onFocus?: () => void;
  // Callback function invoked when the input field loses focus.
  onBlur?: () => void;
  // Callback function invoked when the input field is clicked.
  onClick?: () => void;
  // An array of strings to be displayed as selectable suggestions in a menu.
  menuItems?: string[];
  // Callback function invoked when an item from the suggestion menu is selected.
  onMenuItemSelect?: (item: string) => void;
}
// Defines the internal properties for the TagInput's view component, extending TagInputProps with view-specific state and handlers.
export interface TagInputViewProps extends Omit<TagInputProps, 'tags'> {
  // The current value of the internal text input field.
  inputValue?: string;
  // Function to update the internal text input's value.
  setInputValue?: (value: string) => void;
  // An array of `Tag` objects, representing the internal state of tags.
  tags?: Tag[];
  // Function to update the internal array of `Tag` objects.
  setTags?: (tags: Tag[]) => void;
  // Boolean indicating whether the input field is currently focused.
  isFocused?: boolean;
  // Function to set the focus state of the input field.
  setIsFocused?: (focused: boolean) => void;
  // Boolean indicating whether the input field is currently hovered.
  isHovered?: boolean;
  // Function to set the hover state of the input field.
  setIsHovered?: (hovered: boolean) => void;
  // Function to programmatically add a new tag.
  addTag?: (tag: string) => void;
  // Function to programmatically remove a tag by its index.
  removeTag?: (index: number) => void;
  // Event handler for keyboard key down events on the input element.
  handleKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  // Event handler for changes in the input field's value.
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Event handler for when the input field gains focus.
  handleFocus?: () => void;
  // Event handler for when the input field loses focus.
  handleBlur?: () => void;
  // An array of suggested items filtered based on the current input value.
  filteredItems?: string[];
  // The index of the currently active (e.g., highlighted) item in the suggestion menu.
  activeItemIndex?: number;
  // Boolean indicating whether the suggestion menu is currently open.
  isMenuOpen?: boolean;
  // Event handler for when an item from the suggestion menu is selected.
  handleMenuItemSelect?: (item: string) => void;
}
