import React from 'react';
import { ContextMenu } from '../ContextMenu';
import { View } from 'app-studio';

export const CompoundContextMenu = () => {
  const handleSelect = (action: string) => {
    alert(`Action selected: ${action}`);
  };

  return (
    <View
      padding={10}
      height={200}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <ContextMenu>
        <ContextMenu.Trigger>
          <View
            padding={8}
            bg="color-blue-100"
            color="color-blue-800"
            borderRadius="sm"
            cursor="context-menu"
          >
            Right-click here (Compound Pattern)
          </View>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item onSelect={() => handleSelect('Edit')}>
            Edit
          </ContextMenu.Item>
          <ContextMenu.Item onSelect={() => handleSelect('Duplicate')}>
            Duplicate
          </ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item onSelect={() => handleSelect('Share')} isDisabled>
            Share... (Disabled)
          </ContextMenu.Item>
          <ContextMenu.Item onSelect={() => handleSelect('Delete')}>
            Delete
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    </View>
  );
};
