import React from 'react';
import { ViewProps } from 'app-studio';
import { AccordionStyles, Shape, Variant } from './Accordion.type';

export interface AccordionProps {
  /**
   * The content of the accordion (AccordionItem components)
   */
  children: React.ReactNode;
  /**
   * Whether multiple items can be expanded at once
   */
  allowMultiple?: boolean;
  /**
   * Default expanded item IDs
   */
  defaultExpandedItems?: string[];
  /**
   * The shape of the accordion items
   */
  shape?: Shape;
  /**
   * The visual style variant of the accordion
   */
  variant?: Variant;
  /**
   * Custom styles for different parts of the accordion
   */
  views?: AccordionStyles;
}

export interface AccordionItemProps {
  /**
   * Unique identifier for the accordion item
   */
  id: string;
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
    header?: ViewProps;
    content?: ViewProps;
    icon?: ViewProps;
  };
}

export interface AccordionHeaderProps {
  /**
   * The content of the accordion header
   */
  children: React.ReactNode;
  /**
   * Custom styles for the header
   */
  views?: {
    container?: ViewProps;
    icon?: ViewProps;
  };
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

export interface AccordionType extends React.FC<AccordionProps> {
  /**
   * Individual accordion item component
   */
  Item: React.FC<AccordionItemProps>;
  /**
   * Header component for accordion items
   */
  Header: React.FC<AccordionHeaderProps>;
  /**
   * Content component for accordion items
   */
  Content: React.FC<AccordionContentProps>;
}
