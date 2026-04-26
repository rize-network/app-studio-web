import {
  useState,
  useRef,
  useEffect,
  useCallback,
  ClipboardEvent,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { OTPInputProps } from './OTPInput.props';
import { syncTimeouts } from './sync-timeouts';
// This file defines the `useOTPInputState` custom React hook, which centralizes all state management, refs, and event handlers for the OTPInput component. It encompasses logic for controlled/uncontrolled value handling, input focus and blur, selection management, paste operations, and validation.
export const useOTPInputState = ({
  value: controlledValue,
  defaultValue = '',
  length = 6,
  onChange,
  onChangeText,
  onComplete,
  onKeyDown,
  onKeyPress,
  onBlur,
  onFocus,
  isReadOnly,
  isDisabled,
  pattern,
  stepValues,
  pasteTransformer,
}: OTPInputProps) => {
  const isControlled = controlledValue !== undefined;
  const initialValue = isControlled ? controlledValue : defaultValue;
  const [value, setInternalValue] = useState<string>(
    initialValue?.slice(0, length) || ''
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mirrorSelectionStart, setMirrorSelectionStart] = useState<
    number | null
  >(null);
  const [mirrorSelectionEnd, setMirrorSelectionEnd] = useState<number | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialLoadRef = useRef({
    value,
    onChange: onChange || (() => {}),
    isIOS:
      typeof window !== 'undefined' &&
      window?.CSS?.supports?.('-webkit-touch-callout', 'none'),
  });
  const inputMetadataRef = useRef<{
    prev: [number | null, number | null, 'none' | 'forward' | 'backward'];
  }>({
    prev: [null, null, 'none' as 'none' | 'forward' | 'backward'],
  });
  const regexp = pattern
    ? typeof pattern === 'string'
      ? new RegExp(pattern)
      : pattern
    : null;
  useEffect(() => {
    if (isControlled && controlledValue !== value) {
      setInternalValue(controlledValue?.slice(0, length) || '');
    }
  }, [isControlled, controlledValue, length, value]);
  const setValue = useCallback(
    (newValue: string) => {
      let valueToSet = newValue;
      if (stepValues && stepValues.length > 0 && newValue) {
        const numValue = parseInt(newValue, 10);
        if (!isNaN(numValue)) {
          let closest = stepValues[0];
          let minDiff = Math.abs(numValue - closest);
          for (let i = 1; i < stepValues.length; i++) {
            const diff = Math.abs(numValue - stepValues[i]);
            if (diff < minDiff) {
              minDiff = diff;
              closest = stepValues[i];
            }
          }
          valueToSet = closest.toString();
        }
      }
      setInternalValue(valueToSet);
      if (onChange) {
        onChange(valueToSet);
      }
      if (onChangeText) {
        onChangeText(valueToSet);
      }
      if (onComplete && valueToSet.length === length) {
        onComplete(valueToSet);
      }
    },
    [onChange, onChangeText, onComplete, length, stepValues]
  );
  const setInputRef = useCallback((ref: HTMLInputElement | null) => {
    if (ref && inputRef.current !== ref) {
      Object.defineProperty(inputRef, 'current', {
        value: ref,
        writable: true,
      });
    }
  }, []);
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value.slice(0, length);
      if (newValue.length > 0 && regexp && !regexp.test(newValue)) {
        e.preventDefault();
        return;
      }
      setValue(newValue);
      if (inputRef.current) {
        inputRef.current.value = newValue;
      }
    },
    [length, regexp, setValue, inputRef]
  );
  const handleFocus = useCallback(() => {
    if (inputRef.current) {
      const start = Math.min(inputRef.current.value.length, length - 1);
      const end = inputRef.current.value.length;
      inputRef.current?.setSelectionRange(start, end);
      setMirrorSelectionStart(start);
      setMirrorSelectionEnd(end);
    }
    setIsFocused(true);
  }, [length]);
  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);
  const handleKeyDown = useCallback((_: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(_);
    }
  }, []);
  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyPress) {
      onKeyPress(e);
    }
  }, []);
  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      const input = inputRef.current;
      if (!e.clipboardData || !input) {
        return;
      }
      const _content = e.clipboardData.getData('text/plain');
      const content = pasteTransformer ? pasteTransformer(_content) : _content;
      e.preventDefault();
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const isReplacing = start !== end;
      const newValueUncapped = isReplacing
        ? value.slice(0, start) + content + value.slice(end)
        : value.slice(0, start) + content + value.slice(start);
      const newValue = newValueUncapped.slice(0, length);
      if (newValue.length > 0 && regexp && !regexp.test(newValue)) {
        return;
      }
      input.value = newValue;
      setValue(newValue);
      setInternalValue(newValue);
      const _start = Math.min(newValue.length, length - 1);
      const _end = newValue.length;
      input.setSelectionRange(_start, _end);
      setMirrorSelectionStart(_start);
      setMirrorSelectionEnd(_end);
    },
    [length, pasteTransformer, regexp, setValue, value, setInternalValue]
  );
  useEffect(() => {
    const input = inputRef.current;
    const container = containerRef.current;
    if (!input || !container) {
      return;
    }
    if (
      initialLoadRef.current.value !== input.value &&
      initialLoadRef.current.onChange
    ) {
      initialLoadRef.current.onChange(input.value);
    }
    inputMetadataRef.current.prev = [
      input.selectionStart,
      input.selectionEnd,
      input.selectionDirection as 'none' | 'forward' | 'backward',
    ];
    function onDocumentSelectionChange() {
      if (document.activeElement !== input) {
        setMirrorSelectionStart(null);
        setMirrorSelectionEnd(null);
        return;
      }
      const _s = input?.selectionStart ?? null;
      const _e = input?.selectionEnd ?? null;
      const _dir = input?.selectionDirection ?? null;
      const _ml = input?.maxLength ?? 0;
      const _val = input?.value ?? '';
      const _prev = inputMetadataRef.current.prev;
      let start = -1;
      let end = -1;
      let direction: 'forward' | 'backward' | 'none' = 'none';
      if (_val.length !== 0 && _s !== null && _e !== null) {
        const isSingleCaret = _s === _e;
        const isInsertMode = _s === _val.length && _val.length < _ml;
        if (isSingleCaret && !isInsertMode) {
          const c = _s;
          if (c === 0) {
            start = 0;
            end = 1;
            direction = 'forward';
          } else if (c === _ml) {
            start = c - 1;
            end = c;
            direction = 'backward';
          } else if (_ml > 1 && _val.length > 1) {
            let offset = 0;
            if (_prev[0] !== null && _prev[1] !== null) {
              direction = c < _prev[1] ? 'backward' : 'forward';
              const wasPreviouslyInserting =
                _prev[0] === _prev[1] && _prev[0] < _ml;
              if (direction === 'backward' && !wasPreviouslyInserting) {
                offset = -1;
              }
            }
            start = offset + c;
            end = offset + c + 1;
          }
        }
        if (start !== -1 && end !== -1 && start !== end && inputRef.current) {
          inputRef.current.setSelectionRange(start, end, direction);
        }
      }
      const s = start !== -1 ? start : _s;
      const e = end !== -1 ? end : _e;
      const dir = direction !== 'none' ? direction : _dir;
      setMirrorSelectionStart(s);
      setMirrorSelectionEnd(e);
      inputMetadataRef.current.prev = [
        s,
        e,
        dir as 'none' | 'forward' | 'backward',
      ];
    }
    document.addEventListener('selectionchange', onDocumentSelectionChange, {
      capture: true,
    });
    onDocumentSelectionChange();
    document.activeElement === input && setIsFocused(true);
    const updateRootHeight = () => {
      if (container) {
        container.style.setProperty('--root-height', `${input.clientHeight}px`);
      }
    };
    updateRootHeight();
    const resizeObserver = new (window as any).ResizeObserver(updateRootHeight);
    resizeObserver.observe(input);
    return () => {
      document.removeEventListener(
        'selectionchange',
        onDocumentSelectionChange,
        { capture: true }
      );
      resizeObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    syncTimeouts(() => {
      inputRef.current?.dispatchEvent(new Event('input'));
      const s = inputRef.current?.selectionStart;
      const e = inputRef.current?.selectionEnd;
      const dir = inputRef.current?.selectionDirection;
      if (s !== null && e !== null && s !== undefined && e !== undefined) {
        setMirrorSelectionStart(s);
        setMirrorSelectionEnd(e);
        inputMetadataRef.current.prev = [
          s,
          e,
          (dir as 'none' | 'forward' | 'backward') || 'none',
        ];
      }
    });
  }, [value, isFocused]);
  return {
    value,
    setValue,
    isFocused,
    setIsFocused,
    isHovered,
    setIsHovered,
    inputRef,
    containerRef,
    mirrorSelectionStart,
    mirrorSelectionEnd,
    setMirrorSelectionStart,
    setMirrorSelectionEnd,
    setInputRef,
    handleChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleKeyPress,
    handlePaste,
  };
};
