import React from 'react';
import { View } from 'src/components';
import {
  FormikTextArea,
  FormikTextField,
  FormikDatePicker,
  FormikCountryPicker,
  FormikPassword,
  FormCheckbox,
  FormikSelect,
  FormikSwitch,
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
              <FormCheckbox />
            </td>
          </tr>
          <tr>
            <th>CountryPicker</th>
            <td>
              <FormikCountryPicker />
            </td>
          </tr>
          <tr>
            <td>DatePicker</td>
            <td>
              <FormikDatePicker />
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <FormikPassword />
            </td>
          </tr>
          <tr>
            <th>Select</th>
            <td>
              <FormikSelect />
            </td>
          </tr>
          <tr>
            <th>Switch</th>
            <td>
              <FormikSwitch />
            </td>
          </tr>
          <tr>
            <th>TextArea</th>
            <td>
              <FormikTextArea />
            </td>
          </tr>
          <tr>
            <td>TextField</td>
            <td>
              <FormikTextField />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};
export default FormikPage;
