import React from 'react';
import { ViewProps } from 'app-studio';
import {
  AccordionStyles,
  Shape,
  Variant,
  AccordionType,
} from './Accordion.type';

export interface AccordionProps
  extends Omit<ViewProps, 'value' | 'defaultValue' | 'onChange'> {
  /**
   * The content of the accordion (AccordionItem components)
   */
  children: React.ReactNode;
  /**
   * Determines whether one or multiple items can be opened at the same time
   * @default 'single'
   */
  type?: AccordionType;
  /**
   * The value of the item(s) to be opened when initially rendered (uncontrolled)
   */
  defaultValue?: string | string[];
  /**
   * The controlled value of the item(s) to be opened
   */
  value?: string | string[];
  /**
   * Event handler called when the value changes
   */
  onValueChange?: (value: string | string[] | undefined) => void;
  /**
   * When type is 'single', allows closing the currently open item
   * @default false
   */
  collapsible?: boolean;
  /**
   * The shape of the accordion items
   * @default 'rounded'
   */
  shape?: Shape;
  /**
   * The visual style variant of the accordion
   * @default 'default'
   */
  variant?: Variant;
  /**
   * Custom styles for different parts of the accordion
   */
  views?: AccordionStyles;
}

export interface AccordionItemProps extends Omit<ViewProps, 'value'> {
  /**
   * Unique identifier for the accordion item
   */
  value: string;
  /**
   * The content of the accordion item
   */
  children: React.ReactNode;
  /**
   * Whether the accordion item is disabled
   */
  isDisabled?: boolean;
  /**
   * Custom styles for this specific accordion item
   */
  views?: {
    item?: ViewProps;
    trigger?: ViewProps;
    content?: ViewProps;
    icon?: ViewProps;
  };
}

export interface AccordionTriggerProps extends ViewProps {
  /**
   * The content of the accordion trigger
   */
  children: React.ReactNode;
  /**
   * Custom styles for the trigger
   */
  views?: {
    container?: ViewProps;
    icon?: ViewProps;

    /**
     * Optional theme mode override ('light' or 'dark')
     * If not provided, the component will use the theme mode from context
     */
  };
  /**
   * If true, merges props onto the immediate child, useful for custom trigger elements
   * @default false
   */
  asChild?: boolean;
}

export interface AccordionContentProps {
  /**
   * The content to be displayed when the accordion item is expanded
   */
  children: React.ReactNode;
  /**
   * Custom styles for the content
   */
  views?: {
    container?: ViewProps;
  };
}

export interface AccordionComponentType extends React.FC<AccordionProps> {
  /**
   * Individual accordion item component
   */
  Item: React.FC<AccordionItemProps>;
  /**
   * Trigger component for accordion items
   */
  Trigger: React.FC<AccordionTriggerProps>;
  /**
   * Content component for accordion items
   */
  Content: React.FC<AccordionContentProps>;
}
