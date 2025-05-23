import React from 'react';
import { View } from 'app-studio';
import {
  DefaultResizable,
  VerticalResizable,
  NestedResizable,
  ResizableVariants,
  ResizableSizes,
  CodeEditorLayout,
  ControlledResizable,
  CollapsibleResizable,
  ResizableTest,
} from 'src/components/Resizable/examples';

const ResizablePage = () => {
  return (
    <View>
      <table>
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

          <tr>
            <td>Collapsible Panels</td>
            <td>
              <CollapsibleResizable />
            </td>
          </tr>

          <tr>
            <td>Simple Test</td>
            <td>
              <ResizableTest />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default ResizablePage;
