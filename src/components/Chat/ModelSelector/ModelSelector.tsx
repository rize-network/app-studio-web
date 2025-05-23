/**
 * ModelSelector Component
 *
 * A dropdown component for selecting AI models with filtering and grouping options.
 */

import React from 'react';
import { ModelSelectorProps } from './ModelSelector/ModelSelector.props';
import { useModelSelectorState } from './ModelSelector/ModelSelector.state';
import { ModelSelectorView } from './ModelSelector/ModelSelector.view';

export const ModelSelector: React.FC<ModelSelectorProps> = (props) => {
  const { models, selectedModelId, enableSearch = false } = props;

  const {
    isOpen,
    searchQuery,
    filteredModels,
    toggleDropdown,
    closeDropdown,
    handleSearchChange,
  } = useModelSelectorState(models, selectedModelId, enableSearch);

  return (
    <ModelSelectorView
      {...props}
      isOpen={isOpen}
      searchQuery={searchQuery}
      filteredModels={filteredModels}
      toggleDropdown={toggleDropdown}
      closeDropdown={closeDropdown}
      handleSearchChange={handleSearchChange}
    />
  );
};

export type { ModelSelectorProps } from './ModelSelector/ModelSelector.props';
export type { AIModel } from './ModelSelector/ModelSelector.type';
