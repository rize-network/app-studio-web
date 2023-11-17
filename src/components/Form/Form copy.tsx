import React, { createContext, useContext, useRef, useEffect } from 'react';
import { Formik, Form as FormikForm, FormikConfig,useFormikContext, FormikValues, FormikState, FormikHelpers } from 'formik';

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

export const useFormikInput = ({name, type, ...props}: any) => {


  const {
    touched,
    errors,
    submitCount,
    values,
    isSubmitting,
    setFieldTouched,
    setFieldValue,
  }:FormikState<FormikValues> & FormikHelpers<FormikValues>  = useFormikContext();

  const value = values[name];
  const error = touched[name] || submitCount >0 ? errors[name] : undefined;
  const isText = ['text', 'password', 'email', 'digits'].includes(type)
  ? true
  : false;
  const focus = useContext(FocusContext);

  const onChangeText = (text: string) => {
    setFieldValue(name, text);
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  };


  const onChange = (text: string) => {
    setFieldValue(name, text);
    if (props.onChange) {
      props.onChange(text);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      focus.focusNextInput(name);
    }
  };

  const onBlur = () => {
    if (props.onBlur) {
      props.onBlur();
    }
    // validate onBlur only while not submitting
    // this prevents validating twice in succession when clicking 'done' on keyboard - first onSubmitEditing, then onBlur
    setFieldTouched(name, true, !isSubmitting);
  };

  return {
    ...getInputTypeProps(type),
    ...props,
    touched:  touched[name],
    error,
    value,
    // setFieldValue: (value: any, ...args: any) =>
    //   setFieldValue(name, value, ...args),
    // setFieldTouched: (value: boolean | undefined, ...args: any) =>
    //   setFieldTouched(name, value, ...args),
    onBlur,
    name,
    ...(isText ? {onChangeText} : {onChange}),
    ...(focus.active ? {handleKeyPress} : {}),
  };

};
const FocusContext = createContext<FocusContextType>({
  active: false,
  focusNextInput: () => {},
  setInputRef: () => {},
  handleSubmitEditing: () => {},
  getReturnKeyType: () => 'next',
});
export const useFormFocus = () => useContext(FocusContext);

const focusElement = (el:any) => {
  try{
  el?.focus();
  }catch(e){
    console.error(e)
  }
};

export const Form = <T extends {}>({
  children,
  autoFocus = false,
  initFocus,
  ...formikProps
}: CustomFormProps<T>& any) => {

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const inputNames = useRef<string[]>([]);

  const setInputRef = (name: string, ref: HTMLInputElement | null) => {
    inputRefs.current[name] = ref;
    if (!inputNames.current.includes(name)) {
      inputNames.current.push(name);
    }
  };

  const focusFirstInput = () => {
    const allNames = Object.keys(inputRefs.current);
    focusElement(inputRefs.current[allNames[0]])
  };

  const focusNextInput = (currentName: string) => {
    const allNames = Object.keys(inputRefs.current);
    const currentIndex = allNames.indexOf(currentName);
    focusElement(inputRefs.current[allNames[currentIndex + 1]])
  };

  useEffect(() => {
    if (autoFocus ) {
      if (initFocus && inputRefs.current[initFocus]){
        inputRefs.current[initFocus]?.focus();
      }else{
        focusFirstInput()
      }
    }
  }, [autoFocus, initFocus]);


  const handleSubmitEditing = (name: string) => {
    const currentIndex = inputNames.current.indexOf(name);
    const nextIndex = currentIndex + 1;

    if (nextIndex < inputNames.current.length) {
      focusElement(inputRefs.current[inputNames.current[nextIndex]])
    } else if (formikProps.onSubmit) {
      formikProps.onSubmit(formikProps.values);
    }
  };

  const getReturnKeyType = (name: string) => {
    const currentIndex = inputNames.current.indexOf(name);
    return currentIndex === inputNames.current.length - 1 ? 'done' : 'next';
  };

  const contextValue = {
    active: autoFocus,
    focusNextInput,
    setInputRef,
    handleSubmitEditing,
    getReturnKeyType,
  };


  return (
    <Formik {...formikProps}>
      {(_formikProps:any) => (
        <FocusContext.Provider value={contextValue}>
        <FormikForm>
            {children}
          </FormikForm>
        </FocusContext.Provider>
      )}
    </Formik>
  );
};
// import FormPicker from 'src/Picker/Picker';
// import FormRater from 'src/Rate/Rate';
// import Upload from 'src/Upload/Upload';

