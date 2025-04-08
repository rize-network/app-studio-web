import React, { useState } from 'react';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Text } from '../../Text/Text';
import { Slider } from '../Slider';

export const StepValuesDemo = () => {
  const [value, setValue] = useState(25);

  // Define specific values that the slider can take
  const stepValues = [0, 25, 50, 75, 100];

  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <Slider
        label="Slider with Specific Steps"
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        stepValues={stepValues}
        showValue
        helperText="This slider only allows values: 0, 25, 50, 75, 100"
      />

      <Horizontal justifyContent="space-between" width="100%">
        {stepValues.map((step) => (
          <Text key={step} fontSize={12} color="color.blueGray.500">
            {step}
          </Text>
        ))}
      </Horizontal>
    </Vertical>
  );
};

export const PricingTiersDemo = () => {
  const [value, setValue] = useState(19.99);

  // Define pricing tiers
  const pricingTiers = [9.99, 19.99, 29.99, 49.99, 99.99];

  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <Text fontSize={16} fontWeight={500}>
        Select Your Pricing Plan
      </Text>

      <Slider
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        stepValues={pricingTiers}
        showValue
        views={{
          track: {
            backgroundColor: 'color.green.100',
            height: 8,
          },
          progress: {
            backgroundColor: 'color.green.500',
          },
          thumb: {
            backgroundColor: 'white',
            border: '2px solid color.green.500',
          },
          valueLabel: {
            backgroundColor: 'color.green.500',
            color: 'white',
            padding: '2px 8px',
            borderRadius: 4,
            fontWeight: 600,
          },
          stepMarks: {
            width: 6,
            height: 6,
            backgroundColor: 'color.green.700',
          },
        }}
      />

      <Horizontal justifyContent="space-between" width="100%">
        {pricingTiers.map((price) => (
          <Text
            key={price}
            fontSize={12}
            color="color.green.700"
            fontWeight={500}
          >
            ${price}
          </Text>
        ))}
      </Horizontal>

      <Text fontSize={14} color="color.blueGray.600" textAlign="center">
        Selected Plan: ${value}/month
      </Text>
    </Vertical>
  );
};
