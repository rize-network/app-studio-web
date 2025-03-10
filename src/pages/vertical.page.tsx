import React from 'react';
import { ReversedVertical } from 'src/components/Layout/Vertical/examples/Reversed';
import { WrapVertical } from 'src/components/Layout/Vertical/examples/Wrap';
import { DefaultVertical } from 'src/components/Layout/Vertical/examples/Default';
import { JustifyVertical } from 'src/components/Layout/Vertical/examples/Justify';

export const VerticalPage = () => {
  return (
    <table className="table" cellSpacing={0}>
      <tr>
        <th>Property</th>
        <th>App-Studio</th>
      </tr>
      <tbody>
        <tr>
          <td>Default</td>

          <td>
            <DefaultVertical />
          </td>
        </tr>
        <tr>
          <td>Wrap</td>

          <td>
            <WrapVertical />
          </td>
        </tr>
        <tr>
          <td>IsReversed</td>

          <td>
            <ReversedVertical />
          </td>
        </tr>
        <tr>
          <td>Justify</td>

          <td>
            <JustifyVertical />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default VerticalPage;
