import React from 'react';
import {
  AccordionProps,
  AccordionComponentType,
} from './Accordion/Accordion.props';
import { useAccordionState } from './Accordion/Accordion.state';
import {
  AccordionProvider,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionView,
} from './Accordion/Accordion.view';

/**
 * Accordion component for displaying collapsible content panels.
 *
 * @example
 * ```tsx
 * <Accordion type="single" defaultValue="item-1" collapsible>
 *   <Accordion.Item value="item-1">
 *     <Accordion.Trigger>Section 1</Accordion.Trigger>
 *     <Accordion.Content>Content for section 1</Accordion.Content>
 *   </Accordion.Item>
 *   <Accordion.Item value="item-2">
 *     <Accordion.Trigger>Section 2</Accordion.Trigger>
 *     <Accordion.Content>Content for section 2</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 * ```
 */
const AccordionComponent: React.FC<AccordionProps> = ({
  children,
  type = 'single',
  value,
  defaultValue,
  onValueChange,
  collapsible = false,
  shape = 'rounded',
  variant = 'default',
  views,
  ...props
}) => {
  // For backward compatibility
  const legacyDefaultValue = Array.isArray(defaultValue)
    ? defaultValue
    : defaultValue
    ? [defaultValue]
    : undefined;

  const accordionState = useAccordionState({
    type,
    value,
    defaultValue: defaultValue ?? legacyDefaultValue,
    onValueChange,
    collapsible,
  });

  return (
    <AccordionProvider
      value={{
        expandedItems: accordionState.expandedItems,
        toggleItem: accordionState.toggleItem,
        isItemExpanded: accordionState.isItemExpanded,
        type: accordionState.type,
        collapsible: accordionState.collapsible,
        baseId: accordionState.baseId,
      }}
    >
      <AccordionView
        shape={shape}
        variant={variant}
        views={views}
        baseId={accordionState.baseId}
        type={accordionState.type}
        collapsible={accordionState.collapsible}
        {...props}
      >
        {children}
      </AccordionView>
    </AccordionProvider>
  );
};

export const Accordion = AccordionComponent as AccordionComponentType;

// Assign the sub-components to the main component
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
