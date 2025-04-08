import React from 'react';
import { Accordion } from '../Accordion';
import { Text, Vertical } from 'app-studio';

export const AccordionVariants = () => {
  return (
    <Vertical gap={30} width="100%" maxWidth={600}>
      <Vertical gap={10}>
        <Text fontWeight="bold">Outline Variant</Text>
        <Accordion variant="outline">
          <Accordion.Item id="outline-1">
            <Accordion.Header>
              <Text fontWeight="bold">First Item</Text>
            </Accordion.Header>
            <Accordion.Content>
              <Text>
                This is the content for the first item in the outline variant accordion.
              </Text>
            </Accordion.Content>
          </Accordion.Item>
          
          <Accordion.Item id="outline-2">
            <Accordion.Header>
              <Text fontWeight="bold">Second Item</Text>
            </Accordion.Header>
            <Accordion.Content>
              <Text>
                This is the content for the second item in the outline variant accordion.
              </Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Vertical>
      
      <Vertical gap={10}>
        <Text fontWeight="bold">Filled Variant</Text>
        <Accordion variant="filled">
          <Accordion.Item id="filled-1">
            <Accordion.Header>
              <Text fontWeight="bold">First Item</Text>
            </Accordion.Header>
            <Accordion.Content>
              <Text>
                This is the content for the first item in the filled variant accordion.
              </Text>
            </Accordion.Content>
          </Accordion.Item>
          
          <Accordion.Item id="filled-2">
            <Accordion.Header>
              <Text fontWeight="bold">Second Item</Text>
            </Accordion.Header>
            <Accordion.Content>
              <Text>
                This is the content for the second item in the filled variant accordion.
              </Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Vertical>
      
      <Vertical gap={10}>
        <Text fontWeight="bold">Sharp Shape</Text>
        <Accordion shape="sharp" variant="outline">
          <Accordion.Item id="sharp-1">
            <Accordion.Header>
              <Text fontWeight="bold">First Item</Text>
            </Accordion.Header>
            <Accordion.Content>
              <Text>
                This is the content for the first item in the sharp shape accordion.
              </Text>
            </Accordion.Content>
          </Accordion.Item>
          
          <Accordion.Item id="sharp-2">
            <Accordion.Header>
              <Text fontWeight="bold">Second Item</Text>
            </Accordion.Header>
            <Accordion.Content>
              <Text>
                This is the content for the second item in the sharp shape accordion.
              </Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Vertical>
    </Vertical>
  );
};
