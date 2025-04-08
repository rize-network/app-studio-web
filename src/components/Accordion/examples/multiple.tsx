import React from 'react';
import { Accordion } from '../Accordion';
import { Text, Vertical } from 'app-studio';

export const MultipleAccordion = () => {
  return (
    <Vertical gap={20} width="100%" maxWidth={600}>
      <Text marginBottom={10}>Multiple Expanded Items</Text>
      <Accordion allowMultiple defaultExpandedItems={['multi-1']}>
        <Accordion.Item id="multi-1">
          <Accordion.Header>
            <Text fontWeight="bold">First Item (Initially Expanded)</Text>
          </Accordion.Header>
          <Accordion.Content>
            <Text>
              This item is initially expanded. You can expand multiple items at once in this accordion.
            </Text>
          </Accordion.Content>
        </Accordion.Item>
        
        <Accordion.Item id="multi-2">
          <Accordion.Header>
            <Text fontWeight="bold">Second Item</Text>
          </Accordion.Header>
          <Accordion.Content>
            <Text>
              This is the second item. Try expanding this while the first item is still open.
            </Text>
          </Accordion.Content>
        </Accordion.Item>
        
        <Accordion.Item id="multi-3">
          <Accordion.Header>
            <Text fontWeight="bold">Third Item</Text>
          </Accordion.Header>
          <Accordion.Content>
            <Text>
              This is the third item. You can have all three items expanded at once.
            </Text>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Vertical>
  );
};
