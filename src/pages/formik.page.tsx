import React from 'react';
import { View } from 'src/components';
import {
  FormikTextAreaExemple,
  FormikTextFieldExemple,
  FormikDatePickerExemple,
  FormikCountryPickerExemple,
  FormikPasswordExemple,
  FormCheckboxExemple,
  FormikSelectExemple,
  FormikSwitchExemple,
} from 'src/components/Formik/examples';

export const FormikPage = () => {
  return (
    <View>
      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>
          <tr>
            <td>Checkbox</td>
            <td>
              <FormCheckboxExemple />
            </td>
          </tr>
          <tr>
            <th>CountryPicker</th>
            <td>
              <FormikCountryPickerExemple />
            </td>
          </tr>
          <tr>
            <td>DatePicker</td>
            <td>
              <FormikDatePickerExemple />
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <FormikPasswordExemple />
            </td>
          </tr>
          <tr>
            <th>Select</th>
            <td>
              <FormikSelectExemple />
            </td>
          </tr>
          <tr>
            <th>Switch</th>
            <td>
              <FormikSwitchExemple />
            </td>
          </tr>
          <tr>
            <th>TextArea</th>
            <td>
              <FormikTextAreaExemple />
            </td>
          </tr>
          <tr>
            <td>TextField</td>
            <td>
              <FormikTextFieldExemple />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};
export default FormikPage;
