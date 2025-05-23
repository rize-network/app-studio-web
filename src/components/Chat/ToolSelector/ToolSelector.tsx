/**
 * ToolSelector Component
 *
 * A component for selecting AI tools and capabilities to use in a conversation.
 */

import React from 'react';
import { ToolSelectorProps } from './ToolSelector/ToolSelector.props';
import { ToolSelectorView } from './ToolSelector/ToolSelector.view';

export const ToolSelector: React.FC<ToolSelectorProps> = (props) => {
  return <ToolSelectorView {...props} />;
};

export type { ToolSelectorProps } from './ToolSelector/ToolSelector.props';
export type { AITool } from './ToolSelector/ToolSelector.type';
