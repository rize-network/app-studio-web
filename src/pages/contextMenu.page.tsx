import React from 'react';
import { View } from 'src/components/Layout/View/View';
import {
  DefaultContextMenu,
  ContextMenuVariants,
  ContextMenuSizes,
  CustomContextMenu,
  CompoundContextMenu,
} from 'src/components/ContextMenu/examples';

const ContextMenuPage = () => {
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
              <DefaultContextMenu />
            </td>
          </tr>

          <tr>
            <td>Variants</td>
            <td>
              <ContextMenuVariants />
            </td>
          </tr>

          <tr>
            <td>Sizes</td>
            <td>
              <ContextMenuSizes />
            </td>
          </tr>

          <tr>
            <td>Custom</td>
            <td>
              <CustomContextMenu />
            </td>
          </tr>

          <tr>
            <td>Compound Pattern</td>
            <td>
              <CompoundContextMenu />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default ContextMenuPage;
