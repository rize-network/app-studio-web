import React from 'react';
import {
  CloseButtonMessage,
  DefaultMessage,
  VariantMessage,
} from 'src/components/Message/Examples';

export const ModalPage = () => (
  <table className="table" cellSpacing={0}>
    <tr>
      <th>Property</th>
      <th>App-Studio</th>
    </tr>
    <tr>
      <td>DefaultMessage</td>
      <td>
        <DefaultMessage />
      </td>
    </tr>
    <tr>
      <td>CloseButtonMessage</td>
      <td>
        <CloseButtonMessage />
      </td>
    </tr>
    <tr>
      <td>VariantMessage</td>
      <td>
        <VariantMessage />
      </td>
    </tr>
  </table>
);

export default ModalPage;
