/**
 * ModelSelector Props
 */

import { ViewProps } from 'app-studio';
import { AIModel, ModelSelectorStyles } from './ModelSelector.type';

export interface ModelSelectorProps extends ViewProps {
  /**
   * List of available models
   */
  models: AIModel[];

  /**
   * Currently selected model ID
   */
  selectedModelId: string;

  /**
   * Callback function when a model is selected
   */
  onModelSelect: (modelId: string) => void;

  /**
   * Whether to show model details
   */
  showModelDetails?: boolean;

  /**
   * Whether to group models by provider
   */
  groupByProvider?: boolean;

  /**
   * Whether to show a search input
   */
  enableSearch?: boolean;

  /**
   * Whether the selector is disabled
   */
  isDisabled?: boolean;

  /**
   * Custom styles for the component
   */
  styles?: ModelSelectorStyles;
}
