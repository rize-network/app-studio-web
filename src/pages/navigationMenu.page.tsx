import React from 'react';
import { View } from 'src/components/Layout/View/View';
import {
  DefaultNavigationMenu,
  HorizontalNavigationMenu,
  NavigationMenuVariants,
  NavigationMenuSizes,
  CompoundNavigationMenu,
} from 'src/components/NavigationMenu/examples';

const NavigationMenuPage = () => {
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
              <DefaultNavigationMenu />
            </td>
          </tr>

          <tr>
            <td>Horizontal</td>
            <td>
              <HorizontalNavigationMenu />
            </td>
          </tr>

          <tr>
            <td>Variants</td>
            <td>
              <NavigationMenuVariants />
            </td>
          </tr>

          <tr>
            <td>Sizes</td>
            <td>
              <NavigationMenuSizes />
            </td>
          </tr>

          <tr>
            <td>Compound Pattern</td>
            <td>
              <CompoundNavigationMenu />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default NavigationMenuPage;
