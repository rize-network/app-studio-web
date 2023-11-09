import type { FormikProps, FormikValues } from 'formik';

let form: FormikProps<FormikValues>;

export const getForm = () => {
  return form;
};
export const setForm = (newForm: FormikProps<FormikValues>) => {
  if (form !== newForm) {
    form = newForm;
  }
};

export interface InputFormProps {
  name: string;
  label?: string;
  rightIcon?: any;
  leftIcon?: any;
  labelProps?: any;
}
