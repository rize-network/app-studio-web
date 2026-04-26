import React from 'react';
import { ViewProps } from 'app-studio';
import {
  AccordionStyles,
  Shape,
  Variant,
  AccordionType,
} from './Accordion.type';
// Defines the core properties for the Accordion root component, extending ViewProps and omitting conflicting properties.
export interface AccordionProps
  extends Omit<ViewProps, 'value' | 'defaultValue' | 'onChange'> {
  // Specifies the child elements of the Accordion, typically a collection of AccordionItem components.
  children: React.ReactNode;
  // Determines the accordion's behavior, such as allowing single or multiple items to be open simultaneously.
  type?: AccordionType;
  // Sets the initial open state of the accordion items when the component is uncontrolled.
  defaultValue?: string | string[];
  // Controls the open state of accordion items, making the component controlled by its parent.
  value?: string | string[];
  // Callback function invoked when the open state of accordion items changes.
  onValueChange?: (value: string | string[] | undefined) => void;
  // If true, allows all accordion items to be closed, even when `type` is set to 'single'.
  collapsible?: boolean;
  // Defines the visual shape or border style for the accordion component.
  shape?: Shape;
  // Specifies the visual variant or theme for the accordion component.
  variant?: Variant;
  // Customizes the styling properties for various sub-parts of the Accordion component.
  views?: AccordionStyles;
}
// Defines the properties for an individual Accordion item component.
export interface AccordionItemProps extends Omit<ViewProps, 'value'> {
  // A unique string identifier for the accordion item, used for controlling its state.
  value: string;
  // Content to be rendered within the accordion item, usually `AccordionTrigger` and `AccordionContent`.
  children: React.ReactNode;
  // If true, the accordion item cannot be opened or closed by user interaction.
  isDisabled?: boolean;
  // Customizes the styling for the item's container, trigger, content, and icon.
  views?: {
    item?: ViewProps;
    trigger?: ViewProps;
    content?: ViewProps;
    icon?: ViewProps;
  };
}
// Defines the properties for the clickable header (trigger) of an Accordion item.
export interface AccordionTriggerProps extends ViewProps {
  // Content to be rendered inside the Accordion trigger, typically the item's title or label.
  children: React.ReactNode;
  // Customizes the styling for the trigger's container and the expansion/collapse icon.
  views?: {
    container?: ViewProps;
    icon?: ViewProps;
  };
  // If true, the trigger renders as its child element, passing all its props to the child.
  asChild?: boolean;
}
// Defines the properties for the collapsible content area of an Accordion item.
export interface AccordionContentProps {
  // Content to be rendered inside the Accordion when the item is open.
  children: React.ReactNode;
  // Customizes the styling for the content's container.
  views?: {
    container?: ViewProps;
  };
}
// Defines the static properties and sub-components available on the Accordion component.
export interface AccordionComponentType extends React.FC<AccordionProps> {
  // Represents the Accordion Item sub-component, used for grouping trigger and content.
  Item: React.FC<AccordionItemProps>;
  // Represents the Accordion Trigger sub-component, which acts as the clickable header.
  Trigger: React.FC<AccordionTriggerProps>;
  // Represents the Accordion Content sub-component, which holds the collapsible body.
  Content: React.FC<AccordionContentProps>;
}
