import React from 'react';
import {
  DefaultRadio,
  DefaultRadioGroup,
  DesignSystemRadios,
} from 'src/components/Form/Radio/examples';
import { View } from 'src/components/Layout/View/View';

export default function RadioPage() {
  return (
    <View padding={20}>
      <h1>Radio Component</h1>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Design System</td>
            <td>
              <DesignSystemRadios />
            </td>
          </tr>

          <tr>
            <td>Default Radio</td>
            <td>
              <DefaultRadio />
            </td>
          </tr>

          <tr>
            <td>Default RadioGroup</td>
            <td>
              <DefaultRadioGroup />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
}
