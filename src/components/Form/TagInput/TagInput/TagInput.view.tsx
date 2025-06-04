/**
 * TagInput View Component
 *
 * Renders a tags input field with chips for each tag
 * according to the design guidelines.
 */

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

/**
 * Individual tag chip component
 */
const TagChip: React.FC<{
  tag: string;
  onRemove: () => void;
  isRemovable: boolean;
  size: string;
  views: any;
  isDisabled: boolean;
  isReadOnly: boolean;
}> = ({ tag, onRemove, isRemovable, size, views, isDisabled, isReadOnly }) => {
  const { getColor } = useTheme();

  const chipSize = {
    xs: { padding: '2px 6px', fontSize: '10px', iconSize: 10 },
    sm: { padding: '4px 8px', fontSize: '12px', iconSize: 12 },
    md: { padding: '6px 10px', fontSize: '14px', iconSize: 14 },
    lg: { padding: '8px 12px', fontSize: '16px', iconSize: 16 },
    xl: { padding: '10px 14px', fontSize: '18px', iconSize: 18 },
  }[size] || { padding: '6px 10px', fontSize: '14px', iconSize: 14 };

  return (
    <Horizontal
      alignItems="center"
      gap={4}
      padding={chipSize.padding}
      backgroundColor="color.gray.100"
      borderRadius="16px"
      border="1px solid"
      borderColor="color.gray.200"
      transition="all 0.2s ease"
      opacity={isDisabled ? 0.6 : 1}
      _hover={
        !isDisabled && !isReadOnly
          ? {
              backgroundColor: 'color.gray.200',
              borderColor: 'color.gray.300',
            }
          : {}
      }
      {...views?.tag}
    >
      <Text
        fontSize={chipSize.fontSize}
        color={isDisabled ? 'color.gray.400' : 'color.gray.700'}
        fontWeight="500"
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
          transition="all 0.2s ease"
          _hover={{
            backgroundColor: 'color.gray.300',
          }}
          onClick={onRemove}
          {...views?.tagRemove}
        >
          <CloseIcon widthHeight={chipSize.iconSize} color="color.gray.500" />
        </View>
      )}
    </Horizontal>
  );
};

/**
 * Main TagInput view component
 */
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

  // Determine if we should show the label
  const showLabel = Boolean(
    label && (isFocused || tags.length > 0 || inputValue)
  );

  // Calculate if max tags reached
  const isMaxReached = maxTags && tags.length >= maxTags;

  // Container styles
  const containerStyles = {
    ...Shapes[shape],
    ...InputVariants[variant],
    ...views?.inputContainer,
  };

  // Input styles
  const inputStyles = {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontSize: Typography.fontSizes[size],
    color: isDisabled ? 'color.gray.400' : 'color.gray.900',
    flex: 1,
    minWidth: '120px',
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
          {/* Label */}
          {label && (
            <FieldLabel size={size} error={!!error} views={views}>
              {label}
            </FieldLabel>
          )}

          {/* Tags and Input Container */}
          <Horizontal
            alignItems="center"
            gap={4}
            flexWrap="wrap"
            width="100%"
            minHeight={Typography.fontSizes[size]}
            padding="8px 0"
            {...views?.tagsContainer}
          >
            {/* Existing Tags */}
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

            {/* Input Field */}
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

            {/* Max tags reached message */}
            {isMaxReached && (
              <Text
                fontSize={Typography.fontSizes[size]}
                color="color.gray.500"
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
