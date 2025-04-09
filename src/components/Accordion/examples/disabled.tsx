import React from 'react';
import { Accordion } from '../Accordion';
import { Text, Vertical } from 'app-studio';

export const DisabledAccordion = () => {
  return (
    <Vertical gap={20} width="100%" maxWidth={600}>
      <Text marginBottom={10}>Disabled Item</Text>
      <Accordion type="single" defaultValue="disabled-1" collapsible>
        <Accordion.Item value="disabled-1">
          <Accordion.Trigger>
            <Text fontWeight="bold">Regular Item</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text>
              This is a regular accordion item that can be expanded and
              collapsed.
            </Text>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="disabled-2" isDisabled>
          <Accordion.Trigger>
            <Text fontWeight="bold">Disabled Item</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text>
              This content wont be accessible because the item is disabled.
            </Text>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="disabled-3">
          <Accordion.Trigger>
            <Text fontWeight="bold">Another Regular Item</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text>
              This is another regular accordion item that can be expanded and
              collapsed.
            </Text>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Vertical>
  );
};
