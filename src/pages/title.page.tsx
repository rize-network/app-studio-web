import React from 'react';
import { View } from 'app-studio';
import {
  DefaultTitle,
  HighlightedTitle,
  AnimatedTitle,
  HeroTitle,
  ResponsiveTitle,
  CustomTitle,
  DirectAnimationExample,
  GradientTest,
  HighlightTest,
  AlternatingTitle,
} from 'src/components/Title/examples';

/**
 * Title component showcase page
 */
const TitlePage = () => {
  return (
    <View padding={32}>
      <table>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>

          <tr>
            <td>Default</td>
            <td>
              <DefaultTitle />
            </td>
          </tr>

          <tr>
            <td>Highlighted</td>
            <td>
              <HighlightedTitle />
            </td>
          </tr>

          <tr>
            <td>Animated</td>
            <td>
              <AnimatedTitle />
            </td>
          </tr>

          <tr>
            <td>Hero Example</td>
            <td>
              <HeroTitle />
            </td>
          </tr>

          <tr>
            <td>Responsive</td>
            <td>
              <ResponsiveTitle />
            </td>
          </tr>

          <tr>
            <td>Custom Styling</td>
            <td>
              <CustomTitle />
            </td>
          </tr>

          <tr>
            <td>Direct Animation</td>
            <td>
              <DirectAnimationExample />
            </td>
          </tr>

          <tr>
            <td>Gradient Test</td>
            <td>
              <GradientTest />
            </td>
          </tr>

          <tr>
            <td>Highlight Test</td>
            <td>
              <HighlightTest />
            </td>
          </tr>

          <tr>
            <td>Alternating Highlight</td>
            <td>
              <AlternatingTitle />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default TitlePage;
