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
// Defines the main `Accordion` component, which orchestrates state management using `useAccordionState` and provides context to its sub-components (`Item`, `Trigger`, `Content`) to render a complete and functional accordion UI.
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
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
