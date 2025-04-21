import React from 'react';
import { View } from 'app-studio';
import {
  DefaultDemo,
  DesignSystemAlerts,
  IconDemo,
  StylesDemo,
  VariantDemo,
} from 'src/components/Alert/examples';

const AlertPage = () => {
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
              <DesignSystemAlerts />
            </td>
          </tr>

          <tr>
            <td>Default</td>
            <td>
              <DefaultDemo />
            </td>
          </tr>

          <tr>
            <td>Icon</td>
            <td>
              <IconDemo />
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

export default AlertPage;
