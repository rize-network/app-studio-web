import React from 'react';
import { View } from 'src/components';
import {
  CloseButtonMessage,
  DefaultMessage,
  VariantMessage,
} from 'src/components/Message/Examples';
import { MessageLayout } from 'src/components/Message/Message/Message.layout';

export const ModalPage = () => (
  <View>
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
      <MessageLayout />
    </table>
  </View>
);

export default ModalPage;
