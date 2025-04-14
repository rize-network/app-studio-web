import React from 'react';
import { View } from 'src/components/Layout/View/View';
import {
  ContentDemo,
  DefaultDemo,
  DesignSystemBadges,
  PositionDemo,
  ShapeDemo,
  SizeDemo,
  StylesDemo,
  VariantDemo,
} from 'src/components/Badge/examples';

const BadgePage = () => {
  return (
    <View>
      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>

          <tr>
            <td>Design System</td>
            <td>
              <DesignSystemBadges />
            </td>
          </tr>

          <tr>
            <td>Content</td>
            <td>
              <ContentDemo />
            </td>
          </tr>

          <tr>
            <td>Default</td>
            <td>
              <DefaultDemo />
            </td>
          </tr>

          <tr>
            <td>Position</td>
            <td>
              <PositionDemo />
            </td>
          </tr>

          <tr>
            <td>Shape</td>
            <td>
              <ShapeDemo />
            </td>
          </tr>

          <tr>
            <td>Size</td>
            <td>
              <SizeDemo />
            </td>
          </tr>

          <tr>
            <td>Styles</td>
            <td>
              <StylesDemo />
            </td>
          </tr>

          <tr>
            <td>Variant</td>
            <td>
              <VariantDemo />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default BadgePage;
