import React from 'react';
import { View } from 'app-studio';
import {
  DefaultCommand,
  GroupedCommand,
  CommandVariants,
  CommandSizes,
  CustomizedCommand,
} from 'src/components/Command/examples';

const CommandPage = () => {
  return (
    <View>
      <table>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>

          <tr>
            <td>Default</td>
            <td>
              <DefaultCommand />
            </td>
          </tr>

          <tr>
            <td>Groups</td>
            <td>
              <GroupedCommand />
            </td>
          </tr>

          <tr>
            <td>Variants</td>
            <td>
              <CommandVariants />
            </td>
          </tr>

          <tr>
            <td>Sizes</td>
            <td>
              <CommandSizes />
            </td>
          </tr>

          <tr>
            <td>Customized</td>
            <td>
              <CustomizedCommand />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default CommandPage;
