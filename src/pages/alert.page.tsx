import React from 'react';
import { Default } from 'src/components/Alert/examples/default';
import { AlertIcon } from 'src/components/Alert/examples/icon';
import { AlertStyles } from 'src/components/Alert/examples/styles';
import { AlertVariants } from 'src/components/Alert/examples/variant';
import { View } from 'src/components/Layout/View/View';

export const AlertPage = () => {
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
              <Default />
            </td>
          </tr>
          <tr>
            <td>Variant</td>

            <td>
              <AlertVariants />
            </td>
          </tr>
          <tr>
            <td>Styles</td>
            <td>
              <AlertStyles />
            </td>
          </tr>
          <tr>
            <td>Icon</td>
            <td>
              <AlertIcon />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default AlertPage;
