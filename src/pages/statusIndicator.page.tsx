import React from 'react';
import { View } from 'app-studio';
import {
  DefaultDemo,
  StatusVariants,
} from 'src/components/StatusIndicator/examples';

const StatusIndicatorPage = () => {
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
              <DefaultDemo />
            </td>
          </tr>
          <tr>
            <td>Statuses</td>
            <td>
              <StatusVariants />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default StatusIndicatorPage;
