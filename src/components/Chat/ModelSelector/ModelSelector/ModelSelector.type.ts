/**
 * ModelSelector Types
 */

import { ViewProps } from 'app-studio';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description?: string;
  maxTokens?: number;
  capabilities?: string[];
  tags?: string[];
  isAvailable?: boolean;
}

export interface ModelSelectorStyles {
  container?: ViewProps;
  dropdown?: ViewProps;
  option?: ViewProps;
  selectedModel?: ViewProps;
  modelInfo?: ViewProps;
}
