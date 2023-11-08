import React from 'react';
import {
  BlurModal,
  CloseButtonModal,
  DefaultModal,
  FullScreenModal,
  ModalPosition,
  PreventClose,
  ScrollModal,
  ShadowModal,
  VariantModal,
} from 'src/components/Modal/Examples';

export const ModalPage = () => (
  <table className="table" cellSpacing={0}>
    <tr>
      <th>Property</th>
      <th>App-Studio</th>
    </tr>
    <tr>
      <td>Default</td>
      <td>
        <DefaultModal />
      </td>
    </tr>
    <tr>
      <td>Position</td>
      <td>
        <ModalPosition />
      </td>
    </tr>
    <tr>
      <td>PreventClose</td>
      <td>
        <PreventClose />
      </td>
    </tr>
    <tr>
      <td>Blur</td>
      <td>
        <BlurModal />
      </td>
    </tr>
    <tr>
      <td>FullScreen</td>

      <td>
        <FullScreenModal />
      </td>
    </tr>
    <tr>
      <td>Close Button</td>

      <td>
        <CloseButtonModal />
      </td>
    </tr>
    <tr>
      <td>Scroll</td>

      <td>
        <ScrollModal />
      </td>
    </tr>
    <tr>
      <td>Variant</td>

      <td>
        <VariantModal />
      </td>
    </tr>
    <tr>
      <td>Shadow</td>

      <td>
        <ShadowModal />
      </td>
    </tr>
  </table>
);

export default ModalPage;
