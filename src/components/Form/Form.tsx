import React, { PureComponent } from 'react';
export * from './Checkbox/Checkbox';
export *  from './DatePicker/DatePicker';
export *  from './Label/Label';
export * from './CountryPicker/CountryPicker';
export *  from './Select/Select';
export *  from './Switch/Switch';
export *  from './TextArea/TextArea';
export *  from './TextField/TextField';
export *  from './Password/Password';

import { setForm } from '../../utils/form';
import type { FieldProps } from 'formik';
import { Field } from 'formik';
import { FormProps, Form as $Form } from 'app-studio';


export function Form(props: FormProps) {
  //dispatch
  return (
    <Field>
      {({ form }: FieldProps) => (
        <$Form
          onReset={form.handleReset}
          onSubmitCapture={form.handleSubmit}
          {...props}
        />
      )}
    </Field>
  );
}

class FormContainer extends PureComponent<FieldProps> {
  render() {
    const { form, ...props } = this.props;
    // console.log(this.props);
    setForm(form);

    return <Form {...props} />;
  }
}

export default FormContainer;
