import React from 'react';
import { View } from 'app-studio';
import { DefaultRouter } from 'src/components/Router/examples';

export const RouterPage = () => (
  <View>
    <table>
      <tbody>
        <tr>
          <th>Property</th>
          <th>App-Studio</th>
        </tr>
        <tr>
          <td>Default</td>
          <td>
            <DefaultRouter />
          </td>
        </tr>
      </tbody>
    </table>
  </View>
);

export default RouterPage;
