import React from 'react';
import { ContextMenu } from '../ContextMenu';
import { Text, Vertical, View } from 'app-studio';
import { CopyIcon, EditIcon, DeleteIcon } from '../../Icon/Icon';
import { ContextMenuItem } from '../ContextMenu/ContextMenu.type';

export const CustomContextMenu = () => {
  const items: ContextMenuItem[] = [
    {
      id: 'copy',
      label: 'Copy',
      icon: <CopyIcon widthHeight={16} />,
      onClick: () => alert('Copy clicked'),
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: <EditIcon widthHeight={16} />,
      onClick: () => alert('Edit clicked'),
    },
    // {
    //   id: 'divider-1',
    //   divider: true,
    // },
    {
      id: 'delete',
      label: 'Delete',
      icon: <DeleteIcon widthHeight={16} />,
      onClick: () => alert('Delete clicked'),
    },
  ];

  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <Text marginBottom={10}>Custom Styled Context Menu</Text>
      <ContextMenu
        items={items}
        views={{
          menu: {
            backgroundColor: 'color.primary',
            color: 'white',
            borderRadius: '8px',
          },
          item: {
            _hover: {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          },
          divider: {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
        }}
      >
        <View
          padding={20}
          backgroundColor="color.primary.100"
          borderRadius={8}
          textAlign="center"
          cursor="context-menu"
        >
          <Text>Right-click here to open the custom styled context menu</Text>
        </View>
      </ContextMenu>
    </Vertical>
  );
};
