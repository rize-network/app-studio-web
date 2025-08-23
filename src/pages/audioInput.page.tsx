import React from 'react';
import { View } from 'app-studio';
import { Default, Minimal } from 'src/components/AudioInput/examples';

const AudioInputPage = () => {
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
            <td>Minimal</td>
            <td>
              <Minimal />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default AudioInputPage;
