import React from 'react';
import { Vertical, View, Horizontal } from 'app-studio';
import { Icon } from '../Icon/Icon';

export interface ToolbarItem {
  id: string;
  icon: string;
  label?: string;
  special?: boolean; // For the top dark download button
  actionOnly?: boolean; // If true, clicking this tool triggers an action but doesn't open the panel
}

interface EditToolbarProps {
  items: ToolbarItem[];
  activeToolId?: string;
  onSelectTool: (id: string) => void;
  orientation?: 'vertical' | 'horizontal';
}

export const EditToolbar: React.FC<EditToolbarProps> = ({
  items,
  activeToolId,
  onSelectTool,
  orientation = 'vertical',
}) => {
  const Container = orientation === 'horizontal' ? Horizontal : Vertical;

  return (
    <Container
      backgroundColor="white"
      borderRadius="12px"
      padding="8px"
      gap={8}
      width="fit-content"
      boxShadow="0px 4px 12px rgba(0,0,0,0.1)"
      alignItems="center"
    >
      {items.map((item) => {
        const isActive = activeToolId === item.id;
        const isSpecial = item.special;

        return (
          <View
            key={item.id}
            onClick={() => onSelectTool(item.id)}
            borderRadius="8px"
            padding="8px"
            cursor="pointer"
            backgroundColor={
              isActive
                ? isSpecial
                  ? 'color.gray.800'
                  : 'color.gray.100'
                : 'transparent'
            }
            hoverStyle={{
              backgroundColor: isActive
                ? isSpecial
                  ? 'color.gray.800'
                  : 'color.gray.100'
                : 'color.gray.100',
            }}
          >
            <Icon
              name={item.icon as any}
              color={isActive && isSpecial ? 'white' : 'color.gray.500'}
              size={20}
            />
          </View>
        );
      })}
    </Container>
  );
};
