import React from 'react';
import { View } from 'app-studio';
import {
  DefaultTooltip,
  TooltipPositions,
  TooltipVariants,
  TooltipSizes,
  CustomTooltip,
  TooltipIntegration,
} from 'src/components/Tooltip/examples';

const TooltipPage = () => {
  return (
    <View>
      <table>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>

          <tr>
            <td>Default</td>
            <td>
              <DefaultTooltip />
            </td>
          </tr>

          <tr>
            <td>Positions</td>
            <td>
              <TooltipPositions />
            </td>
          </tr>

          <tr>
            <td>Variants</td>
            <td>
              <TooltipVariants />
            </td>
          </tr>

          <tr>
            <td>Sizes</td>
            <td>
              <TooltipSizes />
            </td>
          </tr>

          <tr>
            <td>Custom</td>
            <td>
              <CustomTooltip />
            </td>
          </tr>

          <tr>
            <td>Integration</td>
            <td>
              <TooltipIntegration />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default TooltipPage;
