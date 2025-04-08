import React from 'react';
import { ContextMenu } from '../ContextMenu';
import { Text, Vertical, View, Horizontal } from 'app-studio';
import { 
  CopyIcon, 
  EditIcon, 
  DeleteIcon 
} from '../../Icon/Icon';

export const ContextMenuSizes = () => {
  const items = [
    {
      id: 'copy',
      label: 'Copy',
      icon: <CopyIcon widthHeight={16} />,
      onClick: () => alert('Copy clicked')
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: <EditIcon widthHeight={16} />,
      onClick: () => alert('Edit clicked')
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <DeleteIcon widthHeight={16} />,
      onClick: () => alert('Delete clicked')
    }
  ];

  return (
    <Vertical gap={30} width="100%" maxWidth={600}>
      <Horizontal gap={20}>
        <Vertical flex={1}>
          <Text fontWeight="bold" marginBottom={10}>Small Size</Text>
          <ContextMenu items={items} size="sm">
            <View
              padding={20}
              backgroundColor="color.gray.100"
              borderRadius={8}
              textAlign="center"
              cursor="context-menu"
            >
              <Text>Right-click here</Text>
            </View>
          </ContextMenu>
        </Vertical>
        
        <Vertical flex={1}>
          <Text fontWeight="bold" marginBottom={10}>Medium Size (Default)</Text>
          <ContextMenu items={items} size="md">
            <View
              padding={20}
              backgroundColor="color.gray.100"
              borderRadius={8}
              textAlign="center"
              cursor="context-menu"
            >
              <Text>Right-click here</Text>
            </View>
          </ContextMenu>
        </Vertical>
        
        <Vertical flex={1}>
          <Text fontWeight="bold" marginBottom={10}>Large Size</Text>
          <ContextMenu items={items} size="lg">
            <View
              padding={20}
              backgroundColor="color.gray.100"
              borderRadius={8}
              textAlign="center"
              cursor="context-menu"
            >
              <Text>Right-click here</Text>
            </View>
          </ContextMenu>
        </Vertical>
      </Horizontal>
    </Vertical>
  );
};
