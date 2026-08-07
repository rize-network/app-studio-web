import React, { useCallback, useRef } from 'react';
import { Portal } from '../../../Portal/Portal';
import { Element, useElementPosition } from 'app-studio';
import { Typography } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from 'app-studio';
import { FieldContainer } from '../../../Input/FieldContainer/FieldContainer';
import { FieldContent } from '../../../Input/FieldContent/FieldContent';
import { FieldIcons } from '../../../Input/FieldIcons/FieldIcons';
import { FieldLabel } from '../../../Input/FieldLabel/FieldLabel';
import { FieldWrapper } from '../../../Input/FieldWrapper/FieldWrapper';
import { ChevronIcon, CloseIcon } from '../../../Icon/Icon';
import {
  DropDownProps,
  HiddenSelectProps,
  ItemProps,
  MultiSelectProps,
  SelectBoxProps,
  SelectViewProps,
} from './Select.props';
import {
  IconSizes,
  dropdownStyles,
  dropdownAnimation,
  optionStyles,
  optionStateStyles,
  chevronAnimation,
  chipStyles,
  scrollbarStyles,
} from './Select.style';

const withoutFieldShellView = <T extends Record<string, any>>(views?: T): T => {
  if (!views) return {} as T;
  const { container, content, ...layoutViews } = views;
  return layoutViews as T;
};

// Field sizing now lives in `Input/fieldSizes` and is applied by FieldContent,
// so this component no longer carries its own copy of the scale.

/**
 * Item Component
 *
 * Renders an individual option item in the select dropdown
 */
const Item: React.FC<ItemProps & { isSelected?: boolean }> = ({
  isHovered,
  setIsHovered = () => {},
  option,
  size = 'md',
  callback = () => {},
  style,
  isSelected = false,
  ...props
}) => {
  // Handles the click event on an option
  const handleOptionClick = (e: React.MouseEvent, option: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (typeof callback === 'function') {
      callback(option);
    }
  };

  // Toggles the hover state on the item
  const handleHover = () => setIsHovered(!isHovered);

  // Get background color based on state priority
  const getStateStyle = () => {
    if (isSelected && isHovered) return optionStateStyles.selectedHighlighted;
    if (isSelected) return optionStateStyles.selected;
    if (isHovered) return optionStateStyles.highlighted;
    return optionStateStyles.default;
  };

  return (
    <Element
      as="li"
      // An option has to say it is one. Without the role the listbox announces
      // a list of nothing, and anything that resolves controls by role — a
      // screen reader, voice control, a test driver — cannot reach these at all.
      role="option"
      aria-selected={isSelected}
      // Layout - improved touch targets
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      listStyleType="none"
      // Apply option styles from design tokens
      {...optionStyles}
      {...getStateStyle()}
      // Event handlers
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={(e: React.MouseEvent) => handleOptionClick(e, option.value)}
      // Apply custom props
      {...props}
    >
      <Text
        fontSize={Typography.fontSizes[size]}
        fontWeight={isSelected ? '500' : '400'}
        lineHeight="14px"
        color={isSelected ? 'color-gray-900' : 'color-gray-700'}
        {...style}
      >
        {option.label}
      </Text>
      {/* Selected indicator */}
      {isSelected && (
        <Element
          as="span"
          color="theme-primary"
          fontSize="14px"
          marginLeft={8}
          display="flex"
          alignItems="center"
        >
          ✓
        </Element>
      )}
    </Element>
  );
};
/**
 * SelectBox Component
 *
 * Renders the main select box with selected value(s)
 */
const SelectBox: React.FC<SelectBoxProps> = ({
  size = 'md',
  views = { field: {}, text: {} },
  value,
  isDisabled,
  placeholder,
  removeOption = () => {},
  options,
}) => {
  const fieldView = views?.field || {};
  const textView = views?.text || {};
  const isMultiValue = Array.isArray(value) && value.length > 0;
  /**
   * Styles for the select field
   */
  const fieldStyles = {
    // Layout properties
    margin: 0,
    width: '95%',
    height: '100%',
    border: 'none',
    // No vertical padding here: the field shell above already applies
    // `shellPaddingY` for the current size. Adding 4px on each side on top of
    // it pushed the content box past the shell's `minHeight`, so a `md` Select
    // rendered at 50px while a `md` TextField rendered at the intended 40px —
    // visibly misaligning the two whenever they sit in the same row.
    paddingVertical: 0,
    paddingHorizontal: 0,

    // Typography properties
    fontSize: Typography.fontSizes[size],

    fontWeight: '400', // Regular weight
    // Left to the natural line box, as TextField does. A fixed 20px line-height
    // does not fit the shell it lives in: at `md` the shell is 40px tall with
    // 10px of padding and a 1px border on each side, leaving 18px for content.
    // Hard-coding 20px pushed every Select 2px past its own declared height.
    letterSpacing: '-0.01em', // Slight negative tracking for modern look

    // Visual properties
    color: isDisabled ? 'color-gray-400' : 'color-gray-900',

    // State properties
    cursor: isDisabled ? 'not-allowed' : 'pointer',

    // Animation
    transition: 'all 0.2s ease-in-out',

    // A single-value trigger stays on one line and ellipsises, via `Text`'s own
    // `maxLines`. Without it a long option label wraps, which silently breaks
    // the control's declared height — a `md` Select showing "Uma User's
    // workspace" in a narrow sidebar became two lines tall.
    //
    // `minWidth: 0` is what actually lets it truncate: the trigger is a flex
    // child, and `min-width: auto` would otherwise stop it shrinking below its
    // content, so the clamp would never engage.
    //
    // Multi-select is excluded: its value renders as chips that are meant to
    // wrap, and clamping would hide selections rather than reflow them.
    ...(isMultiValue ? {} : { maxLines: 1, minWidth: 0 }),

    // Apply custom styles
    ...fieldView,
    ...textView,
    style: {
      backgroundColor: 'transparent',
      ...(fieldView as any).style,
      ...(textView as any).style,
    },
  };
  const option: any =
    options.length > 0 && options.find((option) => option.value === value);
  return (
    <Text {...fieldStyles}>
      {/* Check if value is an empty string or if value is an array but with no items, then show placeholder */}
      {(value === '' || (Array.isArray(value) && value.length === 0)) &&
      !!placeholder ? (
        placeholder
      ) : (
        <>
          {/* If value is a string, use the option label or value */}
          {typeof value === 'string' ? (
            (option && option.label) ?? value
          ) : // If value is an array and not empty, render MultiSelect options
          Array.isArray(value) && value.length > 0 ? (
            <Horizontal gap={6}>
              {value.map((option) => (
                <MultiSelect
                  key={option}
                  option={option}
                  removeOption={removeOption}
                />
              ))}
            </Horizontal>
          ) : (
            // Handle any other types of value (including objects or unexpected values)
            <span>{value}</span>
          )}
        </>
      )}
    </Text>
  );
};
const HiddenSelect: React.FC<HiddenSelectProps> = ({
  id,
  name,
  value,
  onChange,
  isMulti = false,
  isDisabled = false,
  isReadOnly = false,
  options = [],
  // Swallowed on purpose. `defaultValue` is the Select's own prop — the state
  // hook has already turned it into the `value` below — but it also rides
  // along in `...props`, and React errors on any <select> carrying both
  // ("Select elements must be either controlled or uncontrolled"). That error
  // fires on every render and fails test runs that treat console.error as
  // fatal, so the element has to be given one or the other, never both.
  defaultValue: _defaultValue,
  ...props
}) => {
  // The hidden <select> is the only path that produced a DOM event where every
  // other path produced a value, so the same `onChange` prop had two different
  // argument shapes depending on which one fired. Normalise here.
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!onChange) return;
    onChange(
      isMulti
        ? Array.from(event.target.selectedOptions, (option) => option.value)
        : event.target.value
    );
  };
  return (
    <Element
      id={id}
      name={name}
      as="select"
      opacity={0}
      width={1}
      height={1}
      overflow="hidden"
      position="absolute"
      pointerEvents="none"
      tabIndex={-1}
      aria-hidden="true"
      value={value}
      disabled={isDisabled}
      readOnly={isReadOnly}
      onChange={handleChange}
      multiple={isMulti}
      {...props}
    >
      {options.length > 0 &&
        options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
    </Element>
  );
};
/**
 * DropDown Component
 *
 * Renders the dropdown list of options for the select component
 */
const DropDown: React.FC<
  DropDownProps & { selectedValue?: string | string[] }
> = ({
  size,
  views = {},
  options,
  callback = () => {},
  highlightedIndex,
  setHighlightedIndex = () => {},
  selectedValue,
}) => {
  const handleCallback = (option: string) => callback(option);

  // Check if an option is selected
  const isOptionSelected = (optionValue: string) => {
    if (Array.isArray(selectedValue)) {
      return selectedValue.includes(optionValue);
    }
    return selectedValue === optionValue;
  };

  return (
    <Element
      as="ul"
      role="listbox"
      display="flex"
      flexDirection="column"
      margin={0}
      padding="4px"
      {...dropdownStyles}
      style={scrollbarStyles}
      {...views?.dropDown}
    >
      {options &&
        options.length > 0 &&
        options.map((option, index) => (
          <Item
            key={option.value}
            size={size}
            style={views['text']}
            option={option}
            callback={handleCallback}
            isSelected={isOptionSelected(option.value)}
            isHovered={index === highlightedIndex}
            setIsHovered={() => {}}
            onMouseEnter={() => setHighlightedIndex(index)}
          />
        ))}
    </Element>
  );
};
/**
 * MultiSelect Component
 *
 * Renders a selected option in a multi-select component
 */
export const MultiSelect: React.FC<MultiSelectProps> = ({
  option,
  size = 'md',
  removeOption = () => {},
  ...props
}) => {
  const handleClick = () => removeOption(option);

  return (
    <Horizontal
      gap={6}
      alignItems="center"
      onClick={(event: any) => event.stopPropagation()}
      {...chipStyles}
      _hover={{
        backgroundColor: 'color-gray-200',
      }}
      {...props}
    >
      <Text
        fontSize={Typography.fontSizes[size]}
        fontWeight="500"
        color="color-gray-700"
      >
        {option}
      </Text>

      <CloseIcon
        role="close-button"
        color="color-gray-500"
        widthHeight={IconSizes[size]}
        onClick={handleClick}
        cursor="pointer"
        transition="all 0.2s ease-in-out"
        _hover={{
          color: 'color-gray-700',
        }}
      />
    </Horizontal>
  );
};
const SelectView: React.FC<SelectViewProps> = ({
  id,
  name,
  label,
  value,
  placeholder,
  helperText,
  hide = false,
  error = false,
  isMulti = false,
  isFocused = false,
  isHovered = false,
  isDisabled = false,
  isReadOnly = false,
  options = [],
  shadow = {},
  size = 'md',
  shape = 'default',
  variant = 'default',
  views = {
    text: {},
    icon: {},
    dropDown: {},
    selectBox: {},
    label: {},
    helperText: {},
  },
  onChange = () => {},
  setHide = () => {},
  setValue = () => {},
  setIsHovered = () => {},
  setIsFocused = () => {},
  setHighlightedIndex,
  highlightedIndex,
  isScrollable,
  // Pulled out so it can name the trigger. It used to fall into `...props`,
  // which never reaches the element a screen reader reads.
  'aria-label': ariaLabel,
  ...props
}) => {
  const {
    ref: triggerRef,
    relation,
    updateRelation,
  } = useElementPosition({
    trackChanges: true,
    trackOnScroll: true,
    trackOnResize: true,
    throttleMs: 10,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get optimal positioning style based on available space
  // Get optimal positioning style based on available space
  const getDropdownStyle = () => {
    if (!triggerRef.current) return {};

    const rect = triggerRef.current.getBoundingClientRect();
    const baseStyle: React.CSSProperties = {
      position: 'fixed',
      left: rect.left,
      width: rect.width,
      zIndex: 10000,
    };

    // Use relation to determine vertical placement if available, otherwise default to bottom
    const isTop = relation?.space?.vertical === 'top';

    if (isTop) {
      return {
        ...baseStyle,
        bottom: window.innerHeight - rect.top + 8, // 8px gap
      };
    } else {
      return {
        ...baseStyle,
        top: rect.bottom + 8, // 8px gap
      };
    }
  };
  // close when *any* other select opens
  React.useEffect(() => {
    const handleCloseAll = () => setHide(true);
    document.addEventListener('closeAllSelects', handleCloseAll);
    return () =>
      document.removeEventListener('closeAllSelects', handleCloseAll);
  }, [setHide]);

  // Add a global click handler to close the dropdown when clicking outside
  React.useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Only close if clicking outside of this specific select component
      if (!target.closest(`#${id}`) && !hide) {
        setHide(true);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [id, hide, setHide]);
  const handleHover = () => setIsHovered(!isHovered);
  const handleFocus = () => setIsFocused(true);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // tell all other selects to close
    document.dispatchEvent(new Event('closeAllSelects'));

    if (event && event.stopPropagation) event.stopPropagation();

    // Toggle dropdown visibility
    const newHideState = !hide;
    setHide(newHideState);
    setIsFocused(!newHideState); // Set focus state based on dropdown visibility
  };
  const handleCallback = useCallback(
    (option: string) => {
      // Close dropdown after selection
      setHide(true);

      // Tell all other selects to close
      document.dispatchEvent(new Event('closeAllSelects'));

      // Update value based on multi-select or single-select mode.
      // `onChange` reports the *next* selection, not the option that was
      // clicked: a controlled parent has to be able to store what it gets
      // back, and for a multi-select that is the whole array.
      if (isMulti && Array.isArray(value)) {
        if (!value.includes(option)) {
          const newValue = [...value, option];
          setValue(newValue);
          if (onChange) onChange(newValue);
        }
      } else {
        setValue(option);
        if (onChange) onChange(option);
      }

      // Set focus to indicate selection
      setIsFocused(true);
    },
    [isMulti, value, setHide, setValue, onChange, setIsFocused]
  );
  const handleRemoveOption = (valueOption: string) => {
    if (Array.isArray(value) && value.includes(valueOption)) {
      const newValue = value.filter((option) => option !== valueOption);
      setValue(newValue);
      // Removing a chip is a change like any other. Without this the parent of
      // a controlled multi-select never hears about it, so the chip comes
      // straight back on the next render.
      if (onChange) onChange(newValue);
    }
  };
  const showLabel = !!label;
  const layoutViews = withoutFieldShellView(views);

  return (
    <FieldContainer
      ref={triggerRef as React.RefObject<HTMLDivElement>}
      position="relative"
      width="100%"
      display="inline-block"
      id={id}
      // `SelectBox` is not an ARIA role, so the trigger was exposed as a plain
      // container: not focusable, not announced, and operable only by mouse.
      // The native `<select>` behind it is `aria-hidden` and `tabIndex={-1}`, so
      // there was no keyboard path to this control at all.
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={!hide}
      aria-label={ariaLabel ?? (typeof label === 'string' ? label : undefined)}
      aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled || isReadOnly ? -1 : 0}
      helperText={helperText}
      error={error}
      views={layoutViews}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (isDisabled || isReadOnly) return;

        // Enter, Space and Down open the list; Escape closes it. The same keys a
        // native select answers to, so nobody has to learn this one separately.
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          if (hide) {
            document.dispatchEvent(new Event('closeAllSelects'));
            setHide(false);
            setIsFocused(true);
          }
          return;
        }

        if (e.key === 'Escape' && !hide) {
          e.preventDefault();
          setHide(true);
        }
      }}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        // Stop propagation to prevent clicks from bubbling up
        e.stopPropagation();

        // Only handle click if not disabled or readonly
        if (!(isDisabled || isReadOnly)) {
          handleClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
        }
      }}
    >
      <FieldContent
        label={label}
        size={size}
        error={error}
        shape={shape}
        views={views}
        shadow={shadow}
        variant={variant}
        value={value}
        color={'theme-primary'}
        isHovered={isHovered}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isFocused={isFocused}
        showLabel={showLabel}
        // Sizing comes from FieldContent's shared scale (`Input/fieldSizes`).
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        position="relative"
        {...views?.content}
      >
        <FieldWrapper>
          {showLabel && (
            <FieldLabel
              htmlFor={id}
              color={'theme-primary'}
              error={error}
              {...views?.label}
            >
              {label}
            </FieldLabel>
          )}
          <HiddenSelect
            id={id}
            name={name}
            options={options}
            onChange={onChange}
            value={value}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            isMulti={isMulti}
            onFocus={handleFocus}
            {...props}
          />
          <SelectBox
            options={options}
            size={size}
            views={views}
            value={value}
            isDisabled={isDisabled}
            placeholder={placeholder}
            removeOption={handleRemoveOption}
          />
        </FieldWrapper>
        <FieldIcons>
          {!isReadOnly && !isDisabled && (
            <Element
              display="flex"
              alignItems="center"
              justifyContent="center"
              style={hide ? chevronAnimation.closed : chevronAnimation.open}
            >
              <ChevronIcon
                color="inherit"
                widthHeight={IconSizes[size]}
                style={views.icon}
                orientation="down"
              />
            </Element>
          )}
        </FieldIcons>
        {!hide && options.length > 0 && (
          <Portal>
            <Element
              ref={dropdownRef}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              style={{
                ...getDropdownStyle(),
                ...dropdownAnimation.enter,
              }}
            >
              <DropDown
                size={size}
                views={views}
                options={options}
                callback={handleCallback}
                highlightedIndex={highlightedIndex}
                setHighlightedIndex={setHighlightedIndex}
                selectedValue={value}
              />
            </Element>
          </Portal>
        )}
      </FieldContent>
    </FieldContainer>
  );
};
export default SelectView;
