import React from 'react';
import {
  ColorDemo,
  DesignSystemSelects,
  IsScrollableDemo,
} from 'src/components/Form/Select/examples';
import { DefaultSelect } from 'src/components/Form/Select/examples/Default';
import { DisabledSelect } from 'src/components/Form/Select/examples/Disabled';
import { ErrorSelect } from 'src/components/Form/Select/examples/Error';
import { FormSelect } from 'src/components/Form/Select/examples/Form';
import { HelperTextSelect } from 'src/components/Form/Select/examples/HelperText';
import { MultiSelect } from 'src/components/Form/Select/examples/Multiple';
import { ReadOnlySelect } from 'src/components/Form/Select/examples/ReadOnlyInput';
import { ShadowSelect } from 'src/components/Form/Select/examples/Shadow';
import { SizeSelect } from 'src/components/Form/Select/examples/SizeInput';
import { StyledSelect } from 'src/components/Form/Select/examples/StylesInput';
import { View } from 'app-studio';

export const SelectPage = () => {
  return (
    <View>
      <table>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>
          <tr>
            <th>Design System</th>
            <td>
              <DesignSystemSelects />
            </td>
          </tr>

          <tr>
            <th>Default</th>
            <td>
              <DefaultSelect />
            </td>
          </tr>
          <tr>
            <th>Disabled</th>

            <td>
              <DisabledSelect />
            </td>
          </tr>
          <tr>
            <th>ReadOnly</th>

            <td>
              <ReadOnlySelect />
            </td>
          </tr>
          <tr>
            <th>Multiple</th>

            <td>
              <MultiSelect />
            </td>
          </tr>
          <tr>
            <th>IsScrollable</th>

            <td>
              <IsScrollableDemo />
            </td>
          </tr>
          <tr>
            <th>Styles</th>

            <td>
              <StyledSelect />
            </td>
          </tr>
          <tr>
            <th>ColorScheme</th>

            <td>
              <ColorDemo />
            </td>
          </tr>
          <tr>
            <th>Sizes</th>

            <td>
              <SizeSelect />
            </td>
          </tr>

          <tr>
            <th>Shadow</th>

            <td>
              <ShadowSelect />
            </td>
          </tr>
          <tr>
            <th>Error</th>
            <td>
              <ErrorSelect />
            </td>
          </tr>
          <tr>
            <th>HelperText</th>

            <td>
              <HelperTextSelect />
            </td>
          </tr>

          <tr>
            <th>Form</th>

            <td>
              <FormSelect />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default SelectPage;
