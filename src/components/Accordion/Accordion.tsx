import React from 'react';
import { AccordionProps, AccordionType } from './Accordion/Accordion.props';
import { useAccordionState } from './Accordion/Accordion.state';
import { 
  AccordionProvider, 
  AccordionItem, 
  AccordionHeader, 
  AccordionContent,
  AccordionView
} from './Accordion/Accordion.view';

/**
 * Accordion component for displaying collapsible content panels.
 */
const AccordionComponent: React.FC<AccordionProps> = ({ 
  children,
  allowMultiple = false,
  defaultExpandedItems = [],
  shape = 'rounded',
  variant = 'default',
  views,
}) => {
  const { expandedItems, toggleItem, isItemExpanded } = useAccordionState(
    defaultExpandedItems,
    allowMultiple
  );

  return (
    <AccordionProvider 
      value={{ 
        expandedItems, 
        toggleItem, 
        isItemExpanded 
      }}
    >
      <AccordionView
        shape={shape}
        variant={variant}
        views={views}
      >
        {children}
      </AccordionView>
    </AccordionProvider>
  );
};

export const Accordion = AccordionComponent as AccordionType;

// Assign the sub-components to the main component
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;
