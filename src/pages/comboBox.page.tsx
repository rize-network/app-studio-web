import React from 'react';
import { View } from 'src/components/Layout/View/View';
import {
  DefaultDemo,
  LabelDemo,
  LeftDemo,
  OnSelectDemo,
  PlaceholderDemo,
  RightDemo,
  SearchEnabledDemo,
  SearchPlaceholderDemo,
  ShowTickDemo,
  StylesDemo,
} from 'src/components/ComboBox/examples';

const ComboBoxPage = () => {
  return (
    <View>
      <table className="table" cellSpacing={0}>
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
            <td>Label</td>
            <td>
              <LabelDemo />
            </td>
          </tr>

          <tr>
            <td>Left</td>
            <td>
              <LeftDemo />
            </td>
          </tr>

          <tr>
            <td>OnSelect</td>
            <td>
              <OnSelectDemo />
            </td>
          </tr>

          <tr>
            <td>Placeholder</td>
            <td>
              <PlaceholderDemo />
            </td>
          </tr>

          <tr>
            <td>Right</td>
            <td>
              <RightDemo />
            </td>
          </tr>

          <tr>
            <td>SearchEnabled</td>
            <td>
              <SearchEnabledDemo />
            </td>
          </tr>

          <tr>
            <td>SearchPlaceholder</td>
            <td>
              <SearchPlaceholderDemo />
            </td>
          </tr>

          <tr>
            <td>ShowTick</td>
            <td>
              <ShowTickDemo />
            </td>
          </tr>

          <tr>
            <td>Styles</td>
            <td>
              <StylesDemo />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default ComboBoxPage;
