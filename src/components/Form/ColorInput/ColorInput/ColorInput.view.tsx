import React from 'react';
import {
  Element,
  View,
  Vertical,
  Horizontal,
  Text,
  useTheme,
} from 'app-studio';
import { ColorInputViewProps } from './ColorInput.props';
import { formatColor } from './colorFormat';
import {
  DefaultColorInputStyles,
  Sizes,
  Shapes,
  Variants,
  DefaultColorPalette,
} from './ColorInput.style';
import { TextField } from '../../TextField/TextField';
import { ChevronIcon } from '../../../Icon/Icon';
import { Label } from '../../Label/Label';
// Defines the ColorInputView functional component, responsible for rendering the visual structure and interaction logic of the color input. It receives ColorInputViewProps to configure its appearance and behavior.
const ColorInputView: React.FC<ColorInputViewProps> = ({
  id,
  name,
  label,
  placeholder = 'Select a color',
  helperText,
  views = {},
  size = 'md',
  shape = 'default',
  variant = 'default',
  shadow,
  error = false,
  isDisabled = false,
  isReadOnly = false,
  isFocused = false,
  isHovered = false,
  predefinedColors = DefaultColorPalette,
  showCustomInput = true,
  showRecentColors = true,
  isOpen = false,
  selectedColor = '',
  recentColors = [],
  customColor = '',
  handleToggle = () => {},
  handleColorSelect = () => {},
  handleCustomColorChange = () => {},
  handleCustomColorSubmit = () => {},
  handleClose,
  setIsFocused = () => {},
  setIsHovered = () => {},
  setValue,
  triggerRef,
  dropdownRef,
  onChange,
  onChangeComplete,
  onBlur,
  onFocus,
  onOpen,
  onClose,
  colorFormat,
  maxRecentColors,
  closeOnSelect,
  value,
  defaultValue,
  'aria-label': ariaLabel,
  ...props
}) => {
  // Initializes the getColor function from the useTheme hook, allowing access to theme-defined colors for consistent styling.
  const { getColor } = useTheme();
  const generatedId = React.useId();
  const triggerId = id ?? generatedId;
  const labelId = `${triggerId}-label`;
  const listboxId = `${triggerId}-listbox`;
  const helperTextId = `${triggerId}-helper-text`;
  const errorTextId = `${triggerId}-error-text`;
  const hasErrorText = !!error && typeof error === 'string';
  const describedBy =
    [helperText ? helperTextId : null, hasErrorText ? errorTextId : null]
      .filter(Boolean)
      .join(' ') || undefined;
  // Combines default container styles with any custom styles provided through the views.container prop.
  const containerStyles = {
    ...DefaultColorInputStyles.container,
    ...views?.container,
  };
  // Combines default trigger styles with dynamic styles based on size, shape, variant, and component states such as error, disabled, focused, and hovered.
  const triggerStyles = {
    ...DefaultColorInputStyles.trigger,
    ...Sizes[size],
    ...Shapes[shape],
    ...Variants[variant],
    ...(error && { borderColor: 'color-red-500' }),
    ...(isDisabled && { opacity: 0.6, cursor: 'not-allowed' }),
    ...(isFocused && {
      borderColor: 'theme-primary',
      boxShadow:
        '0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 4px rgba(29, 78, 216, 0.16)',
    }),
    ...(isHovered && !isDisabled && { borderColor: 'color-gray-400' }),
    ...views?.trigger,
    ...(shadow && shadow),
  };
  // Combines default dropdown styles with any custom styles provided through the views.dropdown prop.
  const dropdownStyles = {
    ...DefaultColorInputStyles.dropdown,
    ...views?.dropdown,
  };
  // Combines default color grid styles with any custom styles provided through the views.colorGrid prop for displaying predefined color swatches.
  const colorGridStyles = {
    ...DefaultColorInputStyles.colorGrid,
    ...views?.colorGrid,
  };
  // Combines default recent colors section styles with any custom styles provided through the views.recentColors prop.
  const recentColorsStyles = {
    ...DefaultColorInputStyles.recentColors,
    ...views?.recentColors,
  };
  // Determines the color to be displayed in the current color swatch, defaulting to 'color-gray-200' if no color is currently selected.
  const displayColor = selectedColor || 'color-gray-200';
  return (
    <View {...containerStyles} {...props}>
      {}
      {label && (
        <Label
          id={labelId}
          htmlFor={triggerId}
          size={size}
          isDisabled={isDisabled}
          error={error}
          views={views?.label}
        >
          {label}
        </Label>
      )}
      {/* The trigger is a div, so the control itself never submits anything;
          this hidden input carries the value in plain HTML forms. */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={formatColor(selectedColor, colorFormat)}
        />
      )}
      {}
      <View
        ref={triggerRef}
        id={triggerId}
        onClick={isDisabled || isReadOnly ? undefined : handleToggle}
        onKeyDown={(event: React.KeyboardEvent) => {
          // role="button" carries no native key handling — without this,
          // Enter/Space do nothing and the picker is unreachable by keyboard.
          if (isDisabled || isReadOnly) return;
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleToggle();
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // The public `onFocus` / `onBlur` props were declared but never wired,
        // so they silently never fired.
        onFocus={() => {
          setIsFocused(true);
          if (onFocus) onFocus();
        }}
        onBlur={(event: any) => {
          setIsFocused(false);
          if (onBlur) onBlur(event);
        }}
        tabIndex={isDisabled ? -1 : 0}
        role="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? listboxId : undefined}
        // `htmlFor` pointing at a div is inert, so the visible label names the
        // trigger via aria-labelledby. An explicit aria-label prop still wins:
        // labelledby is skipped for it because it outranks aria-label in the
        // accessible-name computation.
        aria-labelledby={!ariaLabel && label ? labelId : undefined}
        aria-label={ariaLabel ?? (label ? undefined : placeholder)}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        width={'fit-content'}
        gap={8}
        {...triggerStyles}
      >
        {}
        {}
        <View
          width="20px"
          height="20px"
          borderRadius="4px"
          backgroundColor={displayColor}
          borderWidth="1px"
          borderStyle="solid"
          borderColor="color-gray-300"
        />
        {}
        {}
        {!isReadOnly && !isDisabled && (
          <ChevronIcon
            widthHeight={16}
            color="color-gray-500"
            orientation={isOpen ? 'up' : 'down'}
          />
        )}
      </View>
      {}
      {isOpen && (
        <View ref={dropdownRef} {...dropdownStyles}>
          {}
          <View
            id={listboxId}
            role="listbox"
            aria-labelledby={label ? labelId : undefined}
            aria-label={label ? undefined : 'Color options'}
            {...colorGridStyles}
          >
            {predefinedColors.map((colorOption, index) => (
              <View
                key={index}
                role="option"
                aria-selected={selectedColor === colorOption.value}
                aria-label={colorOption.name}
                tabIndex={0}
                width="24px"
                height="24px"
                borderRadius="8px"
                backgroundColor={colorOption.value}
                borderWidth="2px"
                borderStyle="solid"
                borderColor={
                  selectedColor === colorOption.value
                    ? 'theme-primary'
                    : 'transparent'
                }
                cursor="pointer"
                transition="transform 0.2s ease, border-color 0.2s ease"
                onClick={() => handleColorSelect(colorOption.value)}
                onKeyDown={(event: React.KeyboardEvent) => {
                  // Divs with role="option" get no native key handling.
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleColorSelect(colorOption.value);
                  }
                }}
                title={colorOption.name}
                _hover={{
                  transform: 'scale(1.05)',
                  borderColor: 'color-gray-400',
                }}
                {...views?.colorSwatch}
              />
            ))}
          </View>
          {}
          {showRecentColors && recentColors.length > 0 && (
            <Vertical gap={8} marginTop="16px">
              <Text fontSize="12px" fontWeight="500" color="color-gray-600">
                Recent Colors
              </Text>
              <Horizontal gap={4} flexWrap="wrap" {...recentColorsStyles}>
                {recentColors.map((color, index) => (
                  <View
                    key={index}
                    width="20px"
                    height="20px"
                    borderRadius="8px"
                    backgroundColor={color}
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor={
                      selectedColor === color
                        ? 'theme-primary'
                        : 'color-gray-300'
                    }
                    cursor="pointer"
                    transition="transform 0.2s ease, border-color 0.2s ease"
                    onClick={() => handleColorSelect(color)}
                    title={color}
                    _hover={{
                      transform: 'scale(1.05)',
                      borderColor: 'color-gray-400',
                    }}
                  />
                ))}
              </Horizontal>
            </Vertical>
          )}
          {}
          {showCustomInput && (
            <Vertical gap={8} marginTop="16px">
              <Text fontSize="12px" fontWeight="500" color="color-gray-600">
                Custom Color
              </Text>
              <Horizontal gap={8}>
                <TextField
                  value={customColor}
                  onChange={handleCustomColorChange}
                  placeholder="#000000 or rgb(0,0,0)"
                  aria-label="Custom color"
                  size="sm"
                  style={{ flex: 1 }}
                  views={views?.customInput}
                />
                {/* A real button, so it is focusable and Enter/Space work
                    natively. */}
                <Element
                  as="button"
                  type="button"
                  padding="8px 12px"
                  backgroundColor="theme-primary"
                  border="none"
                  borderRadius="8px"
                  cursor="pointer"
                  onClick={handleCustomColorSubmit}
                  transition="background-color 0.2s ease, opacity 0.2s ease"
                  _hover={{ backgroundColor: 'color-blue-700' }}
                >
                  <Text color="color-white" fontSize="12px" fontWeight="500">
                    Add
                  </Text>
                </Element>
              </Horizontal>
            </Vertical>
          )}
        </View>
      )}
      {}
      {helperText && (
        <Text
          id={helperTextId}
          fontSize="12px"
          color={error ? 'color-red-500' : 'color-gray-600'}
          marginTop="4px"
          {...views?.helperText}
        >
          {helperText}
        </Text>
      )}
      {}
      {hasErrorText && (
        <Text
          id={errorTextId}
          fontSize="12px"
          color="color-red-500"
          marginTop="4px"
          {...views?.error}
        >
          {error}
        </Text>
      )}
    </View>
  );
};
export default ColorInputView;
