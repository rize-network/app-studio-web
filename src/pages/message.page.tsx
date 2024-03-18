import React from 'react';
import { FileSVG } from 'src/components';
import {
  CloseButtonMessage,
  DefaultMessage,
  VariantMessage,
} from 'src/components/Message/Examples';
import { MessageLayout } from 'src/components/Message/Message/Message.layout';

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
    <MessageLayout
      icons={{
        success: 'CheckCicleSvg',
        info: 'InformationSvg',
        error: 'ErreurSvg',
        warning: 'WarningSvg',
      }}
      icon={FileSVG}
      theme={{
        info: {
          container: {
            backgroundColor: 'color.blue.200',
            border: 'color.blue.400',
          },
          icon: {
            color: 'color.blue.500',
            name: 'InformationSvg',
          },
          content: {
            color: 'color.blue.500',
          },
          close: {
            color: 'color.blue.500',
            name: 'CloseSvg',
          },
        },
        success: {
          container: {
            backgroundColor: 'color.green.200',
            border: 'color.green.400',
          },
          icon: {
            color: 'color.green.500',
            name: 'CheckCircleSvg',
          },
          content: {
            color: 'color.green.500',
          },
          close: {
            color: 'color.green.500',
            name: 'CloseSvg',
          },
        },
        error: {
          container: {
            backgroundColor: 'color.red.200',
            border: 'color.red.400',
          },
          icon: {
            color: 'color.red.500',
            name: 'ErrrorSvg',
          },
          content: {
            color: 'color.red.500',
          },
          close: {
            color: 'color.red.500',
            name: 'CloseSvg',
          },
        },
        warning: {
          container: {
            backgroundColor: 'color.orange.200',
            border: 'color.orange.400',
          },
          icon: {
            color: 'color.orange.500',
            name: 'ErrrorSvg',
          },
          content: {
            color: 'color.orange.500',
          },
          close: {
            color: 'color.orange.500',
            name: 'CloseSvg',
          },
        },
      }}
    />
  </table>
);

export default ModalPage;
