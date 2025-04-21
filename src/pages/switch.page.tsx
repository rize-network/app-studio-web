import React from 'react';
import { View } from 'app-studio';
import { ChildSwitch } from 'src/components/Form/Switch/examples/ChildSwitch';
import { ColorSwitch } from 'src/components/Form/Switch/examples/ColorScheme';
import { DefaultSwitch } from 'src/components/Form/Switch/examples/Default';
import { DesignSystemSwitches } from 'src/components/Form/Switch/examples/designSystem';
import { DisabledSwitch } from 'src/components/Form/Switch/examples/DisabledInput';
import { ReadOnlySwitch } from 'src/components/Form/Switch/examples/ReadOnlyInput';
import { ShadowSwitch } from 'src/components/Form/Switch/examples/Shadow';
import { SizeSwitch } from 'src/components/Form/Switch/examples/SizeInput';

export const SwitchPage = () => {
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
              <DesignSystemSwitches />
            </td>
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
        </tbody>
      </table>
    </View>
  );
};
export default SwitchPage;
