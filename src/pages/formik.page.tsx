import React from 'react';
import { View } from 'app-studio';
import {
  FormikTextAreaExemple,
  FormikTextFieldExemple,
  FormikDatePickerExemple,
  FormikCountryPickerExemple,
  FormikPasswordExemple,
  FormCheckboxExemple,
  FormikColorInputExample,
  FormikSelectExemple,
  FormikSwitchExemple,
  FormikSliderExample,
  FormikOTPInputExample,
} from '../components/Formik/examples';
import { FormikComboBoxDemo } from '../components/Formik/examples/FormikComboBox';

export const FormikPage = () => {
  return (
    <View>
      <table>
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
            <td>ColorInput</td>
            <td>
              <FormikColorInputExample />
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
          <tr>
            <td>Combobox</td>
            <td>
              <FormikComboBoxDemo />
            </td>
          </tr>
          <tr>
            <td>Slider</td>
            <td>
              <FormikSliderExample />
            </td>
          </tr>
          <tr>
            <td>OTP Input</td>
            <td>
              <FormikOTPInputExample />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};
export default FormikPage;
