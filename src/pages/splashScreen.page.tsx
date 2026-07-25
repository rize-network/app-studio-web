import React from 'react';
import { View } from 'app-studio';
import { DefaultSplashScreen } from 'src/components/SplashScreen/examples';

export const SplashScreenPage = () => (
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
            <DefaultSplashScreen />
          </td>
        </tr>
      </tbody>
    </table>
  </View>
);

export default SplashScreenPage;
