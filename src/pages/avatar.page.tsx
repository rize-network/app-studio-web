import React from 'react';
import { View } from 'src/components/Layout/View/View';
import {
  DefaultDemo,
  FallbackDemo,
  SizeDemo,
  StylesDemo,
} from 'src/components/Avatar/examples';

const AvatarPage = () => {
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
            <td>Fallback</td>
            <td>
              <FallbackDemo />
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
        </tbody>
      </table>
    </View>
  );
};

export default AvatarPage;
