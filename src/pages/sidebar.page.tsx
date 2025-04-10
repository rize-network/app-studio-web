import React from 'react';
import { View } from 'src/components/Layout/View/View';
import {
  DefaultSidebar,
  SidebarVariants,
  SidebarPositions,
  SidebarSizes,
  ControlledSidebar,
  CustomizedSidebar,
} from 'src/components/Sidebar/examples';

const SidebarPage = () => {
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
              <DefaultSidebar />
            </td>
          </tr>

          <tr>
            <td>Variants</td>
            <td>
              <SidebarVariants />
            </td>
          </tr>

          <tr>
            <td>Positions</td>
            <td>
              <SidebarPositions />
            </td>
          </tr>

          <tr>
            <td>Sizes</td>
            <td>
              <SidebarSizes />
            </td>
          </tr>

          <tr>
            <td>Controlled</td>
            <td>
              <ControlledSidebar />
            </td>
          </tr>

          <tr>
            <td>Customized</td>
            <td>
              <CustomizedSidebar />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default SidebarPage;
