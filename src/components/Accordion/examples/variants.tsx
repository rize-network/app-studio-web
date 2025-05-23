import React from 'react';
import { Accordion } from '../Accordion';
import { Text, Vertical } from 'app-studio';

export const AccordionVariants = () => {
  return (
    <Vertical gap={30} width="100%" maxWidth={600}>
      <Vertical gap={10}>
        <Text fontWeight="bold">Outline Variant</Text>
        <Accordion type="single" defaultValue="outline-1" variant="outline">
          <Accordion.Item value="outline-1">
            <Accordion.Trigger>
              <Text fontWeight="bold">First Item</Text>
            </Accordion.Trigger>
            <Accordion.Content>
              <Text>
                This is the content for the first item in the outline variant
                accordion.
              </Text>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="outline-2">
            <Accordion.Trigger>
              <Text fontWeight="bold">Second Item</Text>
            </Accordion.Trigger>
            <Accordion.Content>
              <Text>
                This is the content for the second item in the outline variant
                accordion.
              </Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Vertical>

      <Vertical gap={10}>
        <Text fontWeight="bold">Filled Variant</Text>
        <Accordion type="single" defaultValue="filled-1" variant="filled">
          <Accordion.Item value="filled-1">
            <Accordion.Trigger>
              <Text fontWeight="bold">First Item</Text>
            </Accordion.Trigger>
            <Accordion.Content>
              <Text>
                This is the content for the first item in the filled variant
                accordion.
              </Text>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="filled-2">
            <Accordion.Trigger>
              <Text fontWeight="bold">Second Item</Text>
            </Accordion.Trigger>
            <Accordion.Content>
              <Text>
                This is the content for the second item in the filled variant
                accordion.
              </Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Vertical>

      <Vertical gap={10}>
        <Text fontWeight="bold">Sharp Shape</Text>
        <Accordion
          type="single"
          defaultValue="sharp-1"
          shape="sharp"
          variant="outline"
        >
          <Accordion.Item value="sharp-1">
            <Accordion.Trigger>
              <Text fontWeight="bold">First Item</Text>
            </Accordion.Trigger>
            <Accordion.Content>
              <Text>
                This is the content for the first item in the sharp shape
                accordion.
              </Text>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="sharp-2">
            <Accordion.Trigger>
              <Text fontWeight="bold">Second Item</Text>
            </Accordion.Trigger>
            <Accordion.Content>
              <Text>
                This is the content for the second item in the sharp shape
                accordion.
              </Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Vertical>
    </Vertical>
  );
};
