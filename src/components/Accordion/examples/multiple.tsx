import React from 'react';
import { Accordion } from '../Accordion';
import { Text, Vertical } from 'app-studio';

export const MultipleAccordion = () => {
  return (
    <Vertical gap={20} width="100%" maxWidth={600}>
      <Text marginBottom={10}>Multiple Expanded Items</Text>
      <Accordion type="multiple" defaultValue={['multi-1']}>
        <Accordion.Item value="multi-1">
          <Accordion.Trigger>
            <Text fontWeight="bold">First Item (Initially Expanded)</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text>
              This item is initially expanded. You can expand multiple items at
              once in this accordion.
            </Text>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="multi-2">
          <Accordion.Trigger>
            <Text fontWeight="bold">Second Item</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text>
              This is the second item. Try expanding this while the first item
              is still open.
            </Text>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="multi-3">
          <Accordion.Trigger>
            <Text fontWeight="bold">Third Item</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text>
              This is the third item. You can have all three items expanded at
              once.
            </Text>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Vertical>
  );
};
