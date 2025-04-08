import React from 'react';
import { View } from 'src/components/Layout/View/View';
import {
  DefaultResizable,
  VerticalResizable,
  NestedResizable,
  ResizableVariants,
  ResizableSizes,
  CodeEditorLayout,
  ControlledResizable,
} from 'src/components/Resizable/examples';

const ResizablePage = () => {
  return (
    <View>
      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>

          <tr>
            <td>Default (Horizontal)</td>
            <td>
              <DefaultResizable />
            </td>
          </tr>

          <tr>
            <td>Vertical</td>
            <td>
              <VerticalResizable />
            </td>
          </tr>

          <tr>
            <td>Nested</td>
            <td>
              <NestedResizable />
            </td>
          </tr>

          <tr>
            <td>Variants</td>
            <td>
              <ResizableVariants />
            </td>
          </tr>

          <tr>
            <td>Sizes</td>
            <td>
              <ResizableSizes />
            </td>
          </tr>

          <tr>
            <td>Controlled</td>
            <td>
              <ControlledResizable />
            </td>
          </tr>

          <tr>
            <td>Code Editor Layout</td>
            <td>
              <CodeEditorLayout />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default ResizablePage;
