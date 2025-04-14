/**
 * ToolSelector Props
 */

import { ViewProps } from 'app-studio';
import { AITool, ToolSelectorStyles } from './ToolSelector.type';

export interface ToolSelectorProps extends ViewProps {
  /**
   * List of available tools
   */
  tools: AITool[];

  /**
   * Currently selected tool IDs
   */
  selectedToolIds: string[];

  /**
   * Callback function when a tool is selected or deselected
   */
  onToolToggle: (toolId: string) => void;

  /**
   * Whether to group tools by category
   */
  groupByCategory?: boolean;

  /**
   * Whether to show tool descriptions
   */
  showDescriptions?: boolean;

  /**
   * Whether to show tool icons
   */
  showIcons?: boolean;

  /**
   * Whether the selector is disabled
   */
  isDisabled?: boolean;

  /**
   * Custom styles for the component
   */
  styles?: ToolSelectorStyles;
}
