import React from 'react';
import {
  ColorCountryPicker,
  DefaultCountryPicker,
  DisabledCountryPicker,
  ErrorCountryPicker,
  FormCountryPicker,
  HelperTextCountryPicker,
  ReadOnlyCountryPicker,
  ShadowCountryPicker,
  ShapeCountryPicker,
  SizeCountryPicker,
  StyledCountryPicker,
  VariantCountryPicker,
} from 'src/components/Form/CountryPicker/examples';
import { View } from 'app-studio';

export const CountryPickerPage = () => {
  return (
    <View>
      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th style={{ width: '10%' }}>Property</th>

            <th>App-Studio</th>
          </tr>
          <tr>
            <td>Default</td>

            <td>
              <DefaultCountryPicker />
            </td>
          </tr>
          <tr>
            <td>Disabled</td>

            <td>
              <DisabledCountryPicker />
            </td>
          </tr>
          <tr>
            <td>ReadOnly</td>

            <td>
              <ReadOnlyCountryPicker />
            </td>
          </tr>
          <tr>
            <td>Styles</td>

            <td>
              <StyledCountryPicker />
            </td>
          </tr>
          <tr>
            <td>ColorScheme</td>

            <td>
              <ColorCountryPicker />
            </td>
          </tr>
          <tr>
            <td>Sizes</td>

            <td>
              <SizeCountryPicker />
            </td>
          </tr>
          <tr>
            <td>Shadow</td>

            <td>
              <ShadowCountryPicker />
            </td>
          </tr>
          <tr>
            <td>Shape</td>
            <td>
              <ShapeCountryPicker />
            </td>
          </tr>
          <tr>
            <td>Variant</td>
            <td>
              <VariantCountryPicker />
            </td>
          </tr>
          <tr>
            <td>Error</td>
            <td>
              <ErrorCountryPicker />
            </td>
          </tr>
          <tr>
            <td>HelperText</td>
            <td>
              <HelperTextCountryPicker />
            </td>
          </tr>
          <tr>
            <td>Form</td>
            <td>
              <FormCountryPicker />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default CountryPickerPage;
