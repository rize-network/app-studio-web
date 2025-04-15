import React from 'react';
import {
  ColorCheckbox,
  DefaultCheckbox,
  DesignSystemCheckboxes,
  DisabledCheckbox,
  ErrorCheckbox,
  FormCheckbox,
  IconCheckbox,
  IndeterminateCheckbox,
  ReadOnlyCheckbox,
  ShadowCheckbox,
  SizeCheckbox,
  StyledCheckbox,
  InfoTextDemo,
} from 'src/components/Form/Checkbox/examples';
import { View } from 'app-studio';

export const CheckboxPage = () => {
  return (
    <View>
      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>
          <tr>
            <td>Design System</td>
            <td>
              <DesignSystemCheckboxes />
            </td>
          </tr>

          <tr>
            <td>Default</td>
            <td>
              <DefaultCheckbox />
            </td>
          </tr>
          <tr>
            <td>Disabled</td>

            <td>
              <DisabledCheckbox />
            </td>
          </tr>
          <tr>
            <td>ReadOnly</td>

            <td>
              <ReadOnlyCheckbox />
            </td>
          </tr>
          <tr>
            <td>Indeterminate</td>

            <td>
              <IndeterminateCheckbox />
            </td>
          </tr>
          <tr>
            <td>InfoText</td>

            <td>
              <InfoTextDemo />
            </td>
          </tr>
          <tr>
            <td>Styles</td>

            <td>
              <StyledCheckbox />
            </td>
          </tr>
          <tr>
            <td>ColorScheme</td>

            <td>
              <ColorCheckbox />
            </td>
          </tr>
          <tr>
            <td>Sizes</td>

            <td>
              <SizeCheckbox />
            </td>
          </tr>

          <tr>
            <td>Shadow</td>

            <td>
              <ShadowCheckbox />
            </td>
          </tr>
          <tr>
            <td>Icon</td>

            <td>
              <IconCheckbox />
            </td>
          </tr>
          <tr>
            <td>Error</td>

            <td>
              <ErrorCheckbox />
            </td>
          </tr>
          <tr>
            <td>Form</td>

            <td>
              <FormCheckbox />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default CheckboxPage;
