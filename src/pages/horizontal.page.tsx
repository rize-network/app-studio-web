import React from 'react';
import { JustifyHorizontal, ReversedHorizontal, WrapHorizontal } from 'src/components/Layout/Horizontal/examples';

export const HorizontalPage = () => {
  return (
    <table className="table" cellSpacing={0}>
      <tr>
        <th>Property</th>
        <th>App-Studio</th>
      </tr>
      <tbody>
        <tr>
          <td>Wrap</td>
          <td>
            <WrapHorizontal />
          </td>
        </tr>
        <tr>
          <td>IsReversed</td>

          <td>
            <ReversedHorizontal />
          </td>
        </tr>
        <tr>
          <td>Justify</td>
          <td>
            <JustifyHorizontal />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default HorizontalPage;
