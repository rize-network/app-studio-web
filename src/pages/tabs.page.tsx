import React from 'react';
import { View } from 'app-studio';
import {
  Default,
  StylesTabs,
  CompoundTabs,
} from 'src/components/Tabs/examples';

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
          <tr>
            <td>compound</td>
            <td>
              <CompoundTabs />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default TabsPage;
