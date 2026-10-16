import React, { createContext, useEffect } from 'react';
import { Input, Horizontal, View, Text } from 'app-studio';
import { FieldContainer } from '../../Input/FieldContainer/FieldContainer';
import { FieldLabel } from '../../Input/FieldLabel/FieldLabel';
import { OTPInputViewProps } from './OTPInput.props';

const logOTPInput = (message: string, payload: Record<string, unknown>) => {
  console.log(`[OTPInput.native] ${message}`, payload);
};

const summarizeValue = (value: unknown) => {
  if (value === null || value === undefined) return value;
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return value;
  }
  return Object.prototype.toString.call(value);
};

const getContainerProps = (props: Record<string, unknown>) => {
  const {
    onChange,
    onChangeText,
    onComplete,
    onKeyDown,
    onKeyPress,
    onFocus,
    onBlur,
    onClick,
    defaultValue,
    pattern,
    pasteTransformer,
    stepValues,
    setValue,
    setIsFocused,
    setIsHovered,
    mirrorSelectionStart,
    mirrorSelectionEnd,
    setMirrorSelectionStart,
    setMirrorSelectionEnd,
    handlePaste,
    handleKeyPress,
    shadow,
    shape,
    variant,
    inputMode,
    autoComplete,
    autoCorrect,
    autoCapitalize,
    keyboardType,
    maxLength,
    editable,
    caretHidden,
    selectionColor,
    ...containerProps
  } = props;

  return containerProps;
};

export const OTPInputContext = createContext<{
  slots: Array<{
    char: string | null;
    placeholderChar: string | null;
    isActive: boolean;
    hasFakeCaret: boolean;
  }>;
  isFocused: boolean;
  isHovering: boolean;
}>({ slots: [], isFocused: false, isHovering: false });

const OTPInputView: React.FC<
  OTPInputViewProps & {
    setInputRef: (ref: any) => void;
    inputRef: React.RefObject<any>;
    containerRef: React.RefObject<any>;
    mirrorSelectionStart: number | null;
    mirrorSelectionEnd: number | null;
    setMirrorSelectionStart: (value: number | null) => void;
    setMirrorSelectionEnd: (value: number | null) => void;
    handlePaste: (e: any) => void;
    handleChange: (e: any) => void;
    handleFocus: () => void;
    handleBlur: () => void;
    handleKeyDown: (e: any) => void;
    stepValues?: number[];
    handleKeyPress: (e: any) => void;
  }
> = ({
  id,
  name,
  label,
  value = '',
  length = 6,
  placeholder = '',
  views = {},
  size = 'md',
  gap = 8,
  type = 'text',
  error = false,
  isFocused = false,
  isHovered = false,
  isDisabled = false,
  isReadOnly = false,
  isAutoFocus = false,
  helperText,
  inputRef,
  containerRef,
  handleChange,
  handleFocus,
  handleBlur,
  handleKeyDown,
  secureTextEntry,
  setInputRef,
  ...props
}) => {
  const showLabel = !!label;
  useEffect(() => {
    if (isAutoFocus && inputRef.current && inputRef.current.focus) {
      inputRef.current.focus();
    }
  }, [isAutoFocus, inputRef]);

  const slotHeight =
    size === 'xs'
      ? 32
      : size === 'sm'
      ? 36
      : size === 'md'
      ? 40
      : size === 'lg'
      ? 48
      : 56;

  // Defensive: never let a non-string value (e.g. a stray event object) turn
  // into "[object Object]" across the slots — used by both the plain OTPInput
  // and the Formik wrapper, whose field value may briefly be a non-string.
  const safeValue =
    typeof value === 'string' && value !== '[object Object]' ? value : '';
  const slots = Array.from({ length }).map((_, idx) => ({
    char: safeValue[idx] ?? null,
    placeholderChar:
      safeValue[0] !== undefined ? null : placeholder?.[idx] ?? null,
    isActive: isFocused && idx === safeValue.length,
  }));
  const containerProps = getContainerProps(props as Record<string, unknown>);
  logOTPInput('render slots', {
    id,
    name,
    rawValue: summarizeValue(value),
    safeValue,
    length,
    slotChars: slots.map((slot) => slot.char),
    isFocused,
    isDisabled,
    isReadOnly,
  });

  return (
    <FieldContainer
      helperText={helperText}
      error={error}
      views={views}
      {...(containerProps as any)}
    >
      {showLabel && (
        <FieldLabel
          htmlFor={id}
          color={'theme-primary'}
          error={error}
          {...views.label}
        >
          {label}
        </FieldLabel>
      )}
      <View ref={containerRef} position="relative">
        <Horizontal
          gap={gap}
          width="100%"
          justifyContent="center"
          minHeight={slotHeight}
          {...views.container}
        >
          {slots.map((slot, index) => (
            <View
              key={`${id || name}-${index}`}
              width={slotHeight}
              height={slotHeight}
              borderWidth={1}
              borderStyle="solid"
              borderColor={slot.isActive ? 'theme-primary' : 'color-gray-300'}
              borderRadius={6}
              alignItems="center"
              justifyContent="center"
              backgroundColor="color-white"
            >
              {slot.char ? (
                <Text
                  color="color-gray-900"
                  fontSize={
                    size === 'xs'
                      ? 14
                      : size === 'sm'
                      ? 16
                      : size === 'md'
                      ? 18
                      : size === 'lg'
                      ? 20
                      : 24
                  }
                  fontWeight="500"
                  {...views.text}
                >
                  {type === 'password' || secureTextEntry ? '•' : slot.char}
                </Text>
              ) : slot.placeholderChar ? (
                <Text color="color-gray-400" {...views.text}>
                  {slot.placeholderChar}
                </Text>
              ) : null}
            </View>
          ))}
        </Horizontal>
        {/* Transparent TextInput overlaying the slots: it must FILL the slot
            row (not collapse to a tiny default-height box) so tapping anywhere
            on the slots focuses it and opens the keyboard. The characters are
            rendered in the slots above, so the real input stays invisible
            (transparent text/caret) while remaining interactive. */}
        <Input
          ref={(ref: any) => setInputRef(ref)}
          id={id || name}
          name={name}
          {...views.input}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          width="100%"
          height="100%"
          backgroundColor="transparent"
          color="transparent"
          textAlign="center"
          // RN-only typed props (keyboardType, maxLength, editable,
          // secureTextEntry, caretHidden) aren't on app-studio's web Input
          // type — pass them via a single any-cast.
          {...({
            keyboardType: type !== 'password' ? 'number-pad' : undefined,
            maxLength: length,
            editable: !isReadOnly && !isDisabled,
            secureTextEntry: type === 'password' || secureTextEntry,
            caretHidden: true,
            selectionColor: 'transparent',
          } as any)}
          value={safeValue}
          // Use onChangeText (plain string) ONLY. Passing onChange too made the
          // native change-event object leak into the value ("[object Object]").
          // Coerce defensively in case a host wraps it in an event-like object.
          onChangeText={(text: any) => {
            const normalizedText =
              typeof text === 'string'
                ? text
                : text?.nativeEvent?.text ?? text?.target?.value ?? '';
            logOTPInput('onChangeText', {
              id,
              name,
              rawText: summarizeValue(text),
              normalizedText,
            });
            handleChange(normalizedText);
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    </FieldContainer>
  );
};
export default OTPInputView;
