import React from 'react';
import { View } from 'app-studio';
import {
  DefaultDemo,
  DesignSystemCards,
  VariantsDemo,
  StructuredDemo,
  ShapesDemo,
  SizesDemo,
  CustomDemo,
  ContextStylingDemo,
} from 'src/components/Card/examples';

const CardPage = () => {
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
              <DesignSystemCards />
            </td>
          </tr>

          <tr>
            <td>Default</td>
            <td>
              <DefaultDemo />
            </td>
          </tr>

          <tr>
            <td>Variants</td>
            <td>
              <VariantsDemo />
            </td>
          </tr>

          <tr>
            <td>Structured</td>
            <td>
              <StructuredDemo />
            </td>
          </tr>

          <tr>
            <td>Shapes</td>
            <td>
              <ShapesDemo />
            </td>
          </tr>

          <tr>
            <td>Sizes</td>
            <td>
              <SizesDemo />
            </td>
          </tr>

          <tr>
            <td>Custom</td>
            <td>
              <CustomDemo />
            </td>
          </tr>

          <tr>
            <td>Context Styling</td>
            <td>
              <ContextStylingDemo />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default CardPage;
