import React from 'react';
import {
  ColorDatePicker,
  DefaultDatePicker,
  DisabledDatePicker,
  ErrorDatePicker,
  FormDatePicker,
  HelperTextDatePicker,
  ReadOnlyDatePicker,
  ShadowDatePicker,
  SizeDatePicker,
  StyledDatePicker,
} from 'src/components/Form/DatePicker/examples';
import { View } from 'src/components/Layout/View/View';

export const DatePickerPage = () => {
  return (
    <View>
      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>
          <tr>
            <td>Default</td>
            <td>
              <DefaultDatePicker />
            </td>
          </tr>
          <tr>
            <td>Disabled</td>
            <td>
              <DisabledDatePicker />
            </td>
          </tr>
          <tr>
            <td>ReadOnly</td>
            <td>
              <ReadOnlyDatePicker />
            </td>
          </tr>
          <tr>
            <td>Styles</td>
            <td>
              <StyledDatePicker />
            </td>
          </tr>
          <tr>
            <td>ColorScheme</td>
            <td>
              <ColorDatePicker />
            </td>
          </tr>
          <tr>
            <td>Sizes</td>
            <td>
              <SizeDatePicker />
            </td>
          </tr>

          <tr>
            <td>Shadow</td>
            <td>
              <ShadowDatePicker />
            </td>
          </tr>
          <tr>
            <td>Error</td>
            <td>
              <ErrorDatePicker />
            </td>
          </tr>
          <tr>
            <td>HelperText</td>
            <td>
              <HelperTextDatePicker />
            </td>
          </tr>

          <tr>
            <td>Form</td>
            <td>
              <FormDatePicker />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default DatePickerPage;
