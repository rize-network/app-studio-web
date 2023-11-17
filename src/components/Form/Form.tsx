import React, { createContext, useContext, useRef, useEffect } from 'react';
import { Formik, Form as FormikForm, FormikConfig,useFormikContext, FormikValues } from 'formik';

export * from './Checkbox/Checkbox';
export * from './DatePicker/DatePicker';
export * from './Label/Label';
export * from './CountryPicker/CountryPicker';
export * from './Select/Select';
export * from './Switch/Switch';
export * from './TextArea/TextArea';
export * from './TextField/TextField';
export * from './Password/Password';

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


const getInputTypeProps = (type: string) => {
  switch (type) {
    case 'email':
      return {
        autoCorrect: false,
        keyboardType: 'email-address',
        autoCapitalize: 'none',
      };
    case 'password':
      return {
        autoCorrect: false,
        secureTextEntry: true,
        autoCapitalize: 'none',
      };
    case 'digits':
      return {
        keyboardType: 'phone-pad',
      };
    case 'name':
      return {
        autoCorrect: false,
      };
    default:
      return {};
  }
};

export const useFormikInput = ({ name, type, ...props }: any) => {
  const focus = useContext(FocusContext);
  const { touched, errors, submitCount, values, setFieldTouched, setFieldValue } = useFormikContext<FormikValues>();
  const error = touched[name] || submitCount > 0 ? errors[name] : undefined;


  const onChangeText = (text: string) => {
    setFieldValue(name, text);
    props.onChangeText?.(text);

  };

  const onChange = (text: string) => {
    setFieldValue(name, text);
    props.onChange?.(text);

  };

  const handleBlur = () => {
    setFieldTouched(name, true);
    props.onBlur?.();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      focus.focusNextInput(name);
    }
  };
  const isText = ['text', 'password', 'email', 'digits'].includes(type);

  return {
    ...getInputTypeProps(type),
    ...props,
    value: values[name],
    error,
    onBlur: handleBlur,
    onKeyPress: handleKeyPress,
    ...(isText ? { onChangeText } : {onChange}),
    ...(focus.active ? {handleKeyPress} : {}),
  };
};


export const Form = <T extends {}>({ children, autoFocus = false, initFocus, ...formikProps }: CustomFormProps<T> & any) => {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const inputNames = useRef<string[]>([]);

  const setInputRef = (name: string, ref: HTMLInputElement | null) => {
    inputRefs.current[name] = ref;
    if (!inputNames.current.includes(name)) {
      inputNames.current.push(name);
    }
  };

  const focusNextInput = (currentName: string) => {
    const currentIndex = inputNames.current.indexOf(currentName);
    const nextIndex = currentIndex + 1;
    if (nextIndex < inputNames.current.length) {
      inputRefs.current[inputNames.current[nextIndex]]?.focus();
    } else if (formikProps.onSubmit) {
      formikProps.onSubmit(formikProps.values);
    }
  };

  const contextValue = {
    active: autoFocus,
    focusNextInput,
    setInputRef,
    handleSubmitEditing: focusNextInput,
    getReturnKeyType: (name: string) => inputNames.current.indexOf(name) === inputNames.current.length - 1 ? 'done' : 'next',
  };

  useEffect(() => {
    if (autoFocus ) {
      if (initFocus && inputRefs.current[initFocus]){
        inputRefs.current[initFocus]?.focus();
      }else if (inputNames.current[0]){
        inputRefs.current[inputNames.current[0]]?.focus();
      }
    }
   
  }, [autoFocus, initFocus]);

  return (
    <Formik {...formikProps}>
      {(_formikProps: any) => (
        <FocusContext.Provider value={contextValue}>
          <FormikForm>{children}</FormikForm>
        </FocusContext.Provider>
      )}
    </Formik>
  );
};

// import FormPicker from 'src/Picker/Picker';
// import FormRater from 'src/Rate/Rate';
// import Upload from 'src/Upload/Upload';

