import React from 'react';
import { View } from 'app-studio';
import { DefaultDemo, StyleDemo } from 'src/components/ProgressBar/examples';

const ProgressBarPage = () => {
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
            <td>Styles</td>
            <td>
              <StyleDemo />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default ProgressBarPage;
