import React from 'react';
import {
  ColorArea,
  DefaultArea,
  DesignSystemTextAreas,
  DisabledArea,
  LabelArea,
  MaxArea,
  PlaceholderArea,
  ReadOnlyArea,
  ShapesArea,
  SizeArea,
  StyledArea,
  VariantsArea,
} from 'src/components/Form/TextArea/examples';
import { View } from 'app-studio';

export const TextAreaPage = () => {
  return (
    <View>
      <table>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>
          <tr>
            <th>Design System</th>
            <td>
              <DesignSystemTextAreas />
            </td>
          </tr>

          <tr>
            <th>Default</th>
            <td>
              <DefaultArea />
            </td>
          </tr>
          <tr>
            <th>Disabled</th>

            <td>
              <DisabledArea />
            </td>
          </tr>
          <tr>
            <th>ReadOnly</th>

            <td>
              <ReadOnlyArea />
            </td>
          </tr>
          <tr>
            <th>Label</th>

            <td>
              <LabelArea />
            </td>
          </tr>
          <tr>
            <th>Rows/Cols</th>

            <td>
              <MaxArea />
            </td>
          </tr>
          <tr>
            <th>Placeholder</th>

            <td>
              <PlaceholderArea />
            </td>
          </tr>
          <tr>
            <th>ColorScheme</th>

            <td>
              <ColorArea />
            </td>
          </tr>
          <tr>
            <th>Sizes</th>

            <td>
              <SizeArea />
            </td>
          </tr>

          <tr>
            <th>Variants</th>

            <td>
              <VariantsArea />
            </td>
          </tr>
          <tr>
            <th>Shape</th>

            <td>
              <ShapesArea />
            </td>
          </tr>
          <tr>
            <th>Styles</th>

            <td>
              <StyledArea />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default TextAreaPage;
