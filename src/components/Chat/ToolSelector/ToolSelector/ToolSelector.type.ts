/**
 * ToolSelector Types
 */

import { ViewProps } from 'app-studio';

export interface AITool {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  category?: string;
  isEnabled?: boolean;
}

export interface ToolSelectorStyles {
  container?: ViewProps;
  toolsContainer?: ViewProps;
  toolItem?: ViewProps;
  toolIcon?: ViewProps;
  toolInfo?: ViewProps;
  categoryHeader?: ViewProps;
}
