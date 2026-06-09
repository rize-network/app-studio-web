import React, { createContext, useEffect } from 'react';
import { Input, Horizontal, View, Text } from 'app-studio';
import { FieldContainer } from '../../Input/FieldContainer/FieldContainer';
import { FieldLabel } from '../../Input/FieldLabel/FieldLabel';
import { OTPInputViewProps } from './OTPInput.props';

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

  const slots = Array.from({ length }).map((_, idx) => ({
    char: value[idx] ?? null,
    placeholderChar: value[0] !== undefined ? null : placeholder?.[idx] ?? null,
    isActive: isFocused && idx === value.length,
  }));

  return (
    <FieldContainer
      helperText={helperText}
      error={error}
      views={views}
      {...(props as any)}
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
        <View
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0}
        >
          <Input
            ref={(ref: any) => setInputRef(ref)}
            id={id || name}
            name={name}
            // RN-only typed props (keyboardType, maxLength, editable,
            // secureTextEntry) aren't on app-studio's web Input type — pass
            // them via a single any-cast.
            {...({
              keyboardType: type !== 'password' ? 'number-pad' : undefined,
              maxLength: length,
              editable: !isReadOnly && !isDisabled,
              secureTextEntry: type === 'password' || secureTextEntry,
            } as any)}
            value={value}
            onChange={handleChange}
            onChangeText={(text: string) =>
              handleChange({ target: { value: text } } as any)
            }
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...views.input}
          />
        </View>
      </View>
    </FieldContainer>
  );
};
export default OTPInputView;
