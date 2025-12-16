import React from 'react';
import { View } from 'app-studio';
import {
  DefaultDemo,
  StyleDemo,
  CircularDemo,
  AnimatedDemo,
} from 'src/components/ProgressBar/examples';

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
            <td>
              <StyleDemo />
            </td>
          </tr>
          <tr>
            <td>Circular</td>
            <td>
              <CircularDemo />
            </td>
          </tr>
          <tr>
            <td>Animation</td>
            <td>
              <AnimatedDemo />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default ProgressBarPage;
