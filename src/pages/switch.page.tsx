import React from 'react';
import { Horizontal, View } from 'src/components';
import { ChildSwitch } from 'src/components/Form/Switch/examples/ChildSwitch';
import { ColorSwitch } from 'src/components/Form/Switch/examples/ColorScheme';
import { DefaultSwitch } from 'src/components/Form/Switch/examples/Default';
import { DisabledSwitch } from 'src/components/Form/Switch/examples/DisabledInput';
import { FormikSwitch } from 'src/components/Form/Switch/examples/Formik';
import { FormSwitch } from 'src/components/Form/Switch/examples/FormSwitch';
import { ReadOnlySwitch } from 'src/components/Form/Switch/examples/ReadOnlyInput';
import { ShadowSwitch } from 'src/components/Form/Switch/examples/Shadow';
import { SizeSwitch } from 'src/components/Form/Switch/examples/SizeInput';


export const SwitchPage = () => {
  return (
    <View>
      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>
          <tr>
            <th>Default</th>
            <td>
              <DefaultSwitch />
            </td>
          </tr>
          <tr>
            <th>Disabled</th>
            <td>
              <DisabledSwitch />
            </td>
          </tr>
          <tr>
            <th>ReadOnly</th>

            <td>
              <ReadOnlySwitch />
            </td>
          </tr>
          <tr>
            <th>ColorScheme</th>
            <td>
              <ColorSwitch />
            </td>
          </tr>
          <tr>
            <th>Sizes</th>
            <td>
              <SizeSwitch />
            </td>
          </tr>
          <tr>
            <th>Child</th>

            <td>
              <ChildSwitch />
            </td>
          </tr>
          <tr>
            <th>Shadow</th>
            <td>
              <ShadowSwitch />
            </td>
          </tr>
          <tr>
            <th>Formik</th>

            <td>
              <Horizontal justify="space-between">
                <FormikSwitch />
                <FormSwitch />
              </Horizontal>
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};
export default SwitchPage;
