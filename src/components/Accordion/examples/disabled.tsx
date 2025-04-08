import React from 'react';
import { Accordion } from '../Accordion';
import { Text, Vertical } from 'app-studio';

export const DisabledAccordion = () => {
  return (
    <Vertical gap={20} width="100%" maxWidth={600}>
      <Text marginBottom={10}>Disabled Item</Text>
      <Accordion>
        <Accordion.Item id="disabled-1">
          <Accordion.Header>
            <Text fontWeight="bold">Regular Item</Text>
          </Accordion.Header>
          <Accordion.Content>
            <Text>
              This is a regular accordion item that can be expanded and
              collapsed.
            </Text>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item id="disabled-2" isDisabled>
          <Accordion.Header>
            <Text fontWeight="bold">Disabled Item</Text>
          </Accordion.Header>
          <Accordion.Content>
            <Text>
              This content wont be accessible because the item is disabled.
            </Text>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item id="disabled-3">
          <Accordion.Header>
            <Text fontWeight="bold">Another Regular Item</Text>
          </Accordion.Header>
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
