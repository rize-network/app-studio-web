import React from 'react';
import {
  IconButtons as IconButtons,
  VariantButtons,
  ShadowButton,
  ButtonSizes as ButtonSizes,
  DisabledButton,
  LoaderButtons,
} from 'src/components/Button/examples';
import { View } from 'app-studio';
export const ButtonPage = () => {
  return (
    <View>
      <table>
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
            <td>Icon</td>
            <td>
              <IconButtons />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default ButtonPage;
