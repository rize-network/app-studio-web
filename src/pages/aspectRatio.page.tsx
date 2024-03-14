import React from 'react';
import { View } from 'src/components';
import { RatioDemo, DefaultDemo } from 'src/components/AspectRatio/examples';

const AspectRatioPage = () => {
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
            <td>Ratio</td>
            <td>
              <RatioDemo />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default AspectRatioPage;
