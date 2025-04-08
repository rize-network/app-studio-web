import React from 'react';
import { CustomDemo } from 'src/components/Slider/examples/custom';
import { DefaultDemo } from 'src/components/Slider/examples/default';
import { DisabledDemo } from 'src/components/Slider/examples/disabled';
import { RangeDemo } from 'src/components/Slider/examples/range';
import { SizesDemo } from 'src/components/Slider/examples/sizes';
import {
  PricingTiersDemo,
  StepValuesDemo,
} from 'src/components/Slider/examples/stepValues';
import { VariantsDemo } from 'src/components/Slider/examples/variants';
import { VerticalDemo } from 'src/components/Slider/examples/vertical';
import { TooltipDemo } from 'src/components/Slider/examples/tooltip';
import { ControlledDemo } from 'src/components/Slider/examples/controlled';

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

        <tr>
          <td>Step Values</td>
          <td>
            <StepValuesDemo />
          </td>
        </tr>

        <tr>
          <td>Pricing Tiers</td>
          <td>
            <PricingTiersDemo />
          </td>
        </tr>

        <tr>
          <td>Controlled Slider</td>
          <td>
            <ControlledDemo />
          </td>
        </tr>

        <tr>
          <td>Vertical Slider</td>
          <td>
            <VerticalDemo />
          </td>
        </tr>

        <tr>
          <td>Tooltip</td>
          <td>
            <TooltipDemo />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default LinkPage;
