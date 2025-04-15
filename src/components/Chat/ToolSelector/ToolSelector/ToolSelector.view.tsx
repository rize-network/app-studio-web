/**
 * ToolSelector View
 */

import React from 'react';
import { View } from 'app-studio';
import { Vertical } from 'app-studio';
import { Text } from '../../../Text/Text';
import { ToolSelectorProps } from './ToolSelector.props';
import { AITool } from './ToolSelector.type';
import {
  containerStyles,
  toolsContainerStyles,
  toolItemStyles,
  toolIconStyles,
  toolInfoStyles,
  categoryHeaderStyles,
} from './ToolSelector.style';

export const ToolSelectorView: React.FC<ToolSelectorProps> = ({
  tools,
  selectedToolIds,
  onToolToggle,
  groupByCategory = false,
  showDescriptions = true,
  showIcons = true,
  isDisabled = false,
  styles = {},
  ...props
}) => {
  // Group tools by category if needed
  const getGroupedTools = () => {
    if (!groupByCategory) {
      return { ungrouped: tools };
    }

    return tools.reduce<Record<string, AITool[]>>((acc, tool) => {
      const category = tool.category || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(tool);
      return acc;
    }, {});
  };

  const groupedTools = getGroupedTools();

  return (
    <View {...containerStyles} {...props} {...styles.container}>
      <Vertical {...toolsContainerStyles} {...styles.toolsContainer}>
        {Object.entries(groupedTools).map(([category, categoryTools]) => (
          <React.Fragment key={category}>
            {groupByCategory && category !== 'ungrouped' && (
              <View {...categoryHeaderStyles} {...styles.categoryHeader}>
                <Text>{category}</Text>
              </View>
            )}

            {categoryTools.map((tool) => {
              const isSelected = selectedToolIds.includes(tool.id);
              const isToolEnabled = tool.isEnabled !== false;
              const isInteractive = !isDisabled && isToolEnabled;

              return (
                <View
                  key={tool.id}
                  {...toolItemStyles(isSelected, isInteractive)}
                  {...styles.toolItem}
                  onClick={
                    isInteractive ? () => onToolToggle(tool.id) : undefined
                  }
                >
                  {showIcons && (
                    <View {...toolIconStyles} {...styles.toolIcon}>
                      {tool.icon ? <Text>{tool.icon}</Text> : <Text>🔧</Text>}
                    </View>
                  )}

                  <View {...toolInfoStyles} {...styles.toolInfo}>
                    <Text fontWeight="medium">{tool.name}</Text>

                    {showDescriptions && tool.description && (
                      <Text fontSize="sm" color="color.gray.600">
                        {tool.description}
                      </Text>
                    )}
                  </View>

                  {isSelected && <Text color="theme.primary">✓</Text>}
                </View>
              );
            })}
          </React.Fragment>
        ))}
      </Vertical>
    </View>
  );
};
