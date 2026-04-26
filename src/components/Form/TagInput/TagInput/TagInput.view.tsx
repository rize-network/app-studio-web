import React from 'react';
import {
  Input,
  Typography,
  useTheme,
  Horizontal,
  View,
  Text,
} from 'app-studio';
import { FieldContainer } from '../../../Input/FieldContainer/FieldContainer';
import { FieldContent } from '../../../Input/FieldContent/FieldContent';
import { FieldLabel } from '../../../Input/FieldLabel/FieldLabel';
import { FieldWrapper } from '../../../Input/FieldWrapper/FieldWrapper';
import { CloseIcon } from '../../../Icon/Icon';
import { TagInputViewProps } from './TagInput.props';
import { Shapes, InputVariants } from '../../../Input/Input.style';
// Defines the TagChip functional component, which renders an individual tag with a customizable removal option. It accepts properties for the tag value, removal handler, removability status, size, custom view overrides, and disabled/read-only states.
const TagChip: React.FC<{
  tag: string;
  onRemove: () => void;
  isRemovable: boolean;
  size: string;
  views: any;
  isDisabled: boolean;
  isReadOnly: boolean;
}> = ({ tag, onRemove, isRemovable, size, views, isDisabled, isReadOnly }) => {
  // Manages the hover state for the remove icon within a tag chip, allowing for visual feedback when the user hovers over it.
  const [isRemoveHovered, setIsRemoveHovered] = React.useState(false);
  // Calculates dynamic styling properties (padding, font size, icon size) for the tag chip based on the `size` prop, with a default for 'md'.
  const chipSize = {
    xs: { padding: '2px 8px', fontSize: '10px', iconSize: 10 },
    sm: { padding: '4px 10px', fontSize: '12px', iconSize: 12 },
    md: { padding: '6px 14px', fontSize: '14px', iconSize: 14 },
    lg: { padding: '8px 16px', fontSize: '16px', iconSize: 16 },
    xl: { padding: '10px 18px', fontSize: '18px', iconSize: 18 },
  }[size] || { padding: '6px 14px', fontSize: '14px', iconSize: 14 };
  return (
    <Horizontal
      alignItems="center"
      gap={6}
      padding={chipSize.padding}
      backgroundColor="rgba(var(--theme-primary-rgb), 0.1)"
      borderRadius="9999px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="rgba(var(--theme-primary-rgb), 0.2)"
      transition="all 0.15s ease-in-out"
      opacity={isDisabled ? 0.6 : 1}
      _hover={
        !isDisabled && !isReadOnly
          ? {
              backgroundColor: 'rgba(var(--theme-primary-rgb), 0.2)',
              borderColor: 'rgba(var(--theme-primary-rgb), 0.3)',
            }
          : {}
      }
      {...views?.tag}
    >
      <Text
        fontSize={chipSize.fontSize}
        color={isDisabled ? 'color-gray-400' : 'theme-primary'}
        whiteSpace="nowrap"
        {...views?.tagText}
      >
        {tag}
      </Text>
      {isRemovable && !isDisabled && !isReadOnly && (
        <View
          cursor="pointer"
          padding="2px"
          borderRadius="50%"
          transition="all 0.15s ease-in-out"
          backgroundColor={isRemoveHovered ? 'color-red-100' : 'transparent'}
          opacity={isRemoveHovered ? 1 : 0.7}
          onMouseEnter={() => setIsRemoveHovered(true)}
          onMouseLeave={() => setIsRemoveHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          _hover={{
            backgroundColor: 'color-red-100',
          }}
          {...views?.tagRemove}
        >
          <CloseIcon
            widthHeight={chipSize.iconSize}
            color={isRemoveHovered ? 'color-red-500' : 'color-gray-400'}
          />
        </View>
      )}
    </Horizontal>
  );
};
const TagInputView: React.FC<TagInputViewProps> = ({
  id,
  name,
  label,
  placeholder = 'Type and press Enter to add tags...',
  helperText,
  error = false,
  inputValue = '',
  tags = [],
  left,
  right,
  shadow = {},
  views = {},
  size = 'md',
  shape = 'default',
  variant = 'default',
  isDisabled = false,
  isReadOnly = false,
  isAutoFocus = false,
  isRemovable = true,
  isFocused = false,
  isHovered = false,
  maxTags,
  handleInputChange,
  handleKeyDown,
  handleFocus,
  handleBlur,
  removeTag,
  setIsHovered,
  onClick,
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const showLabel = Boolean(
    label && (isFocused || tags.length > 0 || inputValue)
  );
  const isMaxReached = maxTags && tags.length >= maxTags;
  const containerStyles = {
    ...Shapes[shape],
    ...InputVariants[variant],
    ...views?.inputContainer,
  };
  const inputStyles = {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontSize: Typography.fontSizes[size],
    color: isDisabled ? 'color-gray-400' : 'color-gray-800',
    flex: 1,
    minWidth: '120px',
    transition: 'all 0.2s ease-in-out',
    ...views?.input,
  };
  return (
    <FieldContainer
      error={!!error}
      helperText={typeof error === 'string' ? error : helperText}
      views={views}
      {...props}
    >
      <FieldContent
        label={label}
        shadow={shadow}
        value={tags.length > 0 || inputValue ? 'has-content' : ''}
        size={size}
        shape={shape}
        variant={variant}
        error={!!error}
        showLabel={showLabel}
        isFocused={isFocused}
        isHovered={isHovered}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        views={views}
        onClick={onClick}
        onMouseEnter={() => setIsHovered?.(true)}
        onMouseLeave={() => setIsHovered?.(false)}
        {...containerStyles}
      >
        {left}
        <FieldWrapper>
          {}
          {label && (
            <FieldLabel size={size} error={!!error} views={views}>
              {label}
            </FieldLabel>
          )}
          {}
          <Horizontal
            alignItems="center"
            gap={8}
            flexWrap="wrap"
            width="100%"
            minHeight={Typography.fontSizes[size]}
            padding="8px 0"
            {...views?.tagsContainer}
          >
            {}
            {tags.map((tag, index) => (
              <TagChip
                key={tag.id}
                tag={tag.value}
                onRemove={() => removeTag?.(index)}
                isRemovable={isRemovable}
                size={size}
                views={views}
                isDisabled={isDisabled}
                isReadOnly={isReadOnly}
              />
            ))}
            {}
            {!isMaxReached && (
              <Input
                id={id}
                name={name}
                type="text"
                value={inputValue}
                placeholder={tags.length === 0 ? placeholder : ''}
                disabled={isDisabled}
                readOnly={isReadOnly}
                autoFocus={isAutoFocus}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                autoComplete="off"
                {...inputStyles}
              />
            )}
            {}
            {isMaxReached && (
              <Text
                fontSize={Typography.fontSizes[size]}
                color="color-gray-500"
                fontStyle="italic"
                {...views?.placeholder}
              >
                Maximum {maxTags} tags reached
              </Text>
            )}
          </Horizontal>
        </FieldWrapper>
        {right}
      </FieldContent>
    </FieldContainer>
  );
};
export default TagInputView;
