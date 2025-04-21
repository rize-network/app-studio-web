import React from 'react';
import { View } from 'app-studio';
import {
  DefaultNavigationMenu,
  DesignSystemNavigationMenu,
  HorizontalNavigationMenu,
  NavigationMenuVariants,
  NavigationMenuSizes,
  CompoundNavigationMenu,
} from 'src/components/NavigationMenu/examples';

const NavigationMenuPage = () => {
  return (
    <View>
      <table>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>

          <tr>
            <td>Design System</td>
            <td>
              <DesignSystemNavigationMenu />
            </td>
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
