import React from 'react';
import { View } from 'src/components';
import {
  DefaultDemo,
  IconDemo,
  StylesDemo,
  VariantDemo,
} from 'src/components/Alert/examples';

const AlertPage = () => {
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
