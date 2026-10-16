import React from 'react';
import { View } from 'app-studio';
import {
  DefaultSelector,
  ColoredSelector,
  ControlledSelector,
  DesignSystemSelectors,
} from 'src/components/Form/Selector/examples';

export const SelectorPage = () => {
  return (
    <View padding={20}>
      <h1>Selector Component</h1>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Design System</th>
            <td>
              <DesignSystemSelectors />
            </td>
          </tr>
          <tr>
            <th>Default</th>
            <td>
              <DefaultSelector />
            </td>
          </tr>
          <tr>
            <th>Colored options</th>
            <td>
              <ColoredSelector />
            </td>
          </tr>
          <tr>
            <th>Controlled</th>
            <td>
              <ControlledSelector />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default SelectorPage;
