/**
 * ModelSelector View
 */

import React, { useRef, useEffect } from 'react';
import { View } from 'app-studio';
import { Vertical } from '../../../Layout/Vertical/Vertical';
import { Horizontal } from '../../../Layout/Horizontal/Horizontal';
import { Text } from '../../../Text/Text';
import { ModelSelectorProps } from './ModelSelector.props';
import { AIModel } from './ModelSelector.type';
import {
  containerStyles,
  selectedModelStyles,
  dropdownStyles,
  searchInputStyles,
  optionStyles,
  providerGroupStyles,
  modelInfoStyles,
} from './ModelSelector.style';

interface Props extends ModelSelectorProps {
  isOpen: boolean;
  searchQuery: string;
  filteredModels: AIModel[];
  toggleDropdown: () => void;
  closeDropdown: () => void;
  handleSearchChange: (query: string) => void;
}

export const ModelSelectorView: React.FC<Props> = ({
  models,
  selectedModelId,
  onModelSelect,
  showModelDetails = false,
  groupByProvider = false,
  enableSearch = false,
  isDisabled = false,
  styles = {},
  isOpen,
  searchQuery,
  filteredModels,
  toggleDropdown,
  closeDropdown,
  handleSearchChange,
  ...props
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedModel = models.find((model) => model.id === selectedModelId);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeDropdown]);

  // Group models by provider if needed
  const getGroupedModels = () => {
    if (!groupByProvider) {
      return { ungrouped: filteredModels };
    }

    return filteredModels.reduce<Record<string, AIModel[]>>((acc, model) => {
      const provider = model.provider || 'Other';
      if (!acc[provider]) {
        acc[provider] = [];
      }
      acc[provider].push(model);
      return acc;
    }, {});
  };

  const groupedModels = getGroupedModels();

  return (
    <View
      {...containerStyles}
      {...props}
      {...styles.container}
      ref={dropdownRef}
    >
      <View
        {...selectedModelStyles}
        {...styles.selectedModel}
        onClick={isDisabled ? undefined : toggleDropdown}
        opacity={isDisabled ? 0.6 : 1}
      >
        <Text>{selectedModel ? selectedModel.name : 'Select a model'}</Text>
        <Text>{isOpen ? '▲' : '▼'}</Text>
      </View>

      {isOpen && (
        <Vertical {...dropdownStyles} {...styles.dropdown}>
          {enableSearch && (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search models..."
              style={{
                width: '100%',
                padding: '8px',
                borderBottom: '1px solid #eee',
                outline: 'none',
              }}
            />
          )}

          {Object.entries(groupedModels).map(([provider, providerModels]) => (
            <React.Fragment key={provider}>
              {groupByProvider && provider !== 'ungrouped' && (
                <View {...providerGroupStyles}>
                  <Text>{provider}</Text>
                </View>
              )}

              {providerModels.map((model) => (
                <Vertical
                  key={model.id}
                  {...optionStyles(model.id === selectedModelId)}
                  {...styles.option}
                  onClick={() => {
                    onModelSelect(model.id);
                    closeDropdown();
                  }}
                  opacity={model.isAvailable === false ? 0.5 : 1}
                >
                  <Text
                    fontWeight={
                      model.id === selectedModelId ? 'bold' : 'normal'
                    }
                  >
                    {model.name}
                  </Text>

                  {showModelDetails && (
                    <View {...modelInfoStyles} {...styles.modelInfo}>
                      {model.description && (
                        <Text fontSize="xs">{model.description}</Text>
                      )}

                      {model.capabilities && model.capabilities.length > 0 && (
                        <Horizontal gap="xs" flexWrap="wrap" marginTop="xs">
                          {model.capabilities.map((capability, index) => (
                            <View
                              key={index}
                              backgroundColor="color.gray.100"
                              padding="2px 6px"
                              borderRadius="full"
                            >
                              <Text fontSize="xs">{capability}</Text>
                            </View>
                          ))}
                        </Horizontal>
                      )}

                      {!model.isAvailable && (
                        <Text color="color.red.500" fontSize="xs">
                          Not available
                        </Text>
                      )}
                    </View>
                  )}
                </Vertical>
              ))}
            </React.Fragment>
          ))}

          {filteredModels.length === 0 && (
            <View padding="sm">
              <Text>No models found</Text>
            </View>
          )}
        </Vertical>
      )}
    </View>
  );
};
