import React, { createContext, useContext, useRef, useEffect } from 'react';
import { FormikConfig, useFormikContext } from 'formik';
import { Form as $Form } from 'app-studio';

interface CustomFormProps<T> extends FormikConfig<T> {
  autoFocus?: boolean;
  initFocus?: string;
}

interface FocusContextType {
  active: boolean;
  focusNextInput: (name: string) => void;
  setInputRef: (name: string, ref: HTMLInputElement | null) => void;
  handleSubmitEditing: (name: string) => void;
  getReturnKeyType: (name: string) => 'next' | 'done';
}

interface CustomFormProps<T> extends FormikConfig<T> {
  autoFocus?: boolean;
  initFocus?: string;
}

interface FocusContextType {
  active: boolean;
  focusNextInput: (name: string) => void;
  setInputRef: (name: string, ref: HTMLInputElement | null) => void;
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
  ...props
}: CustomFormProps<T> & any) => {
  const formik: any = useFormikContext();
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const inputNames = useRef<string[]>([]);

  const setInputRef = (name: string, ref: HTMLInputElement | null) => {
    inputRefs.current[name] = ref;
    if (!inputNames.current.includes(name)) {
      inputNames.current.push(name);
    }
  };

  const focusNextInput = (currentName: string) => {
    if (autoFocus) {
      const currentIndex = inputNames.current.indexOf(currentName);
      const nextIndex = currentIndex + 1;
      if (nextIndex < inputNames.current.length) {
        inputRefs.current[inputNames.current[nextIndex]]?.focus();
      } else if (formik.onSubmit) {
        formik.onSubmit(formik.values);
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
