import React from 'react';
import { Accordion } from '../Accordion';
import { Text, Vertical } from 'app-studio';

export const CollapsibleAccordion = () => {
  return (
    <Vertical gap={20} width="100%" maxWidth={600}>
      <Text marginBottom={10}>Collapsible Accordion (Single)</Text>
      <Accordion type="single" defaultValue="item-1" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>
            <Text fontWeight="bold">Question 1</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text>
              This is the answer to question 1. Since `collapsible` is true, you
              can click the trigger again to close this item, even though its
              the only one.
            </Text>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Trigger>
            <Text fontWeight="bold">Question 2</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text>
              This is the answer to question 2. Only one item can be open, but
              it can be closed entirely.
            </Text>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Vertical>
  );
};
