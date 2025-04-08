import React from 'react';
import { CustomDemo } from 'src/components/Slider/examples/custom';
import { DefaultDemo } from 'src/components/Slider/examples/default';
import { DisabledDemo } from 'src/components/Slider/examples/disabled';
import { RangeDemo } from 'src/components/Slider/examples/range';
import { SizesDemo } from 'src/components/Slider/examples/sizes';
import { VariantsDemo } from 'src/components/Slider/examples/variants';

export const LinkPage = () => {
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
            <DefaultDemo />
          </td>
        </tr>
        <tr>
          <td>Sizes</td>
          <td>
            <SizesDemo />
          </td>
        </tr>
        <tr>
          <td>Variants</td>
          <td>
            <VariantsDemo />
          </td>
        </tr>
        <tr>
          <td>Disabled</td>
          <td>
            <DisabledDemo />
          </td>
        </tr>
        <tr>
          <td>Custom</td>
          <td>
            <CustomDemo />
          </td>
        </tr>
        <tr>
          <td>Range</td>
          <td>
            <RangeDemo />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default LinkPage;
