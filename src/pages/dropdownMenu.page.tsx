import React from 'react';
import { View } from 'app-studio';
import {
  DefaultDropdownMenu,
  DropdownMenuPositions,
  DropdownMenuVariants,
  DropdownMenuSizes,
  CustomDropdownMenu,
} from 'src/components/DropdownMenu/examples';

const DropdownMenuPage = () => {
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
              <DefaultDropdownMenu />
            </td>
          </tr>

          <tr>
            <td>Positions</td>
            <td>
              <DropdownMenuPositions />
            </td>
          </tr>

          <tr>
            <td>Variants</td>
            <td>
              <DropdownMenuVariants />
            </td>
          </tr>

          <tr>
            <td>Sizes</td>
            <td>
              <DropdownMenuSizes />
            </td>
          </tr>

          <tr>
            <td>Custom</td>
            <td>
              <CustomDropdownMenu />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default DropdownMenuPage;
