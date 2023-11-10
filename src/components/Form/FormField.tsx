import * as React from 'react';
import type { FieldProps } from 'formik';
import { Field, getIn } from 'formik';
import { View } from 'app-studio';
import { Label } from './Form';
import { Vertical } from '../Layout/Vertical/Vertical';
import { Horizontal } from '../Layout/Horizontal/Horizontal';

export type FormItemProps = {
  children: React.ReactNode;
} & {
  name: string;
  label?: string;
  type?: string;
  labelProps: any;
};

export const FormField = ({
  name,
  children,
  label,
  //type,
  labelProps,
  ...restProps
}: FormItemProps) => (
  <View marginVertical={20}>
    <Label //description={description} helpIcon={helpIcon}
      {...labelProps}
    >
      {label}
    </Label>
    <Field>
      {({
        form: {
          submitCount,
          errors = {},
          touched = {},
          //initialErrors = {}
        },
      }: FieldProps) => {
        const error = getIn(errors, name, undefined);
        // const initialError = getIn(initialErrors, name, undefined);
        let isTouched = getIn(touched, name, false) as boolean | boolean[];
        if (Array.isArray(isTouched)) {
          isTouched = isTouched.reduce((acc, value) => acc || value, false);
        }
        // const hasError = error !== undefined && isTouched;
        // const hasInitialError = initialError !== undefined;
        // const isValid = !error && isTouched;
        // const showHelp = hasError || (hasInitialError && !isTouched);

        return (
          <Vertical marginHorizontal={20}>
            <Vertical
              borderRadius={5}
              borderStyle="solid"
              borderWidth={1}
              padding={5}
              marginVertical={10}
              backgroundColor={
                (submitCount > 0 && errors && errors[name] !== undefined) ||
                error
                  ? 'color.red.500'
                  : 'white'
              }
              borderColor="grey"
              {...restProps}
            >
              {children}
              {submitCount > 0 && errors && errors[name] !== undefined ? (
                <Horizontal>
                  {/* <AssetIcon name="ErreurSvg" size={16} /> */}
                  <Label outline={'none'} paddingLeft={'5px'} color={'red'}>
                    {errors[name]?.toString()}
                  </Label>
                </Horizontal>
              ) : (
                ''
              )}
            </Vertical>
          </Vertical>
        );
      }}
    </Field>
  </View>
);
