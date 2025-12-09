import React from 'react';
import {
  IconButtons as IconButtons,
  VariantButtons,
  ShadowButton,
  ButtonSizes as ButtonSizes,
  DisabledButton,
  LoaderButtons,
  BorderMovingButtons,
  AnimatedStrokeButtons,
  ShareButtons,
  SubtleButtons,
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
          <tr>
            <td>Border Moving Effect</td>
            <td>
              <BorderMovingButtons />
            </td>
          </tr>
          <tr>
            <td>Animated Stroke Effect</td>
            <td>
              <AnimatedStrokeButtons />
            </td>
          </tr>
          <tr>
            <td>Share Button</td>
            <td>
              <ShareButtons />
            </td>
          </tr>
          <tr>
            <td>Subtle Button</td>
            <td>
              <SubtleButtons />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default ButtonPage;
