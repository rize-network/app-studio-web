import React from 'react';
import { View } from 'app-studio';
import {
  DefaultMenubar,
  MenubarVariants,
  VerticalMenubar,
  MenubarSizes,
  CompositeMenubar,
} from 'src/components/Menubar/examples';

const MenubarPage = () => {
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
              <DefaultMenubar />
            </td>
          </tr>

          <tr>
            <td>Variants</td>
            <td>
              <MenubarVariants />
            </td>
          </tr>

          <tr>
            <td>Vertical</td>
            <td>
              <VerticalMenubar />
            </td>
          </tr>

          <tr>
            <td>Sizes</td>
            <td>
              <MenubarSizes />
            </td>
          </tr>

          <tr>
            <td>Composite</td>
            <td>
              <CompositeMenubar />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default MenubarPage;
