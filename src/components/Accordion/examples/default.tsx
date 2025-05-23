import React from 'react';
import { Accordion } from '../Accordion';
import { Text, Vertical } from 'app-studio';

export const DefaultAccordion = () => {
  return (
    <Vertical gap={20} width="100%" maxWidth={600}>
      <Text marginBottom={10}>Default Accordion (Single)</Text>
      <Accordion type="single" defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>
            <Text fontWeight="bold">What is React?</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text>
              React is a JavaScript library for building user interfaces. It is
              maintained by Facebook and a community of individual developers
              and companies. React can be used as a base in the development of
              single-page or mobile applications.
            </Text>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Trigger>
            <Text fontWeight="bold">What are React Hooks?</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text>
              Hooks are functions that let you hook into React state and
              lifecycle features from function components. Hooks dont work
              inside classes — they let you use React without classes.
            </Text>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-3">
          <Accordion.Trigger>
            <Text fontWeight="bold">What is JSX?</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text>
              JSX is a syntax extension for JavaScript. It was written to be
              used with React and looks a lot like HTML. Because JSX is
              JavaScript, you can use variables inside it.
            </Text>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Vertical>
  );
};
