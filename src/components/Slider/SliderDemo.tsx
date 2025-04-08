import React from 'react';
import { Vertical } from '../Layout/Vertical/Vertical';
import { Text } from '../Text/Text';
import { View } from '../Layout/View/View';
import { DefaultDemo } from './examples/default';
import { SizesDemo } from './examples/sizes';
import { ShapesDemo } from './examples/shapes';
import { VariantsDemo } from './examples/variants';
import { CustomDemo } from './examples/custom';
import { DisabledDemo } from './examples/disabled';
import { RangeDemo } from './examples/range';

const SliderDemo = () => {
  return (
    <Vertical padding={20} gap={40}>
      <View>
        <Text heading="h2" marginBottom={10}>
          Slider Component
        </Text>
        <Text>
          A customizable slider component for selecting values from a range.
        </Text>
      </View>

      <View>
        <Text heading="h3" marginBottom={20}>
          Default Slider
        </Text>
        <DefaultDemo />
      </View>

      <View>
        <Text heading="h3" marginBottom={20}>
          Slider Sizes
        </Text>
        <SizesDemo />
      </View>

      <View>
        <Text heading="h3" marginBottom={20}>
          Slider Shapes
        </Text>
        <ShapesDemo />
      </View>

      <View>
        <Text heading="h3" marginBottom={20}>
          Slider Variants
        </Text>
        <VariantsDemo />
      </View>

      <View>
        <Text heading="h3" marginBottom={20}>
          Disabled Slider
        </Text>
        <DisabledDemo />
      </View>

      <View>
        <Text heading="h3" marginBottom={20}>
          Custom Styled Slider
        </Text>
        <CustomDemo />
      </View>

      <View>
        <Text heading="h3" marginBottom={20}>
          Range Slider Example
        </Text>
        <RangeDemo />
      </View>
    </Vertical>
  );
};

export default SliderDemo;
