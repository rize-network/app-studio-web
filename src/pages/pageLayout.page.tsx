import React from 'react';
import { View } from 'app-studio';
import { DefaultPageLayout } from 'src/components/PageLayout/examples';

export const PageLayoutPage = () => (
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
            <DefaultPageLayout />
          </td>
        </tr>
      </tbody>
    </table>
  </View>
);

export default PageLayoutPage;
