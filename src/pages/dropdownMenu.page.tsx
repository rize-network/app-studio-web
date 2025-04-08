import React from 'react';
import { View } from 'src/components/Layout/View/View';
import {
  DefaultDropdownMenu,
  DropdownMenuPositions,
  DropdownMenuVariants,
  DropdownMenuSizes,
  CustomDropdownMenu
} from 'src/components/DropdownMenu/examples';

const DropdownMenuPage = () => {
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
