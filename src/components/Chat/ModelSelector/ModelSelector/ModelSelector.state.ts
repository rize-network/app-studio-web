/**
 * ModelSelector State
 */

import { useState, useEffect } from 'react';
import { AIModel } from './ModelSelector.type';

export const useModelSelectorState = (
  models: AIModel[],
  selectedModelId: string,
  enableSearch: boolean
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredModels, setFilteredModels] = useState<AIModel[]>(models);

  // Update filtered models when models, search query, or grouping changes
  useEffect(() => {
    if (!enableSearch || !searchQuery.trim()) {
      setFilteredModels(models);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = models.filter(
      (model) =>
        model.name.toLowerCase().includes(query) ||
        model.provider.toLowerCase().includes(query) ||
        (model.description &&
          model.description.toLowerCase().includes(query)) ||
        (model.tags &&
          model.tags.some((tag) => tag.toLowerCase().includes(query)))
    );

    setFilteredModels(filtered);
  }, [models, searchQuery, enableSearch]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return {
    isOpen,
    searchQuery,
    filteredModels,
    toggleDropdown,
    closeDropdown,
    handleSearchChange,
  };
};
