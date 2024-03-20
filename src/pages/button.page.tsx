import React from 'react';
import {
  BorderedButtons,
  ButtonSizes,
  ColoredButtons,
  DisabledButton,
  EffectButton,
  IconButtons,
  LoaderButtons,
  ShadowButton,
  VariantButtons,
} from 'src/components/Button/examples';
import { View } from 'src/components/Layout/View/View';
export const ButtonPage = () => {
  return (
    <View>
      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>

          <tr>
            <td>IsDisabled</td>
            <td>
              <DisabledButton />
            </td>
          </tr>
          <tr>
            <td>Sizes</td>

            <td>
              <ButtonSizes />
            </td>
          </tr>
          <tr>
            <td>Colors</td>

            <td>
              <ColoredButtons />
            </td>
          </tr>
          <tr>
            <td>Shadow</td>

            <td>
              <ShadowButton />
            </td>
          </tr>
          <tr>
            <td>isLoader</td>
            <td>
              <LoaderButtons />
            </td>
          </tr>
          <tr>
            <td>Variant</td>

            <td>
              <VariantButtons />
            </td>
          </tr>
          <tr>
            <td>Bordered</td>

            <td>
              <BorderedButtons />
            </td>
          </tr>
          <tr>
            <td>Icon</td>
            <td>
              <IconButtons />
            </td>
          </tr>
          <tr>
            <td>Effect</td>
            <td>
              <EffectButton />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default ButtonPage;
