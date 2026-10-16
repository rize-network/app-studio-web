import React from 'react';
import { View } from 'app-studio';
import { DefaultKeyboardAvoidingView } from 'src/components/KeyboardAvoidingView/examples';

export const KeyboardAvoidingViewPage = () => (
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
            <DefaultKeyboardAvoidingView />
          </td>
        </tr>
      </tbody>
    </table>
  </View>
);

export default KeyboardAvoidingViewPage;
