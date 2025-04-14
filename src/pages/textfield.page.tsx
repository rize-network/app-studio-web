import React from 'react';
import {
  IsClearableDemo,
  ColorSchemeDemo,
  DefaultInput,
  DesignSystemTextFields,
  DisabledInput,
  LabelInput,
  LeftInput,
  Placeholder,
  ReadOnlyInput,
  RightInput,
  ShapesInput,
  SizeInput,
  StyledInput,
  VariantsInput,
} from 'src/components/Form/TextField/examples';
import { View } from 'src/components/Layout/View/View';

export const InputPage = () => {
  return (
    <View>
      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>
          <tr>
            <td>Design System</td>
            <td>
              <DesignSystemTextFields />
            </td>
          </tr>

          <tr>
            <td>Default</td>
            <td>
              <DefaultInput />
            </td>
          </tr>
          <tr>
            <td>Disabled</td>

            <td>
              <DisabledInput />
            </td>
          </tr>
          <tr>
            <td>ReadOnly</td>

            <td>
              <ReadOnlyInput />
            </td>
          </tr>
          <tr>
            <td>Label</td>
            <td>
              <LabelInput />
            </td>
          </tr>
          <tr>
            <td>Placeholder</td>
            <td>
              <Placeholder />
            </td>
          </tr>
          <tr>
            <td>Clear</td>
            <td>
              <IsClearableDemo />
            </td>
          </tr>
          <tr>
            <td>ColorScheme</td>
            <td>
              <ColorSchemeDemo />
            </td>
          </tr>
          <tr>
            <td>Sizes</td>
            <td>
              <SizeInput />
            </td>
          </tr>

          <tr>
            <td>Variants</td>
            <td>
              <VariantsInput />
            </td>
          </tr>
          <tr>
            <td>Shape</td>
            <td>
              <ShapesInput />
            </td>
          </tr>
          <tr>
            <td>LeftChild</td>
            <td>
              <LeftInput />
            </td>
          </tr>
          <tr>
            <td>RightChild</td>
            <td>
              <RightInput />
            </td>
          </tr>
          <tr>
            <td>Styles</td>
            <td>
              <StyledInput />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default InputPage;
