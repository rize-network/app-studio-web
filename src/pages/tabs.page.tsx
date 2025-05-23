import React from 'react';
import { View } from 'app-studio';
import { Default, StylesTabs } from 'src/components/Tabs/examples';

export const TabsPage = () => {
  return (
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
              <Default />
            </td>
          </tr>
          <tr>
            <td>styles</td>
            <td>
              <StylesTabs />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default TabsPage;
