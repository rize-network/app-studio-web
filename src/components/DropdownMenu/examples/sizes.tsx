import React from 'react';
import { DropdownMenu } from '../DropdownMenu';
import { Text, Vertical, View, Horizontal } from 'app-studio';
import { 
  Button,
  CopyIcon, 
  EditIcon, 
  DeleteIcon 
} from 'src/components';

export const DropdownMenuSizes = () => {
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
        <Vertical gap={10} alignItems="center">
          <Text>Small Size</Text>
          <DropdownMenu 
            trigger={<Button>Small</Button>}
            items={items}
            size="sm"
          />
        </Vertical>
        
        <Vertical gap={10} alignItems="center">
          <Text>Medium Size (Default)</Text>
          <DropdownMenu 
            trigger={<Button>Medium</Button>}
            items={items}
            size="md"
          />
        </Vertical>
        
        <Vertical gap={10} alignItems="center">
          <Text>Large Size</Text>
          <DropdownMenu 
            trigger={<Button>Large</Button>}
            items={items}
            size="lg"
          />
        </Vertical>
      </Horizontal>
    </Vertical>
  );
};
