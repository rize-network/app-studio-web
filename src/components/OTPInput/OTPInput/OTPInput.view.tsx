import React, { useEffect, createContext } from 'react';
import { Input, useTheme } from 'app-studio';
import { FieldContainer } from '../../Input/FieldContainer/FieldContainer';
import { FieldContent } from '../../Input/FieldContent/FieldContent';
import { FieldLabel } from '../../Input/FieldLabel/FieldLabel';
import { Horizontal } from 'app-studio';
import { View } from 'app-studio';
import { OTPInputViewProps } from './OTPInput.props';

// Create a context for OTP input slots
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

// CSS for noscript fallback
const NOSCRIPT_CSS_FALLBACK = `
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

[data-input-otp] {
  --nojs-bg: white !important;
  --nojs-fg: black !important;

  background-color: var(--nojs-bg) !important;
  color: var(--nojs-fg) !important;
  caret-color: var(--nojs-fg) !important;
  letter-spacing: .25em !important;
  text-align: center !important;
  border: 1px solid var(--nojs-fg) !important;
  border-radius: 4px !important;
  width: 100% !important;
}
`;

// Helper function to safely insert CSS rules
function safeInsertRule(sheet: CSSStyleSheet, rule: string) {
  try {
    sheet.insertRule(rule);
  } catch {
    console.error('input-otp could not insert CSS rule:', rule);
  }
}

const OTPInputView: React.FC<
  OTPInputViewProps & {
    setInputRef: (ref: HTMLInputElement | null) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    containerRef: React.RefObject<HTMLDivElement>;
    mirrorSelectionStart: number | null;
    mirrorSelectionEnd: number | null;
    setMirrorSelectionStart: (value: number | null) => void;
    setMirrorSelectionEnd: (value: number | null) => void;
    handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFocus: () => void;
    handleBlur: () => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    stepValues?: number[];
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  }
> = ({
  id,
  name,
  label,
  value = '',
  length = 6,
  onChange,
  onChangeText,
  onComplete,
  helperText,
  placeholder = '',
  shadow,
  views = {},
  size = 'md',
  shape = 'rounded',
  variant = 'outline',
  gap = 8,
  type = 'text',
  error = false,
  isFocused = false,
  isHovered = false,
  isDisabled = false,
  isReadOnly = false,
  isAutoFocus = false,
  setValue,
  setIsFocused,
  setIsHovered,
  inputRef,
  containerRef,
  mirrorSelectionStart,
  mirrorSelectionEnd,
  setMirrorSelectionStart,
  setMirrorSelectionEnd,
  handlePaste,
  handleChange,
  handleFocus,
  handleBlur,
  handleKeyDown,
  handleKeyPress,
  secureTextEntry,
  isFirstColumn,
  stepValues,
  setInputRef,
  onBlur = () => {},
  onClick = () => {},
  onFocus = () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props
}) => {
  useTheme(); // Initialize theme context
  const showLabel = !!label;

  // Create context value for slots
  const contextValue = React.useMemo(() => {
    return {
      slots: Array.from({ length }).map((_, slotIdx) => {
        const isActive =
          isFocused &&
          mirrorSelectionStart !== null &&
          mirrorSelectionEnd !== null &&
          ((mirrorSelectionStart === mirrorSelectionEnd &&
            slotIdx === mirrorSelectionStart) ||
            (slotIdx >= mirrorSelectionStart && slotIdx < mirrorSelectionEnd));

        const char = value[slotIdx] !== undefined ? value[slotIdx] : null;
        const placeholderChar =
          value[0] !== undefined ? null : placeholder?.[slotIdx] ?? null;

        return {
          char,
          placeholderChar,
          isActive,
          hasFakeCaret: isActive && char === null,
        };
      }),
      isFocused,
      isHovering: !isDisabled && isHovered,
    };
  }, [
    isFocused,
    isHovered,
    isDisabled,
    length,
    mirrorSelectionEnd,
    mirrorSelectionStart,
    placeholder,
    value,
  ]);

  // Auto-focus the input on mount
  useEffect(() => {
    if (isAutoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAutoFocus, inputRef]);

  // Add CSS styles for OTP input
  useEffect(() => {
    if (!document.getElementById('input-otp-style')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'input-otp-style';
      document.head.appendChild(styleEl);

      if (styleEl.sheet) {
        const autofillStyles =
          'background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;';

        // Add blink animation
        safeInsertRule(
          styleEl.sheet,
          `@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`
        );

        safeInsertRule(
          styleEl.sheet,
          '[data-input-otp]::selection { background: transparent !important; color: transparent !important; }'
        );
        safeInsertRule(
          styleEl.sheet,
          `[data-input-otp]:autofill { ${autofillStyles} }`
        );
        safeInsertRule(
          styleEl.sheet,
          `[data-input-otp]:-webkit-autofill { ${autofillStyles} }`
        );
        // iOS
        safeInsertRule(
          styleEl.sheet,
          `@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }`
        );
        // PWM badges
        safeInsertRule(
          styleEl.sheet,
          `[data-input-otp] + * { pointer-events: all !important; }`
        );
      }
    }
  }, []);

  // Render the OTP input slots
  const renderSlots = () => {
    return (
      <Horizontal
        gap={gap}
        width="100%"
        justifyContent="center"
        minHeight={
          size === 'xs'
            ? '32px'
            : size === 'sm'
            ? '36px'
            : size === 'md'
            ? '40px'
            : size === 'lg'
            ? '48px'
            : '56px'
        }
        {...views.container}
      >
        {contextValue.slots.map((slot, index) => (
          <FieldContent
            key={`${id || name}-${index}`}
            size={size}
            error={error}
            shape={shape}
            views={views}
            variant={variant}
            value={slot.char || ''}
            color={'theme.primary'}
            isHovered={isHovered}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            isFocused={slot.isActive}
            showLabel={false}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            justifyContent="center"
            alignItems="center"
            width="100%"
            position="relative"
            height={
              size === 'xs'
                ? '32px'
                : size === 'sm'
                ? '36px'
                : size === 'md'
                ? '40px'
                : size === 'lg'
                ? '48px'
                : '56px'
            }
            {...views.container}
          >
            {slot.char ? (
              <View
                textAlign="center"
                fontSize={
                  size === 'xs'
                    ? '14px'
                    : size === 'sm'
                    ? '16px'
                    : size === 'md'
                    ? '18px'
                    : size === 'lg'
                    ? '20px'
                    : '24px'
                }
                fontWeight="medium"
                {...views.text}
              >
                {type === 'password' ? '•' : slot.char}
              </View>
            ) : slot.placeholderChar ? (
              <View
                textAlign="center"
                fontSize={
                  size === 'xs'
                    ? '14px'
                    : size === 'sm'
                    ? '16px'
                    : size === 'md'
                    ? '18px'
                    : size === 'lg'
                    ? '20px'
                    : '24px'
                }
                color="color.gray.400"
                opacity={0.5}
                {...views.text}
              >
                {slot.placeholderChar}
              </View>
            ) : null}
            {slot.hasFakeCaret && (
              <View
                position="absolute"
                width="2px"
                height="60%"
                backgroundColor="theme.primary"
                animation="blink 1s step-start infinite"
                style={{
                  animationName: 'blink',
                  animationDuration: '1s',
                  animationIterationCount: 'infinite',
                  animationTimingFunction: 'step-start',
                }}
              />
            )}
          </FieldContent>
        ))}
      </Horizontal>
    );
  };

  // Input style for the hidden input
  const inputStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    textAlign: 'center',
    opacity: '1',
    color: 'transparent',
    pointerEvents: 'all',
    background: 'transparent',
    caretColor: 'transparent',
    border: '0 solid transparent',
    outline: '0 solid transparent',
    boxShadow: 'none',
    lineHeight: '1',
    letterSpacing: '-.5em',
    fontSize: 'var(--root-height)',
    fontFamily: 'monospace',
    fontVariantNumeric: 'tabular-nums',
  };

  return (
    <>
      <noscript>
        <style>{NOSCRIPT_CSS_FALLBACK}</style>
      </noscript>

      <FieldContainer
        helperText={helperText}
        error={error}
        views={views}
        {...props}
      >
        {showLabel && (
          <FieldLabel
            htmlFor={id}
            color={'theme.primary'}
            error={error}
            {...views.label}
          >
            {label}
          </FieldLabel>
        )}

        <View
          ref={containerRef}
          data-input-otp-container
          position="relative"
          cursor={isDisabled ? 'default' : 'text'}
          userSelect="none"
          pointerEvents="none"
        >
          <OTPInputContext.Provider value={contextValue}>
            {renderSlots()}
          </OTPInputContext.Provider>

          <View position="absolute" inset={0} pointerEvents="none">
            <Input
              ref={(ref) => setInputRef(ref as any)}
              data-input-otp
              data-input-otp-placeholder-shown={value.length === 0 || undefined}
              data-input-otp-mss={mirrorSelectionStart}
              data-input-otp-mse={mirrorSelectionEnd}
              id={id || name}
              name={name}
              type={type === 'password' ? 'password' : 'text'}
              inputMode={type !== 'password' ? 'numeric' : undefined}
              pattern="[0-9]*"
              maxLength={length}
              readOnly={isReadOnly}
              disabled={isDisabled}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onClick={onClick}
              onMouseOver={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              autoComplete="one-time-code"
              aria-label={`OTP input with ${length} digits`}
              style={inputStyle}
              {...views.input}
            />
          </View>
        </View>
      </FieldContainer>
    </>
  );
};

export default OTPInputView;
