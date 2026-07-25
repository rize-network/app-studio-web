import React, { createContext, useContext, useRef, useEffect } from 'react';
import { FormikConfig, useFormikContext } from 'formik';
import { Form as $Form } from 'app-studio';

export const debounce: (...args: any) => void = (
  func: (...args: any) => void,
  timeout = 300
) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

interface CustomFormProps<T> extends FormikConfig<T> {
  autoFocus?: boolean;
  initFocus?: string;
}

// A focusable input node — a web `HTMLInputElement` or a React Native
// `TextInput` instance. Both expose a `.focus()` method, which is all the
// focus chain relies on, so the registry is platform-agnostic.
type FocusableInput = { focus: () => void } | null;

interface FocusContextType {
  active: boolean;
  focusNextInput: (name: string) => void;
  setInputRef: (name: string, ref: FocusableInput) => void;
  handleSubmitEditing: (name: string) => void;
  getReturnKeyType: (name: string) => 'next' | 'done';
}

const FocusContext = createContext<FocusContextType>({
  active: false,
  focusNextInput: () => {},
  setInputRef: () => {},
  handleSubmitEditing: () => {},
  getReturnKeyType: () => 'next',
});

export const useFormFocus = () => useContext(FocusContext);

export const FormikForm = <T extends {}>({
  children,
  autoFocus = false,
  initFocus,
  onChange = () => {},
  ...props
}: CustomFormProps<T> & any) => {
  const formik: any = useFormikContext();
  useEffect(() => {
    onChange(formik.values);
  }, [formik.values]);

  const inputRefs = useRef<Record<string, FocusableInput>>({});
  const inputNames = useRef<string[]>([]);

  const setInputRef = (name: string, ref: FocusableInput) => {
    inputRefs.current[name] = ref;
    if (ref && !inputNames.current.includes(name)) {
      inputNames.current.push(name);
    }
  };

  const focusNextInput = (currentName: string) => {
    if (autoFocus) {
      const currentIndex = inputNames.current.indexOf(currentName);
      const nextIndex = currentIndex + 1;
      if (nextIndex < inputNames.current.length) {
        inputRefs.current[inputNames.current[nextIndex]]?.focus();
      } else {
        // Last field: submit. `useFormikContext` exposes `submitForm`, not the
        // raw `onSubmit` handler — calling the latter (undefined) silently did
        // nothing, so the final Return/Done key never submitted.
        formik.submitForm?.();
      }
    }
  };

  const contextValue = {
    active: autoFocus,
    focusNextInput,
    setInputRef,
    handleSubmitEditing: focusNextInput,
    getReturnKeyType: (name: string) =>
      inputNames.current.indexOf(name) === inputNames.current.length - 1
        ? 'done'
        : 'next',
  };

  useEffect(() => {
    if (autoFocus) {
      if (initFocus && inputRefs.current[initFocus]) {
        inputRefs.current[initFocus]?.focus();
      } else if (inputNames.current[0]) {
        inputRefs.current[inputNames.current[0]]?.focus();
      }
    }
  }, [autoFocus, initFocus]);

  return (
    <FocusContext.Provider value={contextValue}>
      <$Form {...props}>{children}</$Form>
    </FocusContext.Provider>
  );
};
